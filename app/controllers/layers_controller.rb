class LayersController < ApplicationController
  

  def new
    @layer = Layer.new
    # Used to fill hidden id for for association
    # @current_user = current_user
    # @current_user_id = @current_user.id
    @strat_column_id = StratColumn.find(params[:id])
  end  


  def create
    @layer = Layer.create(layer_params)
      if @layer.save
        redirect_to strat_column_path(id: @layer.strat_column_id)
      else
        # Basically, if creation fails, I want you to respond with
        # a json message which I will process with js (application.js).
        respond_to do |format|
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
  
  
  def layer_params
    params.require(:layer).permit(:lithology_name, :timescale_name, :interval_name ,:id, :strat_column_id, :lithology_id, :timescale_id, :contact_id, :epoch_age, :contact, :_destroy, :name, :name2, :name3, :formation, :thickness, :description )
  end
  
  
end