class PagesController < ApplicationController
  before_action :authenticate_user!, only: [:music_player]

  def landing_page
    # redirects to the user sign-in form/root page
  end

  def music_player
    # sets song list to songs associated with current user
    # directs to '/jukebox' page with youtube player and song list
    gon.songs = current_user.songs
  end

  def add_song
    # directs to specific user's jukebox to make song requests via youtube API
    gon.jukebox_owner_id = params[:id]
    @user = User.find(params[:id])
    gon.songs = @user.songs.order(id: :asc)
  end

  def send_text
    # sends text message with a link to the current user (sender) jukebox request form
    @send_text_form = SendTextForm.new(params.require(:send_text_form).permit(:number_to_send_to))
    if (@send_text_form.valid?)
      @send_text_form.send_text_message(current_user)
    end
    render :json => {message: 'Sent'}
  end
end