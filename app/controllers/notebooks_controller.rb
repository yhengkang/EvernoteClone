class NotebooksController < ApplicationController

	def create
		@notebook = Notebook.new()
		@notebook.user_id = current_user.id
		@notebook.name = "Untitled Notebook"
		if @notebook.save
			render :json => @notebook
		else
			render :json => @notebook.errors.full_messages
		end
	end

	def edit
		@notebook = Notebook.find(params[:id])
		@notebook.update_attributes(params[:notebook])
		render :json => @notebook
	end

	def destroy
		Notebook.find(params[:id]).destroy
		render :status => 200	
	end

	def index
		@notebooks = current_user.notebooks
		render :json => @notebooks
	end

end
