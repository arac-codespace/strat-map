class AddColumnDepthOption < ActiveRecord::Migration[5.1]
  def change
    add_column :strat_columns, :depth, :boolean
  end
end
