class MenuToRecipesController < ApplicationController

    def index
        menutorecipe = MenuToRecipe.all
        render json: menutorecipe
    end

end
