class FriendsController < ApplicationController
    wrap_parameters format: []

    def friend_last_menu
        user = User.find_by(id: params[:id])
        menu = user.menus.where(publish: true).order(id: :desc).first
        if menu
            render json: menu, include: ['recipes']
        else
            render json: { error: "This friends hasn't published a menu!" }, status: :unprocessable_entity
        end
    end

end
