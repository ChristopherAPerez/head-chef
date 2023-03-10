class Friend < ApplicationRecord
    has_many :friendships
    has_many :users, through: :friendships

    validates :username, presence: true
end
