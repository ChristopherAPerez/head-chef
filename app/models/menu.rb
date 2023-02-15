class Menu < ApplicationRecord
    belongs_to :user

    has_many :menu_to_recipes
    has_many :recipes, through: :menu_to_recipes
end
