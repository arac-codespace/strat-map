class DataController < ApplicationController
  
  
  # /strat_column/:strat_column_id/data
  def data
    @strat_column_id = params[:strat_column_id]
    @strat_column = StratColumn.find(@strat_column_id)
    @layers = Layer.where(strat_column_id: @strat_column_id)
    
    
    # @layers.each do |layer|
    #   puts client.address.postcode
    # end

# render :json => @programs, :include => {:insurer => {:only => :name}}, :except => [:created_at, :updated_at]

    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render :json => @layers, :include => {:lithology => {:except => [:created_at, :updaed_at]}}
  end
  
end












# def stratdata
#   @stratdata = File.read('app/assets/json/stratdata.json')
#   render :json => @stratdata
# end