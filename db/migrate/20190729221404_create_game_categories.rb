class CreateGameCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :game_categories do |t|
      t.boolean :completed, null: false, default: false

      t.belongs_to :category, null: false
      t.belongs_to :game, null: false
      t.timestamps null: false
    end
  end
end
