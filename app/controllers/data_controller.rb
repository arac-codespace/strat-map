class DataController < ApplicationController
before_action :authenticate_user!
  
  # /strat_column/:strat_column_id/data
  def data
    @strat_column_id = params[:strat_column_id]
    @layers = Layer.where(strat_column_id: @strat_column_id).order("created_at DESC")
        
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render(json: @layers, include: [{lithology: {except: [:created_at, :updated_at]}}, {timescale: {only: [:interval_name, :color, :abbrev]}}, {contact: {except: [:created_at, :updated_at]}}] )
    
  end
  
  def all_data
  
    @user_id = current_user.id
    @strat_columns = StratColumn.where(user_id: @user_id).where.not(lat: nil).where.not(lng: nil)
        
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render :json => @strat_columns, :except => [:created_at, :updated_at]  
  
  end
  
  
end
