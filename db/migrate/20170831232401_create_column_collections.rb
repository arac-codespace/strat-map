class CreateColumnCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :column_collections do |t|
      t.references :strat_column
      t.references :collection

      t.timestamps
    end
  end
end
