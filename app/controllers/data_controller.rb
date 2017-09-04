class DataController < ApplicationController
before_action :authenticate_user!
  
  # /strat_column/:strat_column_id/data
  def data
    @strat_column_id = params[:strat_column_id]
    @layers = Layer.where(strat_column_id: @strat_column_id).order("created_at DESC")
        
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render(json: @layers, except: [:created_at, :updated_at], include: [{strat_column: {except: [:created_at, :updated_at]}},{lithology: {except: [:created_at, :updated_at]}}, {timescale: {only: [:interval_name, :color, :abbrev]}}, {contact: {except: [:created_at, :updated_at]}}] )
    
  end
  
  def all_data
  
    @user_id = current_user.id
    @strat_columns = StratColumn.where(user_id: @user_id).where.not(lat: nil).where.not(lng: nil)
        
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render :json => @strat_columns, :except => [:created_at, :updated_at]  
  
  end
  
  
  def timescales_data
    
    @timescales = Timescale.order(:interval_name).where("interval_name like ?", "%#{params[:term]}%")
    render :json => @timescales.map(&:interval_name)
    
  end
  
  def lithologies_data
    @lithologies = Lithology.where('name LIKE :search OR name2 LIKE :search OR name3 LIKE :search', search: "%#{params[:term]}%")
    render :json => @lithologies.map(&:name_with_texture_num)
  end
  
  def collections_data  
    @collections_id = params[:collection_id]
    @collection_columns = Collection.find(@collections_id).strat_columns
    
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    @exceptions = [:created_at, :updated_at]
    render(json: @collection_columns, except: @exceptions )
  end
  
end
