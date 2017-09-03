class User < ApplicationRecord
  has_many :strat_columns
  has_many :collections
  
  # See Ruby Regexp
  validates_format_of :email, with: /\b[A-Z0-9._%a-z\-]+@stratmap\z/, message: "Add @stratmap next to your username."
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :rememberable, :trackable, :validatable 
        # :recoverable, 
end
