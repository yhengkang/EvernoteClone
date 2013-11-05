class StaticPagesController < ApplicationController

	before_filter :authenticate_user!, :only => [:home]

	def home
		render :home
	end

	def welcome
		render :welcome
	end

end
