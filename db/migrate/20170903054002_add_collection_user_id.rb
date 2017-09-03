class AddCollectionUserId < ActiveRecord::Migration[5.1]
  def change
    add_column :collections, :user_id, :integer
  end
end
