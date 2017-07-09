class Strat < ApplicationRecord
  belongs_to :user
  has_many :layers
  accepts_nested_attributes_for :layers
  
end
