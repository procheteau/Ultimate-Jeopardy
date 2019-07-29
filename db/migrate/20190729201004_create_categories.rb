class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name, null: false
      t.integer :clues_count, null:false

      t.timestamps null: false
    end
  end
end
