class TagsController < ApplicationController

	def create
		@tag = Tag.new(params[:tag])
		if @tag.save
			render :json => @tag
		else
			render :json => @tag.errors.full_messages
		end
	end

	def destroy
		Tag.find(params[:id]).destroy
		render :json => {:head => :ok}
	end

end
