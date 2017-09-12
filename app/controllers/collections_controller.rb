class CollectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_permission, except: [:index, :new, :create, :sort]
  
  def index
    @user_id = current_user.id

    @collections = Collection.where(user_id: @user_id).paginate(:page => params[:page], :per_page => 10)
  end
  
  def new
    @collection = Collection.new
    @user_id = current_user.id
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
    
    
    @collection_columns = @collection.strat_columns
    
    @textures_to_render = []
    
    # Loop to find urls to render
    @collection_columns.each do |column|
      @layers = Layer.joins(:strat_column).where(strat_columns: {id: column.id}).each do |layer|
        @textures_to_render << "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
        
        unless layer.contact.contact_type == "Conformity" or layer.contact.contact_type == "Depositional"
          @textures_to_render << "svg/contacts/#{layer.contact.contact_type.downcase}"
        end        
        
      end #layer inner loop ned
    end #strat outer loop end
  end   
    
  
  def edit
    @collection = Collection.find(params[:id])
    @user_id = current_user
    @user_columns = StratColumn.where(user_id: @user_id)
    
  end
  
  def update
    @collection = Collection.find(params[:id])
    respond_to do |format|
      if @collection.update_attributes(collection_params)
        # Redirect to the strat's profile
        format.html {redirect_to collection_path(@collection)}
        format.js {redirect_to collection_path(@collection)}
      else
        @user_columns = StratColumn.where(user_id: current_user.id)    
        format.json {render json: @collection.errors.full_messages, status: :unprocessable_entity}
        format.html {render action: :edit} #Don't send, go back to edit action.
      end
    end


  end

  def destroy
    @collection = Collection.find(params[:id])
    @collection.destroy
    # Redirect to strats index
    redirect_to collections_path
  end  

  def sort
    params[:column_collection].each_with_index do |id, index|
      @assign = ColumnCollection.find(id).update(position: (index + 1))
    end
  
  end
  
  private
  def collection_params
    params.require(:collection).permit(:_destroy, :name, :description, :user_id, {strat_column_ids: []} )

  end
  
  
  def require_permission
    collection = Collection.find_by_id(params[:id])
    if collection == nil
      redirect_to root_path
    elsif current_user.id != collection.user_id
      redirect_to root_path
      #Or do something else here
    end
  end
    
  
  
end
