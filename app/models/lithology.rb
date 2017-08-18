class Lithology < ApplicationRecord
  has_many :layers
  

  # Function used in form collection_select to create custom label.
  def name_with_texture_num
    # gsub regex will remove all non-numerical chars
    
    if !self.name3.blank?
      "#{name} or #{name2} or #{name3}: ##{url.gsub!(/[^0-9,.]/, "")}"
    elsif !self.name2.blank?
      "#{name} or #{name2}: ##{url.gsub!(/[^0-9,.]/, "")}"
    else
      "#{name}: ##{url.gsub!(/[^0-9,.]/, "")}"
    end
    
  end
  
  
  
end
