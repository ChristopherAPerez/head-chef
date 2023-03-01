class RecipesController < ApplicationController

    def index
        recipes = Recipe.all
        render json: recipes, include: ['reviews', 'user']
    end

    def users_recipe_index
        user = User.find_by(id: session[:user_id])
        recipes = Recipe.where(user_id: user.id)
        render json: recipes, include: ['reviews', 'user']
    end

    def create
        recipe = Recipe.create(recipe_params)
        render json: recipe, include: ['reviews', 'user']
    end

    def show
        recipe = Recipe.find_by(id: params[:id])
        render json: recipe, include: ['reviews', 'user']
    end

    def update
        recipe = Recipe.find_by(id: params[:id])
        recipe.update(recipe_params)
        if recipe.valid?
            render json: recipe, include: ['reviews', 'user'], status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    def destroy
        recipe = Recipe.find_by(id: params[:id])
        recipe.destroy
        head :no_content
    end

    def recipes_search
        recipes = Recipe.search(params[:recipe_name])
        render json: recipes, include: ['reviews', 'user']
    end

    def recipes_filter
        recipes = Recipe.all
        recipes = recipes.by_meal(params[:meal]) if params[:meal].present?
        render json: recipes, include: ['reviews', 'user']
    end

    private

    def recipe_params
        params.permit(:recipe_name, :meal, :description, :calories, :prep_time, :recipe_pic, :user_id, :active, steps: [], ingredients: [])
    end
    
end
