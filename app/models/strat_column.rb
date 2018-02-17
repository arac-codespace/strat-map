# frozen_string_literal: true

# Stratigraphic column main model
class StratColumn < ApplicationRecord
  belongs_to :user
  has_many :layers, dependent: :destroy
  has_many :column_collections
  # Destroys join table records
  has_many :collections, through: :column_collections, dependent: :destroy

  accepts_nested_attributes_for :layers, allow_destroy: true

  validates :name, presence: true
  validates :user_id, presence: true
  validates :lat, numericality: { only_integer: false, allow_nil: true }
  validates :lng, numericality: { only_integer: false, allow_nil: true }

  def total_thickness
    layers.sum(:thickness)
  end
end
