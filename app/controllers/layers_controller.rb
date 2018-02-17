# frozen_string_literal: true

# Controller handles layer edit/create requests
class LayersController < ApplicationController
  before_action :authenticate_user!
  before_action :fetch_strat_column
  before_action :fetch_layer, except: %i[new create]

  def new
    @layer = @strat_column.layers.new
    respond_to do |format|
      format.html { redirect_to edit_strat_column_path(@strat_column) }
      format.js
    end
  end

  def create
    @layer = @strat_column.layers.new(layer_params)
    respond_to do |format|
      if @layer.save
        format.js { redirect_to strat_column_path(id: @strat_column) }
      else
        # Basically, if creation fails, I want you to respond with
        # A json message which I will process with js (application.js).
        format.json { render json: @layer.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @layer.destroy if @strat_column.layers.count > 1
    redirect_to strat_column_path(id: @strat_column)
  end

  def edit
    respond_to do |format|
      format.js
      format.html { redirect_to edit_strat_column_path(@strat_column) }
    end
  end

  def show
    # Path used to display fossil table ajax
    respond_to do |format|
      format.js
      format.html { redirect_to edit_strat_column_path(@strat_column) }
    end
  end

  def update
    # Find the corresponding record id that you want to update!
    respond_to do |format|
      if @layer.update(layer_params)
        format.js { redirect_to strat_column_path(id: @strat_column) }
      else
        format.json { render json: @layer.errors.full_messages, status: :unprocessable_entity }
      end
    end
  end

  private

  def layer_params
    params.require(:layer).permit(
      :lithology_name, :timescale_name, :interval_name, :id, :strat_column_id,
      :lithology_id, :timescale_id, :contact_id, :epoch_age, :contact, :_destroy,
      :name, :name2, :name3, :formation, :thickness, :description,
      fossils_attributes: %i[id name query notes abundance layer_id _destroy]
    )
  end

  # Used in all
  def fetch_strat_column
    @strat_column = current_user.strat_columns.find(params[:strat_column_id])
  end

  # Used in all except new, create
  def fetch_layer
    @layer = @strat_column.layers.find(params[:id])
  end
end
