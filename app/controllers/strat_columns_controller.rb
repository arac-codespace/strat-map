class StratColumnsController < ApplicationController
  def new
    @strat = Strat.new
    @strat.layers.build
  end

  def create
    @strat = Strat.new(fossil_params)
    if @strat.save
        flash[:success] = "Profile Updated"
        redirect_to root_path
    else
        render action: :new
    end    
  end
  
  private
  
  def fossil_params
      paras_allow = :name
      params.require(:strat).permit(paras_allow)
  end    
  
  
  
end
