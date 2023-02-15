Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :inventories

  resources :users, except: [:show]
  get "/me", to: "users#show"

  resources :menus

  resources :recipes

  resources :menu_to_recipes

  resources :ingredients

  resources :reviews

end
