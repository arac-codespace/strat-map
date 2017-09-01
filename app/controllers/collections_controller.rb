class CollectionsController < ApplicationController
  
  def index
    @user_id = current_user
    @collections = Collection.all
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
        redirect_to collection_path(id: @collection)
    else
        @id = current_user.id
        flash[:error] = @collection.errors.full_messages
        render action: :new
    end        
  end
  
  def show
    @collection = Collection.find(params[:id])
  end
  
  def edit
    @collection = Collection.find(params[:id])
    @user_id = current_user
    @user_columns = StratColumn.where(user_id: @user_id)    
  end
  
  def update
    @collection = Collection.find(params[:id])
    if @collection.update_attributes(collection_params)
      redirect_to collection_path(id: @collection)
    else
      render action: :new
    end

  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy
    # Redirect to strats index
    redirect_to collections_path
  end  

  
  private
  def collection_params
    params.require(:collection).permit(:_destroy, :name, :description, {strat_column_ids: []} )

  end
  
  
  
end
