class TagsController < ApplicationController

	def create
		@tag = Tag.new(params[:tag])
		if @tag.save
			render :json => @tag
		else
			render :status => 422
		end
	end

	def destroy
		Tag.find(params[:id]).destroy
		render :json => {:head => :ok}
	end

	def index
		@tags = Tag.all
		render :json => @tags
	end

end
