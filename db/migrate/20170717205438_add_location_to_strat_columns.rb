class AddLocationToStratColumns < ActiveRecord::Migration[5.1]
  def change
    add_column :strat_columns, :location, :string
  end
end
