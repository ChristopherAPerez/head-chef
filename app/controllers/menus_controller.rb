class MenusController < ApplicationController

    def index
        menus = Menu.all
        render json: menus, include: ['user', 'recipes']
    end

    def index_published
        menus = Menu.where(publish: true)
        render json: menus, include: ['recipes']
    end

    def create
        menu = Menu.create(menu_params)
        render json: menu, include: ['recipes']
    end

    def show
        menu = Menu.find_by(id: params[:id])
        render json: menu, include: ['user', 'recipes']
    end

    def update
        menu = Menu.find_by(id: params[:id])
        menu.update(menu_params)
        if menu.valid?
            render json: menu, include: ['recipes'], status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    def published
        menu = Menu.find_by(publish: false)
        if menu
            render json: menu, include: ['recipes']
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    def add_to_published
        menu = Menu.find_by(publish: false)
        menu_recipes = menu.recipes
        menu_recipes.create(recipe_params)
        if menu_recipes
            render json: menu_recipes
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def menu_params
        params.permit(:menu_date, :user_id, :publish)
    end

    def recipe_params
        params.permit(:recipe_name, :meal, :description, :calories, :prep_time, :recipe_pic, :user_id, steps: [])
    end

end
