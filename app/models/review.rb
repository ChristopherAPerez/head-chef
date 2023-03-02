class Review < ApplicationRecord
    belongs_to :recipe

    validates :username, presence: true
    validates :rating, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 5 }
    validates :comment, presence: true, length: { minimum: 50 }
end
