class AddColumnsToMenuToRecipe < ActiveRecord::Migration[6.1]
  def change
    add_column :menu_to_recipes, :name, :string
    add_column :menu_to_recipes, :description, :string
    add_column :menu_to_recipes, :calories, :integer
    add_column :menu_to_recipes, :prep_time, :integer
  end
end
