class AddClassificationColumnToLithology < ActiveRecord::Migration[5.1]
  def change
    add_column :lithologies, :classification, :string
  end
end
