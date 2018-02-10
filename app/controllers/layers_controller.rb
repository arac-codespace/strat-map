class LayersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_permission, except: [:index]

  def new
    @layer = Layer.new
    # Used to fill hidden id for for association
    # @current_user = current_user
    # @current_user_id = @current_user.id
    @strat_column_id = StratColumn.find(params[:id])
    respond_to do |format|
      format.html {redirect_to edit_strat_column_path(@strat_column_id)}
      format.js
    end
      
  end  


  def create
    @layer = Layer.create(layer_params)
    respond_to do |format|
      if @layer.save
        format.js {redirect_to strat_column_path(id: @layer.strat_column_id)}
      else
      # Basically, if creation fails, I want you to respond with
      # a json message which I will process with js (application.js).
        format.json {render json: @layer.errors.full_messages, status: :unprocessable_entity}
      end
    end      
  end
  
  
  def destroy
    @layer = Layer.find(params[:id])
    @column_id = @layer.strat_column_id
    @layers = Layer.where(strat_column_id: @column_id)
    if @layers.count > 1
      @layer.destroy
      redirect_to strat_column_path(id: @column_id)
    else
      # Redirect to strats index
      redirect_to strat_column_path(id: @column_id)
    end
  end    
  
  
  def edit
    @layer = Layer.find_by(id: params[:id])
    respond_to do |format|
      format.js
      format.html {redirect_to edit_strat_column_path(@strat_column_id)}
    end
  end  

  def show

    @layer = Layer.find_by(id: params[:id])
    respond_to do |format|
      format.js
      format.html {redirect_to edit_strat_column_path(@strat_column_id)}
    end
  end
  
  
  def update
    # Find the corresponding record id that you want to update!
    
    @layer = Layer.find_by(id: params[:id])
    respond_to do |format|
      if @layer.update(layer_params)
        format.js {redirect_to strat_column_path(id: @layer.strat_column_id)}
      else
        format.json {render json: @layer.errors.full_messages, status: :unprocessable_entity}
      end
    end
  end   
  
  private
  
  def layer_params
    params.require(:layer).permit(:lithology_name, :timescale_name, :interval_name ,:id, :strat_column_id, :lithology_id, :timescale_id, :contact_id, :epoch_age, :contact, :_destroy, :name, :name2, :name3, :formation, :thickness, :description, fossils_attributes: [:id, :name, :query, :notes, :abundance, :layer_id, :_destroy] )
  end
  
  
  def require_permission
    if params[:action] == 'new'
      column_id = StratColumn.find_by_id(params[:id])
    elsif params[:action] == 'create'
      column_id = StratColumn.find_by_id(params[:layer][:strat_column_id])
    else
      layer_id = Layer.find_by_id(params[:id])
      column_id = layer_id.strat_column
    end
    
    
    if column_id == nil
      redirect_to root_path
    elsif current_user.id != column_id.user_id
      redirect_to root_path
    end
  end  
  
end