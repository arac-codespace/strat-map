class FixFossilColumnName < ActiveRecord::Migration[5.1]
  def change
  	rename_column :fossils, :layers_id, :layer_id
  end
end
