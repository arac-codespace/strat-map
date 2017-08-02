class RemoveUnusedFieldsFromTimescale < ActiveRecord::Migration[5.1]
  def change
    remove_column :timescales, :scale_no, :integer
    remove_column :timescales, :interval_no, :integer
    remove_column :timescales, :parent_no, :integer
    remove_column :timescales, :reference_no, :string
  end
end
