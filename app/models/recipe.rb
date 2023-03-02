class Recipe < ApplicationRecord
    belongs_to :user

    has_many :menu_to_recipes
    has_many :menus, through: :menu_to_recipes

    has_many :reviews

    serialize :steps, Array
    serialize :ingredients, Array

    validates :recipe_name, presence: true, length: { minimum: 1 }
    validates :description, presence: true, length: { minimum: 20 }
    validates :prep_time, presence: true, numericality: true
    validates :calories, presence: true, numericality: true

    scope :search, -> (recipe_name){where("recipe_name LIKE ?", "%#{recipe_name}%")}
    scope :by_meal, -> (meal){where(meal: meal)}
    
end
