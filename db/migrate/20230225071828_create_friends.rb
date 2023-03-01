class CreateFriends < ActiveRecord::Migration[6.1]
  def change
    create_table :friends do |t|
      t.string :username
      t.string :password_digest
      t.string :bio
      t.string :profile_pic

      t.timestamps
    end
  end
end
