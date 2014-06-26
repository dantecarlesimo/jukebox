class Song < ActiveRecord::Base
  belongs_to :playlist
  belongs_to :user

  validates :title, presence: true
  validates :user_id, presence: true
  validates :song_ref, presence: true

end
