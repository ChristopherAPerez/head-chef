class AddPublishToMenu < ActiveRecord::Migration[6.1]
  def change
    add_column :menus, :publish, :boolean
  end
end
