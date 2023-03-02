class MenusController < ApplicationController

    def create
        menu = Menu.create(menu_params)
        if menu.valid?
        render json: menu, include: ['recipes']
        else
            render json: { error: "Not a menu!!" }, status: :unprocessable_entity
        end
    end

    def update
        menu = Menu.find_by(publish: false)
        if menu.menu_to_recipes.length == 3
            menu.update(menu_params)
            render json: menu, include: ['recipes', 'menu_to_recipes'], status: :accepted
        else
            render json: { error: "Incomplete Menu!" }, status: :unprocessable_entity
        end
    end

    def menu_history
        user = User.find_by(id: session[:user_id])
        menus = Menu.where(user_id: user.id).where(publish: true)
        render json: menus, include: ['menu_to_recipes', 'recipes']
    end

    def unpublish_menu
        user = User.find_by(id: session[:user_id])
        menus = Menu.where(user_id: user.id)
        menu = menus.find_by(publish: false)
        if menu
            render json: menu, include: ['recipes', 'menu_to_recipes']
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    def retrieve_cal_stats
        user = User.find_by(id: session[:user_id])
        menus = Menu.where(user_id: user.id).where(publish: true).limit(5).order(created_at: :desc)
        array = menus.map do |menu|
                menu.menu_to_recipes
        end
        total_cal = array.map do |meal|
            cal = meal.reduce(0) { |sum, element| sum + element.calories }
        end
        data = menus.map.with_index do |menu, index|
            {
                    "date" => menu.menu_date,
                    "total" => total_cal[index]
            }
        end
        render json: data
    end

    def retrieve_prep_stats
        user = User.find_by(id: session[:user_id])
        menus = Menu.where(user_id: user.id).where(publish: true).limit(5).order(created_at: :desc)
        array = menus.map do |menu|
                menu.menu_to_recipes
        end
        total_prep = array.map do |meal|
            cal = meal.reduce(0) { |sum, element| sum + element.prep_time }
        end
        data = menus.map.with_index do |menu, index|
            {
                    "date" => menu.menu_date,
                    "total" => total_prep[index]
            }
        end
        render json: data
    end

    def clear_menu
        menu = Menu.find_by(publish: false)
        menu_to_recipes = menu.menu_to_recipes
        recipes = menu.recipes
        menu_to_recipes.each do |menu_to_recipe|
            menu_to_recipe.destroy
        end
        recipes.each do |recipe|
            recipe.destroy
        end
        render json: menu, include: ['menu_to_recipes', 'recipes']
    end

    private

    def menu_params
        params.permit(:menu_date, :user_id, :publish)
    end

    def recipe_params
        params.permit(:recipe_name, :meal, :description, :calories, :prep_time, :recipe_pic, :user_id, steps: [])
    end

end
