EvernoteClone::Application.routes.draw do

	root :to => "StaticPages#welcome"
  
  devise_for :users

  get "/home", :to => "StaticPages#home"

  resources :notes, :only => [:create, :destroy]
end
