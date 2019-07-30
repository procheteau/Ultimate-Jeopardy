class CreateGameQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :game_questions do |t|
      t.boolean :correct

      t.belongs_to :question, null: false
      t.belongs_to :game, null: false
      t.timestamps null: false
    end
  end
end
