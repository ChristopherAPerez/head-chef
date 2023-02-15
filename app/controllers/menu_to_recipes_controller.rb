class MenuToRecipesController < ApplicationController

    def index
        menu_to_recipes = MenuToRecipe.all
        render json: menu_to_recipe, include: ['menu', 'recipe']
    end

    def create
        menu_to_recipe = MenuToRecipe.create(menu_to_recipe_params)
        render json: menu_to_recipe
    end

    def show
        menu_to_recipe = MenuToRecipe.find_by(id: params[:id])
        render json: menu_to_recipe, include: ['menu', 'recipe']
    end

    def update
        menu_to_recipe = MenuToRecipe.find_by(id: params[:id])
        menu_to_recipe.update(menu_to_recipe_params)
        if menu_to_recipe.valid?
            render json: menu_to_recipe, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def menu_to_recipe_params
        params.permit(:menu_id, :recipe_id)
    end

end
