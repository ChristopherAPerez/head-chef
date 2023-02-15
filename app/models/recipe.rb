class Recipe < ApplicationRecord
    has_many :menurecipes
    has_many :menus, through: :menurecipes

    has_many :ingredients
    has_many :reviews

    serialize :steps, Array
end
