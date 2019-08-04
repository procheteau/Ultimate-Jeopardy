class Game < ApplicationRecord
  validates :score, null: false
  validates :completed, null: false

  # belongs_to :user
  has_many :game_categories
  has_many :categories, through: :game_categories

  has_many :game_questions, through: :game_categories
  has_many :questions, through: :game_questions
end
