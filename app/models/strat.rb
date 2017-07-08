class Strat < ApplicationRecord
  belongs_to :user
  has_many :layers
end
