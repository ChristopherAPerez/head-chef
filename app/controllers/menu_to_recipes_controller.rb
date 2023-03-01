class MenuToRecipesController < ApplicationController

    def index
        menu_to_recipes = MenuToRecipe.all
        render json: menu_to_recipes, include: ['menu', 'recipe']
    end

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
            render json: { errors: ["error"] }, status: :unprocessable_entity
        end
    end

    def destroy
        menu_to_recipe = MenuToRecipe.find_by(id: params[:id])
            menu_to_recipe.destroy
            head :no_content
    end

    private

    def menu_to_recipe_params
        params.permit(:menu_id, :recipe_id)
    end

end
