class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:music_player]

  def landing_page
  end

  def music_player
    gon.songs = current_user.songs
  end

  def add_song
    gon.jukebox_owner_id = params[:id]
    @user = User.find(params[:id])
    gon.songs = @user.songs.order(id: :asc)
  end

  def send_text
    @send_text_form = SendTextForm.new(params.require(:send_text_form).permit(:number_to_send_to))
    if (@send_text_form.valid?)
      @send_text_form.send_text_message(current_user)
    end
    render :json => {message: 'Sent'}
  end
end