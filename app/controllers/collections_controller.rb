class CollectionsController < ApplicationController
  
  def index
  end
  
  def new
    @collection = Collection.new
    @user_id = current_user
    @user_columns = StratColumn.where(user_id: @user_id)
  end
  
  def create
    
   @collection = Collection.new(collection_params)
    if @collection.save
        flash[:notice] = "Collection created succesfully"
        redirect_to collections_path
    else
        @id = current_user.id
        flash[:error] = @collection.errors.full_messages
        render action: :new
    end        
  end
  
  private
  def collection_params
    params.require(:collection).permit(:_destroy, :name, :description, {strat_column_ids: []} )

  end
  
  
  
end
