# frozen_string_literal: true

# Geologic timescale model
class Timescale < ApplicationRecord
  has_many :layers
end
