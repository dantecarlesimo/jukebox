class PagesController < ApplicationController
  
  before_action :authenticate_user!, only: [:music_player]


  def landing_page
  end

  def music_player
    @songs = current_user.songs
  end

  def add_song
    gon.jukebox_owner_id = params[:id]
    user = User.find(params[:id])
    @songs = user.songs
  end

end