class NotesController < ApplicationController

	#respond_to :json

	def create
  	@note = Note.new(params[:note])
  	@note.user_id = current_user.id
    p "in create!"

    if @note.title.nil?
      @note.title = "Untitled Note"
    end

  	if @note.save
  		render :json => @note
  	else
  		render :json => @note.errors.full_messages
  	end
  end

  def show
    @note = Note.find_by_user_id(current_user.id)
    if @note.nil?
      #maybe create so the notes have an id so updates will work?
      @note = Note.new() 
      @note.title = "Untitled Note"
    end
    render :json => @note
  end

  def index
    @notes = current_user.notes.order("updated_at DESC")
    p @notes
    if @notes.empty?
      @notes << Note.new(title: "Untitled Note" )
    end
    render :json => @notes
  end

  def update
    @note = Note.find(params[:id])
    p "in update!"
    p params
    @note.update_attributes(params[:note])
    p @note
    render :json => @note
  end

  def destroy
    Note.find(params[:id]).destroy
    render :status => 200
  end

end
