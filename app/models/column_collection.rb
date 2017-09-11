class ColumnCollection < ApplicationRecord
  belongs_to :strat_column
  belongs_to :collection
  
  default_scope { order('position ASC') }  
  
  acts_as_list
end
