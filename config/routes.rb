Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :inventories
  patch "/update_user_inventory", to: "inventories#update_user_inventory"

  resources :users, except: [:show]
  get "/me", to: "users#show"

  resources :menus
  get "/index_published", to: "menus#index_published"
  get "/published", to: "menus#published"
  get "/published_recipes", to: "menus#published_recipes"
  get "/retrieve_cal_stats", to: "menus#retrieve_cal_stats"
  get "/retrieve_prep_stats", to: "menus#retrieve_prep_stats"
  delete "/clear_menu", to: "menus#clear_menu"
  post "/addRecipe", to: "menus#add_to_published"
  

  resources :recipes
  get "/users_recipe_index", to: "recipes#users_recipe_index"
  get "/my_recipes_menus/:id", to: "recipes#my_recipes_menus"
  get "/recipes_search", to: "recipes#recipes_search"
  get "/recipes_filter", to: "recipes#recipes_filter"
  

  resources :menu_to_recipes

  resources :ingredients

  resources :reviews

  resources :friends
  get "/friend_last_menu/:id", to: "friends#friend_last_menu"

  post "/create_friendships/:id", to: "friendships#create_friendships"

  post 'send_sms', to: 'sms#send_sms'

end
