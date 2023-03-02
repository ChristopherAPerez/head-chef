Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :users, only: [:create, :update]
  get "/me", to: "users#me"

  resources :menus, only: [:create, :update]
  get "/menu_history", to: "menus#menu_history"
  get "/unpublish_menu", to: "menus#unpublish_menu"
  get "/retrieve_cal_stats", to: "menus#retrieve_cal_stats"
  get "/retrieve_prep_stats", to: "menus#retrieve_prep_stats"
  delete "/clear_menu", to: "menus#clear_menu"
  

  resources :recipes
  get "/my_recipes_menus/:id", to: "recipes#my_recipes_menus"
  get "/recipes_search", to: "recipes#recipes_search"
  get "/recipes_filter", to: "recipes#recipes_filter"
  

  resources :menu_to_recipes, only: [:create]

  resources :reviews, only: [:create]

  get "/friend_last_menu/:id", to: "friends#friend_last_menu"

  post "/create_friendships/:id", to: "friendships#create_friendships"

  post 'send_sms', to: 'sms#send_sms'

end
