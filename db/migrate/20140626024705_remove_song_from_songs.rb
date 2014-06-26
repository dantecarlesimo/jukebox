class RemoveSongFromSongs < ActiveRecord::Migration
  def change
    remove_column :songs, :song, :string
  end
end
