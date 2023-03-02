class FriendshipsController < ApplicationController
    wrap_parameters format: []

def create_friendships
    user = User.find_by(id: session[:user_id])
    friend = User.find_by(id: params[:id])
    friendship = Friendship.new(user_id: user.id, friend_id: friend.id)
    if friendship.save
        render json: friendship.friend
    else
        render json: { error: "Already friends!" }, status: :unprocessable_entity
    end
end

end
