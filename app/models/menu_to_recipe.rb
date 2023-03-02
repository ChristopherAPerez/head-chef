class MenuToRecipe < ApplicationRecord
    belongs_to :menu, dependent: :delete
    belongs_to :recipe, dependent: :delete

end
