class RenameLayersStratColumnId < ActiveRecord::Migration[5.1]
  def change
    rename_column :layers, :strat_id, :strat_column_id
  end
end
