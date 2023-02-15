class Recipe < ApplicationRecord
    belongs_to :user

    has_many :menu_to_recipes
    has_many :menus, through: :menu_to_recipes

    has_many :ingredients
    has_many :reviews

    serialize :steps, Array
end
