class RenameTypeColumnInContact < ActiveRecord::Migration[5.1]
  def change
    rename_column :contacts, :type, :contact_type
  end
end
