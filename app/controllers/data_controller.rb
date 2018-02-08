# frozen_string_literal: true

# Controller dedicated to rendering json data
class DataController < ApplicationController
  before_action :authenticate_user!

  # /strat_column/:strat_column_id/data
  def data
    strat_column_id = params[:strat_column_id]
    layers = Layer.where(strat_column_id: strat_column_id).order('created_at DESC')
    except_attr = %i[created_at updated_at]
    except = { except: except_attr }
    only = { only: %i[interval_name color abbrev] }
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render(
      json: layers, except: except_attr,
      include: [{ strat_column: except }, { lithology: except },
                { timescale: only }, { contact: except }, { fossils: except }]
    )
  end

  def all_data
    user_id = current_user.id
    strat_columns = StratColumn.where(user_id: user_id).where.not(lat: nil).where.not(lng: nil)
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    render json: strat_columns, except: %i[created_at updated_at]
  end

  def timescales_data
    timescales = Timescale.order(:interval_name).where('interval_name ilike ?', "%#{params[:term]}%")
    render json: timescales.map(&:interval_name)
  end

  def lithologies_data
    query = 'name ILIKE :search OR name2 ILIKE :search OR name3 ILIKE :search OR url LIKE :search'
    lithologies = Lithology.where(query, search: "%#{params[:term]}%")
    render json: lithologies.map(&:name_with_texture_num)
  end

  def collections_data
    collections_id = params[:collection_id]
    collection_columns = Collection.find(collections_id).strat_columns
    # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
    exceptions = %i[created_at updated_at]
    render(json: collection_columns, except: exceptions, methods: [:total_thickness])
  end
end
