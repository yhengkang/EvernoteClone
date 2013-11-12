class Tag < ActiveRecord::Base
  attr_accessible :name, :note_id
  validates :name, :note_id, :presence => true

  belongs_to :note
end
