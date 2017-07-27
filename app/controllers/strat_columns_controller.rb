class StratColumnsController < ApplicationController
  before_action :authenticate_user!
  
  def index
  @current_user = current_user
  @strat_columns = StratColumn.where(user_id: @current_user.id)
  end
  
  def show
    # find general info of strat table
    # note that the id above is strat_column_id
    @id = params[:id]
    @strat_column = StratColumn.find(@id)
    
    # find layers of the strat table with id params
    @layers = Layer.where(strat_column_id: @id)

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
    @strat_column.layers.build
    @current_user = current_user
    # Just a whim.
    @id = @current_user.id
    @timescale_collection = Timescale.all.order(:late_age)
  end

  def create

    @strat_column = StratColumn.new(strat_params)
    if @strat_column.save
        flash[:notice] = "Column created succesfully"
        redirect_to root_path
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
    if @strat_column.update_attributes(strat_params)
      # Redirect to the strat's profile
      redirect_to strat_column_path(id: params[:id])
    else
      @timescale_collection = Timescale.all.order(:late_age)
      render action: :edit #Don't send, go back to edit action.
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
    params.require(:strat_column).permit(:_destroy, :user_id, :name, :location, :lat, :lng, :description, layers_attributes: [:id, :strat_column_id, :lithology_id, :timescale_id, :contact_id, :epoch_age, :contact, :_destroy, :name, :name2, :name3, :formation, :thickness, :description] )
  end    
  
  
  
end
