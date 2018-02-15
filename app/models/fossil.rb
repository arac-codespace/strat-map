# frozen_string_literal: true

# Fossil model
class Fossil < ApplicationRecord
  belongs_to :layer
  validates :name, presence: true
  validates_inclusion_of :abundance, in: %w[Abundant Common Frequent Occasional Rare],
                                     allow_blank: true, message: '-- Choose a term from the list.'
end
