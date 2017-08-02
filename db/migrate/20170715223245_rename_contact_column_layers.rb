class RenameContactColumnLayers < ActiveRecord::Migration[5.1]
  def change
    rename_column :layers, :contact, :contact_id
    change_column :layers, :contact_id, 'integer USING CAST(contact_id AS integer)'
  end
end
