class Timescale < ApplicationRecord
  has_many :layers
  
  
  def name_with_age
    if self.early_age == nil
      "#{interval_name}"
    else
      "#{interval_name}:  #{early_age} Ma to #{late_age} Ma"
    end
  end
end
