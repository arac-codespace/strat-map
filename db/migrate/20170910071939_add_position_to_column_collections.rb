class AddPositionToColumnCollections < ActiveRecord::Migration[5.1]
  def change
    add_column :column_collections, :position, :integer
  end
end
