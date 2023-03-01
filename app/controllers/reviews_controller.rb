class ReviewsController < ApplicationController

    def index
        reviews = Review.all
        render json: reviews
    end

    def create
        review = Review.create(review_params)
        render json: review
    end

    def show
        review = Review.find_by(id: params[:id])
        render json: review, include: ['recipe']
    end

    def update
        review = Review.find_by(id: params[:id])
        review.update(review_params)
        if review.valid?
            render json: review, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    private

    def review_params
        params.permit(:rating, :comment, :recipe_id, :user_id, :username)
    end

end
