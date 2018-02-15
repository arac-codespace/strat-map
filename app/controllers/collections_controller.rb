# frozen_string_literal: true

# Controller handles collection requests
class CollectionsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_permission, except: %i[index new create sort]
  before_action :fetch_current_collection, only: %i[show edit update destroy]
  before_action :fetch_user_columns, only: %i[new edit]

  def index
    @user_id = current_user.id

    @q = Collection.where(user_id: @current_user.id).ransack(params[:q])
    @collections = @q.result(distinct: true).paginate(page: params[:page], per_page: 10)
  end

  def new
    # Form uses @user_columns var in form
    @collection = Collection.new
  end

  def create
    @collection = current_user.collections.new(collection_params)
    if @collection.save
      flash[:notice] = 'Collection created succesfully'
      redirect_to collection_path(id: @collection)
    else
      @id = current_user.id
      flash[:error] = @collection.errors.full_messages
      render action: :new
    end
  end

  def show
    @collection_columns = @collection.strat_columns
    # The following is used to scale columns...
    min_array = []
    @collection_columns.each do |column|
      min_array << column.layers.minimum(:thickness)
    end
    @min_thickness = min_array.min

    @textures_to_render = []
    # Loop to find urls to render
    textures_to_render_assignment(@collection_columns, @textures_to_render)
  end

  def edit
    # Form uses @user_columns var in form
  end

  def update
    respond_to do |format|
      if @collection.update_attributes(collection_params)
        # Redirect to the strat's profile
        format.html { redirect_to collection_path(@collection) }
        format.js { redirect_to collection_path(@collection) }
      else
        format.json { render json: @collection.errors.full_messages, status: :unprocessable_entity }
        format.html { render action: :edit } # Don't send, go back to edit action.
      end
    end
  end

  def destroy
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
    params.require(:collection).permit(:_destroy, :name, :description, :user_id, strat_column_ids: [])
  end

  # Used only on destroy, update, edit, show
  def fetch_current_collection
    @user = current_user
    @collection = @user.collections.find(params[:id])
  end

  # Used in new, edit
  def fetch_user_columns
    @user_columns = StratColumn.where(user_id: current_user.id).order(:name)
  end

  def textures_to_render_assignment(collection_columns, textures_to_render)
    collection_columns.each do |column|
      Layer.join_columns(column.id).each do |layer|
        textures_to_render << "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
        unless layer.contact.contact_type == 'Conformity' || layer.contact.contact_type == 'Depositional'
          textures_to_render << "svg/contacts/#{layer.contact.contact_type.downcase}"
        end
      end
    end
  end

  def require_permission
    collection = Collection.find_by_id(params[:id])
    if collection.nil?
      redirect_to root_path
    elsif current_user.id != collection.user_id
      redirect_to root_path
    end
  end
end
