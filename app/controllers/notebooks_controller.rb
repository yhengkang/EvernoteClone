class NotebooksController < ApplicationController

	def create
		@notebook = Notebook.new()
		
	end

	def destroy
	end

	def index
		@notebooks = current_user.notebooks
		render :json => @notebooks
	end

end
