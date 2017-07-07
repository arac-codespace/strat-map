class PagesController < ApplicationController
  def home
  end
  
  def stratdata
    @stratdata = File.read('app/assets/json/stratdata.json')
    render :json => @stratdata
  end
  
end
