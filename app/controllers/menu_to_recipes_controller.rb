class MenuToRecipesController < ApplicationController
    wrap_parameters format: []

    def create
        menu = Menu.find_by(publish: false)
        menu_to_recipes = menu.menu_to_recipes
        if menu_to_recipes.length <= 2
            menu_to_recipes.create(menu_to_recipe_params)
            render json: menu_to_recipes
        else
            render json: { errors: "Can't have more than 3 elements" }, status: :unprocessable_entity
        end
    end

    private

    def menu_to_recipe_params
        params.permit(:name, :description, :calories, :prep_time, :menu_id, :recipe_id)
    end

end
