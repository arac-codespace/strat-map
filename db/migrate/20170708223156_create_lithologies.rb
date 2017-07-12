class CreateLithologies < ActiveRecord::Migration[5.1]
  def change
    create_table :lithologies do |t|
      t.string :name
      t.string :name2
      t.string :name3
      t.string :rock_type
      t.string :url
      t.timestamps
    end
  end
end
