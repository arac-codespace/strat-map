class Strat < ApplicationRecord
  belongs_to :user
  has_many :layers
  accepts_nested_attributes_for :layers, allow_destroy: true
  
  validates :name, presence: true
  validates :user_id, presence: true
  
  
  
end
