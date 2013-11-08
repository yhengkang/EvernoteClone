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

	def update
		@notebook = Notebook.find(params[:id])
		@notebook.update_attributes(params[:notebook])
		render :json => @notebook
	end

	def destroy
		Notebook.find(params[:id]).destroy
		render :json => {:head => :ok}
	end

	def index
		@notebooks = current_user.notebooks
		render :json => @notebooks
	end

end
