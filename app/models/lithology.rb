class Lithology < ApplicationRecord
  has_many :layers
  
  # Function used in form collection_select to create custom label.
  def name_with_texture_num
    # gsub regex will remove all non-numerical chars
    "##{url.gsub!(/[^0-9,.]/, "")}: #{name}"
  end
  
  
  
end
