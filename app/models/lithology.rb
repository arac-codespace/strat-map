class Lithology < ApplicationRecord
  has_many :layers
  

  # Function used in form collection_select to create custom label.
  def name_with_texture_num
    # gsub regex will remove all non-numerical chars
    
    url_scrubbed = url
    url_scrubbed.gsub!(/[^0-9,.]/, "")

    if !self.name3.blank?
      "#{name} or #{name2} or #{name3}: ##{url_scrubbed}"
    elsif !self.name2.blank?
      "#{name} or #{name2}: ##{url_scrubbed}"
    else
      "#{name}: ##{url_scrubbed}"
    end
    
  end
  
  
  
end
