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

  def destroy
  end

  def new
  end

end
