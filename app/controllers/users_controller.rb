class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, include: ['menus', 'recipes']
    end

end
