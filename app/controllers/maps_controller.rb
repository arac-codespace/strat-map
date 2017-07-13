class MapsController < ApplicationController
  
  def index
    
    @user_id = current_user.id

    # Find all strat columns
    @strat = StratColumn.where(user_id: @user_id)
    
    @textures_to_render = []
    
    # Loop to find urls to render
    @strat.each do |column|
      @layers = Layer.joins(:strat_column).where(strat_columns: {id: column.id}).each do |layer|
        temp = "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
        
        if !@textures_to_render.include?(temp)
          @textures_to_render << temp
        end # if end
        
      end #layer inner loop ned
    end #strat outer loop end
  end # def end
  
end
