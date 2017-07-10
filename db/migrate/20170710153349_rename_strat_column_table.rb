class RenameStratColumnTable < ActiveRecord::Migration[5.1]
  def change
    rename_table :strats, :strat_columns
  end
end
