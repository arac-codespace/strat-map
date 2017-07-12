class CreateLayers < ActiveRecord::Migration[5.1]
  def change
    create_table :layers do |t|
      t.integer :lithology_id
      t.integer :strat_column_id
      t.string :name
      t.string :formation
      t.decimal :thickness, precision: 8, scale: 2 
      t.text :description
      t.timestamps
    end
  end
end
