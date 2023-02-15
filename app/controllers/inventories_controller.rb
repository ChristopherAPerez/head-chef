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

    private

    def inventory_params
        params.permit(:item_name, :quantity, :item_pic, :user_id)
    end

end
