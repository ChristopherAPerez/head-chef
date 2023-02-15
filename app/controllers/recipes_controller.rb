class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        render json: recipes, include: ['ingredients', 'reviews', 'user']
    end

    def create
        recipe = Recipe.create(recipe_params)
        render json: recipe
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: recipe, include: ['ingredients', 'reviews', 'user']
    end

    def update
        recipe = Recipe.find_by(id: params[:id])
        recipe.update(recipe_params)
        if recipe.valid?
            render json: recipe, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def recipe_params
        params.permit(:name, :meal, :description, :calories, :prep_time, :recipe_pic, :user_id, steps: [])
    end
    
end
