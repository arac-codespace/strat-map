class MapsController < ApplicationController
before_action :authenticate_user!
  
  def index
    
    @user_id = current_user.id

    # Find all strat columns.  This is to render textures.
    @strat = StratColumn.where(user_id: @user_id)
    
    @textures_to_render = []
    
    # Loop to find urls to render
    @strat.each do |column|
      @layers = Layer.joins(:strat_column).where(strat_columns: {id: column.id}).each do |layer|
        @textures_to_render << "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
        
        unless layer.contact.contact_type == "Conformity" or layer.contact.contact_type == "Depositional"
          @textures_to_render << "svg/contacts/#{layer.contact.contact_type.downcase}"
        end        
        
      end #layer inner loop ned
    end #strat outer loop end
  end # def end
  
end
