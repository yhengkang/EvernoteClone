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

	def search
		p params
		#{"tag"=>{"name"=>"tag1"}, "controller"=>"tags", "action"=>"search"}
		@search_result = Tag.find_by_sql([<<-SQL, current_user.id, params["tag"]["name"]])
			SELECT
				notes.*
			FROM
				tags 
			JOIN
				notes ON tags.note_id = notes.id
			WHERE
				notes.user_id = ? AND tags.name = ?			
		SQL
		p @search_result
		render :json => @search_result
	end

end
