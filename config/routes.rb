EvernoteClone::Application.routes.draw do

  devise_for :users

  root :to => "StaticPages#index"
end
