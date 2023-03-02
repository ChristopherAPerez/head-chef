class UsersController < ApplicationController
    wrap_parameters format: []


    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: ["Unprocessable Entity"] }, status: :unprocessable_entity
        end
    end

    def me
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, include: ['friends', 'menus', 'recipes']
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def update
        user = User.find_by(id: params[:id])
        user.update(user_params)
        if user.valid?
            render json: user, include: ['friends', 'menus', 'recipes'], status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio, :profile_pic)
    end

end
