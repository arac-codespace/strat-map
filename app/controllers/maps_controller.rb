# frozen_string_literal: true

# Controller handles map view requests
class MapsController < ApplicationController
  before_action :authenticate_user!

  def index
    @user_id = current_user.id
    # Find all strat columns.  This is to render textures.
    @strat_columns = current_user.strat_columns
    # The following is used to scale columns...
    # May want to consider a form of percentile
    min_array = []
    scaling_data(@strat_columns, min_array)
    # Loop to find urls to render
    @textures_to_render = []
    @strat_columns.each do |column|
      @layers = Layer.join_columns(column.id)
      textures_to_render_assignment(@layers, @textures_to_render)
    end
  end

  private

  def textures_to_render_assignment(layers, textures_to_render)
    layers.each do |layer|
      textures_to_render << "svg/#{layer.lithology.rock_type.downcase}/#{layer.lithology.url}"
      unless layer.contact.contact_type == 'Conformity' || layer.contact.contact_type == 'Depositional'
        textures_to_render << "svg/contacts/#{layer.contact.contact_type.downcase}"
      end
    end
  end

  def scaling_data(strat_columns, min_array)
    strat_columns.each do |column|
      min_array << column.layers.minimum(:thickness)
    end

    @avg_min_thickness = if min_array.count.zero?
                           0
                         else
                           (min_array.sum / min_array.size).ceil
                         end
  end
end
