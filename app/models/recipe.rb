class Recipe < ApplicationRecord
    belongs_to :user

    has_many :menu_to_recipes
    has_many :menus, through: :menu_to_recipes


    
    has_many :reviews

    serialize :steps, Array
    serialize :ingredients, Array

    scope :search, -> (recipe_name){where("recipe_name LIKE ?", "%#{recipe_name}%")}
    scope :by_meal, -> (meal){where(meal: meal)}
    
end
