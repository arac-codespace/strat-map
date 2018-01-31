class ChangeFossilColumnName < ActiveRecord::Migration[5.1]
  def change
  	rename_column :fossils, :features, :frequency
  end
end
