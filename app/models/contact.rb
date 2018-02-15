# frozen_string_literal: true

# Unconformities model
class Contact < ApplicationRecord
  has_many :layers
end
