class ChangeUserIdDataTypeforStrats < ActiveRecord::Migration[5.1]
  def change
    change_column :strats, :user_id, :integer
  end
end
