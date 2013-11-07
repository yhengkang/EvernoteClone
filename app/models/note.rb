class Note < ActiveRecord::Base
  attr_accessible :title, :content, :notebook_id
  validates :user_id, :presence => true

  belongs_to :notebook
end
