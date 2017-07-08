class AddStratIdToLayers < ActiveRecord::Migration[5.1]
  def change
    add_column :layers, :strat_id, :integer
  end
end
