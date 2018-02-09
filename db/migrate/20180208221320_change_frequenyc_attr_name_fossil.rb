class ChangeFrequenycAttrNameFossil < ActiveRecord::Migration[5.1]
  def change
  	rename_column :fossils, :frequency, :abundance  	
  end
end
