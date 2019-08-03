class GameCategory < ApplicationRecord
  validates :completed, null: false

  belongs_to :category
  belongs_to :game
  has_many :game_questions
  has_many :questions, through: :game_questions
end
