class AddContactToLayers < ActiveRecord::Migration[5.1]
  def change
    add_column :layers, :contact, :string
  end
end
