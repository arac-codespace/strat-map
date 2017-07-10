class StratColumnsController < ApplicationController
  
  def index
  @current_user = current_user
  @strats = Strat.where(user_id: @current_user.id)
  end
  
  def show
    # find general info of strat table
    # note that the id above is strat_id
    @id = params[:id]
    @strat = Strat.find(@id)
    
    # find layers of the strat table with id params
    @layers = Layer.where(strat_id: @id)
    
  end
  
  
  def new
    @strat = Strat.new
    @strat.layers.build
    @current_user = current_user
    # Just a whim.
    @id = @current_user.id
  end

  def create

    @strat = Strat.new(strat_params)
    if @strat.save
        flash[:notice] = "Column created succesfully"
        redirect_to root_path
    else
        @id = current_user.id
        flash[:error] = @strat.errors.full_messages
        render action: :new
    end    
  end
  
  def edit
    @strat = Strat.find(params[:id])
  end
  
  def update
    @strat = Strat.find(params[:id])
    if @strat.update_attributes(strat_params)
      # Redirect to the strat's profile
      redirect_to strat_column_path(id: params[:id])
    else
      render action: :edit #Don't send, go back to edit action.
    end
  end

  def destroy
    @strat = Strat.find(params[:id])
    @strat.destroy
    # Redirect to strats index
    redirect_to strat_columns_path
  end  
  
  private
  
  def strat_params
  # Funny enough,  If you don't whitelist the id of the nested model your update action will
  # create new entries for update instead of actually updating the entries!
  # Also, must allow_destroy in model and allow :_destroy param here to actually enable the function.
  # in main model and nested attributes alike.
    params.require(:strat).permit(:_destroy, :user_id, :name, :lat, :lng, :description, layers_attributes: [:id, :strat_id, :lithology_id,:_destroy, :name, :name2, :name3, :formation, :thickness, :description] )
  end    
  
  
  
end
