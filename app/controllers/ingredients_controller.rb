class IngredientsController < ApplicationController

    def index
        ingredients = Ingredient.all
        render json: ingredients, include: ['recipe']
    end

    def create
        ingredient = Ingredient.create(ingredient_params)
        render json: ingredient
    end

    def show
        ingredient = Ingredient.find_by(id: params[:id])
        render json: ingredient, include: ['recipe']
    end

    def update
        ingredient = Ingredient.find_by(id: params[:id])
        ingredient.update(ingredient_params)
        if ingredient.valid?
            render json: ingredient, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def ingredient_params
        params.permit(:item_name, :quantity, :recipe_id)
    end

end
