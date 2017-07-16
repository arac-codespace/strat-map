class RenameContactColumnLayers < ActiveRecord::Migration[5.1]
  def change
    change_column :layers, :contact, :integer
    rename_column :layers, :contact, :contact_id
  end
end
