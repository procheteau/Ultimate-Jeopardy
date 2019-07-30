class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :question_text, null: false
      t.string :answer, null: false
      t.integer :value, null: false

      t.belongs_to :category
      t.timestamps null:false
    end
  end
end
