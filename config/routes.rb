EvernoteClone::Application.routes.draw do

	root :to => "StaticPages#welcome"
  
  devise_for :users

  get "/home", :to => "StaticPages#home"

  resources :notes, :only => [:create, :destroy, :show, :index, :update]
  resources :notebooks, :only =>[:create, :destroy, :index, :update]
  resources :tags, :only => [:create, :destroy]
end
