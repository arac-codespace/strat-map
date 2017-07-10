class Layer < ApplicationRecord
  belongs_to :strat_column
  belongs_to :lithology
  
  validates :name, presence: true
  validates :lithology_id, presence: true
  
end
