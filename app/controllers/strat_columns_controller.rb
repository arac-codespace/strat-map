class StratColumnsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_permission, except: [:index, :new, :create]
  
  def index
  @current_user = current_user
  # @strat_columns = StratColumn.where(user_id: @current_user.id).paginate(:page => params[:page], :per_page => 10)
  @q = StratColumn.where(user_id: @current_user.id).includes(:layers).ransack(params[:q]) 
  @strat_columns = @q.result(distinct: true).paginate(page: params[:page], per_page: 10)

  end
  
  def show
    # find general info of strat table
    # note that the id above is strat_column_id
    @id = params[:id]
    @strat_column = StratColumn.find(@id)
    
    # find layers of the strat table with id params
    @layers = Layer.where(strat_column_id: @id).includes(:fossils).order('id ASC')


    @textures_to_render = []
    @layers.each do |layer|
      @textures_to_render << "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
      unless layer.contact.contact_type == "Conformity" or layer.contact.contact_type == "Depositional"
        @textures_to_render << "svg/contacts/#{layer.contact.contact_type.downcase}"
      end
    end

  end
  
  
  def new
    @strat_column = StratColumn.new
    @strat_column.layers.build.fossils.build
    # @strat_column.fossils.build

    @current_user = current_user
    # Just a whim.
    @id = @current_user.id
    @timescale_collection = Timescale.all.order(:late_age)
  end

  def create

    @strat_column = StratColumn.new(strat_params)
    if @strat_column.save
        flash[:notice] = "Column created succesfully"
        redirect_to strat_column_path(@strat_column)
    else
        @id = current_user.id
        @timescale_collection = Timescale.all.order(:late_age)
        flash[:error] = @strat_column.errors.full_messages
        render action: :new
    end    
  end
  
  def edit
    @strat_column = StratColumn.find(params[:id])
    @timescale_collection = Timescale.all.order(:late_age)
    
    
  end
  
  def update
    @strat_column = StratColumn.find(params[:id])
    respond_to do |format|
      if @strat_column.update_attributes(strat_params)
        # Redirect to the strat's profile
        format.html {redirect_to strat_column_path(id: params[:id])}
        format.js {redirect_to strat_column_path(id: params[:id])}
      else
        @timescale_collection = Timescale.all.order(:late_age)
        format.json {render json: @strat_column.errors.full_messages, status: :unprocessable_entity}
        format.html {render action: :edit} #Don't send, go back to edit action.
      end
    end
  end

  def destroy
    @strat_column = StratColumn.find(params[:id])
    @strat_column.destroy
    # Redirect to strats index
    redirect_to strat_columns_path
  end  
  
  private
  
  def strat_params
  # Funny enough,  If you don't whitelist the id of the nested model your update action will
  # create new entries for update instead of actually updating the entries!
  # Also, must allow_destroy in model and allow :_destroy param here to actually enable the function.
  # in main model and nested attributes alike.
    params.require(:strat_column).permit(:_destroy, :user_id, :name, :location, :lat, :lng, :description, :depth, layers_attributes: [:lithology_name, :timescale_name, :interval_name ,:id, :strat_column_id, :lithology_id, :timescale_id, :contact_id, :epoch_age, :contact, :_destroy, :name, :name2, :name3, :formation, :thickness, :description, fossils_attributes: [:id, :name, :query, :notes, :abundance, :layer_id, :_destroy]] )
  end    
  
  def require_permission
    column_id = StratColumn.find_by_id(params[:id])
    if column_id == nil
      redirect_to root_path
    elsif current_user.id != column_id.user_id
      redirect_to root_path
      #Or do something else here
    end
  end
  
  
  
end
