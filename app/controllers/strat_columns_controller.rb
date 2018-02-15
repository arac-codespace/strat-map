# frozen_string_literal: true

# Controller handles strat_column requests
class StratColumnsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_permission, except: %i[index new create]
  before_action :fetch_user_column, only: %i[show destroy update edit]

  def index
    @current_user = current_user
    @q = StratColumn.where(user_id: @current_user.id).includes(:layers).ransack(params[:q])
    @strat_columns = @q.result(distinct: true).paginate(page: params[:page], per_page: 10)
  end

  def show
    # Find layers of the strat table with id params
    @layers = Layer.where(strat_column_id: @strat_column.id).includes(:fossils).order('id ASC')

    @textures_to_render = []
    textures_to_render_assignment(@layers, @textures_to_render)
  end

  def new
    @strat_column = StratColumn.new
  end

  def create
    @strat_column = current_user.strat_columns.new(strat_params)
    if @strat_column.save
      flash[:notice] = 'Column created succesfully'
      redirect_to strat_column_path(@strat_column)
    else
      flash[:error] = @strat_column.errors.full_messages
      render action: :new
    end
  end

  def edit
    # fetch_user_column
  end

  def update
    respond_to do |format|
      if @strat_column.update_attributes(strat_params)
        # Redirect to the strat's profile
        format.html { redirect_to strat_column_path(id: params[:id]) }
        format.js { redirect_to strat_column_path(id: params[:id]) }
      else
        # Must send timescale back when rendering
        @timescale_collection = Timescale.all.order(:late_age)
        format.json { render json: @strat_column.errors.full_messages, status: :unprocessable_entity }
        format.html { render action: :edit } # Don't send, go back to edit action.
      end
    end
  end

  def destroy
    @strat_column.destroy
    redirect_to strat_columns_path
  end

  private

  # Funny enough,  If you don't whitelist the id of the nested model your update action will
  # create new entries for update instead of actually updating the entries!
  # Also, must allow_destroy in model and allow :_destroy param here to actually enable the function.
  # in main model and nested attributes alike.
  def strat_params
    params.require(:strat_column).permit(
      :_destroy, :user_id, :name, :location, :lat, :lng, :description, :depth,
      layers_attributes: [
        :lithology_name, :timescale_name, :interval_name, :id, :strat_column_id, :lithology_id,
        :timescale_id, :contact_id, :epoch_age, :contact, :_destroy, :name, :name2, :name3, :formation, :thickness,
        :description, fossils_attributes: %i[id name query notes abundance layer_id _destroy]
      ]
    )
  end

  def fetch_user_column
    # Destroy, update, edit, show only
    @user = User.find(current_user.id)
    @strat_column = @user.strat_columns.find(params[:id])
  end

  def textures_to_render_assignment(layers, textures_to_render)
    layers.each do |layer|
      textures_to_render << "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
      unless layer.contact.contact_type == 'Conformity' || layer.contact.contact_type == 'Depositional'
        textures_to_render << "svg/contacts/#{layer.contact.contact_type.downcase}"
      end
    end
  end

  def require_permission
    column_id = StratColumn.find_by_id(params[:id])
    if column_id.nil?
      redirect_to root_path
    elsif current_user.id != column_id.user_id
      redirect_to root_path
      # Or do something else here
    end
  end
end
