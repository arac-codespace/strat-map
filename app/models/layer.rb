class Layer < ApplicationRecord
  belongs_to :strat_column
  belongs_to :lithology
  belongs_to :timescale
  belongs_to :contact
  
  validates :name, presence: true
  validates :lithology_id, presence: true
  validates :timescale_id, presence: true
  validates :contact_id, presence: true
  validates :thickness, presence: true, numericality: { only_integer: false }
  
  def timescale_name
    timescale.try(:interval_name)
  end
  
  def timescale_name=(name)
    self.timescale = Timescale.find_by_interval_name(name)
  end
  
  
  def lithology_name
    lithology.try(:name_with_texture_num)
  end
  
  def lithology_name=(name)
    # So an explanation...
    # First we get lithology_name which is defined by the virtual attribute
    # shown above.  That attribute (defined in lithology model) has the url
    # texture number that is unique.  So we strip everything out of the string
    # with gsub, look for it using a like query and set attribute with last line
    name.gsub!(/[^0-9,.]/, "")
    find_byURL = Lithology.where("url like ?", "%#{name}%")
    self.lithology = Lithology.find_by_url(find_byURL.first.url)
  end

end
