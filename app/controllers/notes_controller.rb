class NotesController < ApplicationController

	#respond_to :json

	def create
  	@note = Note.new(params[:note])
  	@note.user_id = current_user.id
  	if @note.save
  		render :json => @note
  	else
  		render :json => @note.errors.full_messages
  	end
  end

  def show
    @note = Note.find_by_user_id(current_user.id)
    if @note.nil?
      @note = Note.new() 
      @note.title = "Untitled Note"
    end
    render :json => @note
  end

  def index
    @notes = Note.where("user_id = ?", current_user.id)
    if @notes.empty?
      @notes << Note.new(title: "Untitled Note" )
    end
    render :json => @notes
  end

  def update

  end

  def destroy
  end

end
