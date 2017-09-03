class Collection < ApplicationRecord
  has_many :column_collections, dependent: :destroy
  has_many :strat_columns, through: :column_collections
  belongs_to :user
  
end
