class Layer < ApplicationRecord
  belongs_to :strat_column
  belongs_to :lithology
  belongs_to :timescale
  
  validates :name, presence: true
  validates :lithology_id, presence: true
  validates :timescale_id, presence: true
  
end
