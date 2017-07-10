class AddName3ColumnToLithologies < ActiveRecord::Migration[5.1]
  def change
    add_column :lithologies, :name3, :string
  end
end
