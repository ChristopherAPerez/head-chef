class AddFriendIdToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :friend_id, :integer
    add_foreign_key :users, :users, column: :friend_id
  end
end
