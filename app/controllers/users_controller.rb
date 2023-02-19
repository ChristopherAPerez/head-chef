class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: ['menus', 'recipes']
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: ["Unprocessable Entity"] }, status: :unprocessable_entity
        end
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: ['inventories', 'menus', 'recipes']
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
        # user = User.find_by(id: session[:user_id])
        # render json: user, include: [:inventories, :menus, :recipes, :reviews]
    end

    def update
        user = User.find_by(id: params[:id])
        user.update(user_params)
        if user.valid?
            render json: user, include: ['inventories', 'menus', 'recipes'], status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio, :profile_pic)
    end

end
