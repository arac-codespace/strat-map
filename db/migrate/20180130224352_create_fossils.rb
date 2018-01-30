class CreateFossils < ActiveRecord::Migration[5.1]
  def change
    create_table :fossils do |t|
    	t.string :name
    	t.string :notes
    	t.string :features

    	t.integer :layers_id
    	t.timestamps
    end
  end
end
