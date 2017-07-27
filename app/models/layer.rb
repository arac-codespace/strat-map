class Layer < ApplicationRecord
  belongs_to :strat_column
  belongs_to :lithology
  belongs_to :timescale
  belongs_to :contact
  
  validates :name, presence: true
  validates :lithology_id, presence: true
  validates :timescale_id, presence: true
  validates :contact_id, presence: true
  validates :thickness, presence: true, numericality: { only_integer: false }
  
end
