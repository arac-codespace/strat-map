class StratColumnsController < ApplicationController
  
  def index
  @current_user = current_user
  @strats = Strat.where(user_id: @current_user.id)
  end
  
  def show
    # find general info of strat table
    # note that the id above is strat_id
    @id = params[:id]
    @strat = Strat.find_by(@id)
    
    # find layers of the strat table with id params
    @layers = Layer.where(strat_id: @id)
    
  end
  
  
  def new
    @strat = Strat.new
    @strat.layers.build
    @current_user = current_user
  end

  def create
    @strat = Strat.new(strat_params)
    if @strat.save!
        flash[:success] = "Column Created"
        redirect_to root_path
    else
        render action: :new
    end    
  end
  
  private
  
  def strat_params
      # paras_allow = :title, sections_attributes: [:title, questions_attributes:[:title]]
      params.require(:strat).permit(:user_id, :name, :lat, :lng, :description, layers_attributes: [:strat_id, :lithology_id, :name, :formation, :thickness, :description] )
  end    
  
  
  
end
