class CreateSteps < ActiveRecord::Migration[6.1]
  def change
    create_table :steps do |t|
      t.string :instruction
      t.string :recipe_id

      t.timestamps
    end
  end
end
