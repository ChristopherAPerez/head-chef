class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: ['menus', 'recipes']
    end

    def create
        user = User.create(user_params)
        render json: users
    end

    def show
        users = User.find_by(id: params[:id])
        render json: users, include: ['menus', 'recipes', 'reviews']
    end

    def update
        user = User.find_by(id: params[:id])
        user.update(user_params)
        if user.valid?
            render json: user, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio, :profile_pic)
    end

end
