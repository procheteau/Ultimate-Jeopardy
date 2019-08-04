class GameCategorySerializer < ActiveModel::Serializer
  attributes :id, :completed, :game_id, :category_id

  # belongs_to :category
  belongs_to :game
  # has_many :game_questions
  # has_many :questions, through: :game_questions
end
