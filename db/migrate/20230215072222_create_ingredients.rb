class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :item_name
      t.integer :quantity
      t.integer :recipe_id

      t.timestamps
    end
  end
end
