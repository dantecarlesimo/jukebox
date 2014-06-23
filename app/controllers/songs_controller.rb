class SongsController < ApplicationController
  def index
    # binding.pry
    # user = User.find(params[:id])
    # @songs=user.songs
    @songs = current_user.songs.order(id: :asc)
    respond_to do |f|
    f.json { render :json => @songs, :only => [:id, :title, :song_ref, :user_id]}
  end

  def show  
      

    @song=Song.find(params[:id])
     respond_to do |f|
    f.json { render :json => @song, :only => [:id, :title, :song_ref, :user_id]}
    end

  end
      
  end

  def new
    @song = Song.new
  end

  def create
    @song = Song.new(song_params)
     respond_to do |format|
       if @song.save
         format.json { render json: @song, status: :created}
       else
         format.json { render json: @song.errors, status: :unprocessable_entity }
       end
     end
  end

  def destroy
    @song=Song.find(params[:id])
    @song.destroy
    respond_to do |f|
    f.json { render :json => @song, :only => [:id, :title, :song_ref, :user_id]}
    end
  end


  private
    def song_params
      params.require(:song).permit(:song_ref, :title, :user_id)
    end

end




  # def index
  #   @todos = Todo.all
  # end

  # def new
  #   @todos = Todo.all
  #   @todo = Todo.new
  # end

  # def create
  #   @todo = Todo.new(todo_params)

  #   respond_to do |format|
  #     if @todo.save
  #       format.json { render json: @todo, status: :created}
  #     else
  #       format.json { render json: @todo.errors, status: :unprocessable_entity }
  #     end
  #   end

  # end

  # private
  # def todo_params
  #   params.require(:todo).permit(:title, :description)
  # end