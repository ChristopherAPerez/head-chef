class InventoriesController < ApplicationController

    def index
        inventories = Inventory.all
        render json: inventories, include: ['user']
    end

    def create
        inventory = Inventory.create(inventory_params)
        render json: inventory
    end

    def show
        inventory = Inventory.find_by(id: params[:id])
        render json: inventory, include: ['user']
    end

    def update
        inventory = Inventory.find_by(id: params[:id])
        inventory.update(inventory_params)
        if inventory.valid?
            render json: inventory, status: :accepted
        else
            render json: { error: "error" }, status: :unprocessable_entity
        end
    end

    def update_user_inventory
        inventory = Inventory.where(user_id: session[:user_id])
        ingredient = Ingredient.new(ingredient_params)

        updated_inventory = inventory.map do |item|
            if item.item_name == ingredient.item_name
                item.update(quantity: item.quantity - ingredient.quantity)
                item
            else
                item
            end
        end


        # inventory = user.inventories


        # recipe.ingredients.each do |element|
        #     inventory.each do |stock|
        #         if stock.item == element.ingredient
        #             stock.update(quantity: stock.quantity - element.portion)
        #         else
        #             render json: { errors: ["Not Found"] }, status: :unprocessable_entity
        #         end
        #     end
        #         inventory.update(quantity: quantity - element.portion)
        #         render json: { errors: ["Not found"] }, status: :unauthorized
        #     puts element.ingredient
        # end
        render json: updated_inventory
    end

    private

    def inventory_params
        params.permit(:item_name, :quantity, :item_pic, :user_id)
    end

    def ingredient_params
        params.permit(:item_name, :quantity)
    end

end
