class AddSongrefToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :song_ref, :string
  end
end
