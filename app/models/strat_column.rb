class StratColumn < ApplicationRecord
  belongs_to :user
  has_many :layers, dependent: :destroy
  
  accepts_nested_attributes_for :layers, allow_destroy: true
  
  validates :name, presence: true
  validates :user_id, presence: true
  validates :lat, numericality: { only_integer: false, allow_nil: true }
  validates :lng, numericality: { only_integer: false, allow_nil: true }
  
  
end
