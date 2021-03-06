# frozen_string_literal: true

# Column layer model
class Layer < ApplicationRecord
  belongs_to :strat_column
  belongs_to :lithology
  belongs_to :timescale
  belongs_to :contact

  has_many :fossils, dependent: :destroy
  accepts_nested_attributes_for :fossils, allow_destroy: true

  validates :name, presence: true
  validates :timescale_name, presence: true
  validates_presence_of :lithology_id, message: '- Please select a valid lithology pattern.'
  validates_presence_of :timescale_id, message: '- Please select a valid geologic age.'
  validates :contact_id, presence: true
  validates :thickness, presence: true, numericality: { only_integer: false, greater_than_or_equal_to: 0.1 }

  def self.join_columns(column_id)
    joins(:strat_column).where(strat_columns: { id: column_id })
  end

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
    # Note that we include the methods to search for the attribute we want
    # prior to the self.lithology line.  This is to prevent errors from trying
    # to pass methods on a nil class.  The presense validation above takes care
    # of validating for cases where user inputs that results in nil.
    name.gsub!(/[^0-9,.]/, '')
    if name.present?
      find_by_url = Lithology.where('url like ?', "%#{name}%")
      find_by_url = find_by_url.try(:first).try(:url)
    else
      find_by_url = nil
    end
    self.lithology = Lithology.find_by_url(find_by_url)
  end
end
