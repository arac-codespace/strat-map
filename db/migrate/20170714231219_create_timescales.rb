class CreateTimescales < ActiveRecord::Migration[5.1]
  def change
    create_table :timescales do |t|
      t.integer :interval_no	
      t.integer :scale_no
      t.integer :level
      t.string :interval_name
      t.string :abbrev
      t.integer :parent_no
      t.string :color
      t.decimal :late_age, precision: 9, scale: 5
      t.decimal :early_age, precision: 9, scale: 5
      t.string :reference_no
      t.timestamps
    end
  end
end
