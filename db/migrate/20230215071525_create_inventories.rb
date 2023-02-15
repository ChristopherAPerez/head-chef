class CreateInventories < ActiveRecord::Migration[6.1]
  def change
    create_table :inventories do |t|
      t.string :item_name
      t.integer :quantity
      t.string :item_pic
      t.integer :user_id

      t.timestamps
    end
  end
end
