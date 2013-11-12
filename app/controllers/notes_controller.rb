class NotesController < ApplicationController
	#respond_to :json

	def create
  	@note = Note.new(params[:note])
  	@note.user_id = current_user.id

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
    @notes = current_user.notes.order("updated_at DESC").includes(:tags)
    if @notes.empty?
      note = Note.new(title: "Untitled Note" )
      note.user_id = current_user.id
      note.save!
      @notes << note
    end
    render :json => @notes, :include => :tags
  end

  def update
    @note = Note.find(params[:id])
    @note.notebook_id = params[:notebook_id]
    @note.save
    @note.update_attributes(params[:note])
    render :json => @note
  end

  def destroy
    Note.find(params[:id]).destroy
    render :json => {:head => :ok}
  end

end
