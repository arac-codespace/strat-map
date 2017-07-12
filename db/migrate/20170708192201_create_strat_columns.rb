class CreateStratColumns < ActiveRecord::Migration[5.1]
  def change
    create_table :strat_columns do |t|
      t.integer :user_id
      t.string :name
      t.decimal :lat, precision: 10, scale: 6
      t.decimal :lng, precision: 10, scale: 6
      t.text :description
      t.timestamps
    end
  end
end
