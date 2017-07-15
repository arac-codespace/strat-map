class AddAgeColumnLayers < ActiveRecord::Migration[5.1]
  def change
    add_column :layers, :epoch_age, :string
  end
end
