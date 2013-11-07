class Notebook < ActiveRecord::Base
  attr_accessible :name
	validates :user_id, :presence => true

	has_many :notes, :dependent => :destroy
end
