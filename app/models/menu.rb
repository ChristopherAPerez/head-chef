class Menu < ApplicationRecord
    belongs_to :user

    has_many :menu_to_recipes
    has_many :recipes, through: :menu_to_recipes, dependent: :destroy

    # validate :array_length

    def array_length
        unpublished_menu = Menu.find_by(publish: false)
        menu = unpublished_menu.menu_to_recipes
        if menu_to_recipes.length < 3
        errors.add(:menu, "Incomplete Menu!")
      end
    end

end
