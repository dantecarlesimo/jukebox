class AddColumnToSongs < ActiveRecord::Migration
  def change
    add_reference :songs, :user, index: true
  end
end
