class MenusController < ApplicationController

    def index
        menus = Menu.all
        render json: menus, include: ['user', 'recipes']
    end

    def create
        menu = Menu.create(menu_params)
        render json: menu
    end

    def show
        menu = Menu.find_by(id: params[:id])
        render json: menu, include: ['user', 'recipes']
    end

    def update
        menu = Menu.find_by(id: params[:id])
        menu.update(menu_params)
        if menu.valid?
            render json: menu, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def menu_params
        params.permit(:menu_date, :user_id)
    end

end
