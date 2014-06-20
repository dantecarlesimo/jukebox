class SongsController < ApplicationController
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


  private
    def song_params
      params.require(:song).permit(:song, :user_id)
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