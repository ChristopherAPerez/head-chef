class Menu < ApplicationRecord
    belongs_to :user

    has_many :menurecipes
    has_many :recipes, through: :menurecipes
end
