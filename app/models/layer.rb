class Layer < ApplicationRecord
  belongs_to :strat
  belongs_to :lithology
  
  validates :name, presence: true
  validates :lithology_id, presence: true
  
end
