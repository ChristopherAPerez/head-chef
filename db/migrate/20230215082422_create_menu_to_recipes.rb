class CreateMenuToRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :menu_to_recipes do |t|
      t.integer :menu_id
      t.integer :recipe_id

      t.timestamps
    end
  end
end
