class AddHighScoreToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :high_score, :integer, null: false, default: 0
    add_reference :categories, :user, index: true
  end
end
