class GameSerializer < ActiveModel::Serializer
  attributes :id, :score, :completed, :user_id

  has_many :game_categories
  has_many :categories, through: :game_categories

  has_many :game_questions, through: :game_categories
  has_many :questions, through: :game_questions
end
