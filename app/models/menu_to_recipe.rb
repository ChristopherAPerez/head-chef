class MenuToRecipe < ApplicationRecord
    belongs_to :menu, dependent: :delete
    belongs_to :recipe, dependent: :delete

    validate :array_length_limit

    def array_length_limit
        menu = Menu.find_by(publish: false)
        menu_to_recipes = menu.menu_to_recipes
      if menu_to_recipes.length >= 3
        errors.add(:menu_to_recipes, "Can't have more than 3 elements")
      end
    end

end
