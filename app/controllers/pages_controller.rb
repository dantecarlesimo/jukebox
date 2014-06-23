class PagesController < ApplicationController
  
  before_action :authenticate_user!, only: [:music_player]


  def landing_page
  end

  def music_player
    # user=User.find(params[:id])
    # @songs = current_user.songs
    # @songs = user.songs
    gon.songs = current_user.songs
    gon.song_ref = current_user.songs.last.song_ref
  end

  def add_song
    gon.jukebox_owner_id = params[:id]
    user = User.find(params[:id])
    gon.songs = user.songs.order(id: :asc)
  end

 

end