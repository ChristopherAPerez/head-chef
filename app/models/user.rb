class User < ApplicationRecord
    has_many :inventories
    has_many :menus
    has_many :recipes
    has_many :reviews

    has_many :friendships
    has_many :friends, through: :friendships

    has_secure_password
end
