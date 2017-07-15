class AddTimeIdLayers < ActiveRecord::Migration[5.1]
  def change
    add_column :layers, :timescale_id, :integer
  end
end
