class ChangeGameQuestionsAssociations < ActiveRecord::Migration[5.2]
  def up
    remove_column :game_questions, :game_id
    add_column :game_questions, :game_category_id, :bigint
    add_index :game_questions, :game_category_id
  end

  def down
    remove_column :game_questions, :game_category_id
    add_column :game_questions, :game_id, :bigint
    add_index :game_questions, :game_id
  end
end
