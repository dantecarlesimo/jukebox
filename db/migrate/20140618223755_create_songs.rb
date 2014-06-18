class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.references :playlist, index: true
      t.string :song

      t.timestamps
    end
  end
end
