class Collection < ApplicationRecord
  has_many :column_collections
  has_many :strat_columns, through: :column_collections
end
