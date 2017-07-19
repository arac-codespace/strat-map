class Lithology < ApplicationRecord
  has_many :layers
  
  # Function used in form collection_select to create custom label.
  def name_with_texture_num
    # gsub regex will remove all non-numerical chars
    
    if !self.name3.blank?
      "##{url.gsub!(/[^0-9,.]/, "")}: #{name} or #{name2} or #{name3}"
    elsif !self.name2.blank?
      "##{url.gsub!(/[^0-9,.]/, "")}: #{name} or #{name2}"
    else
      "##{url.gsub!(/[^0-9,.]/, "")}: #{name}"
    end
    
  end
  
  
  
end
