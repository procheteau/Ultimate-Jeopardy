class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.integer :score, null: false, default: 0
      t.boolean :completed, null:false, default: false

      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
