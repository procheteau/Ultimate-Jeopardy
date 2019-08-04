class Category < ApplicationRecord
  validates :name, presence: true
  validates :clues_count, presence: true

  has_many :questions
  has_many :game_categories
  has_many :games, through: :game_categories
  # belongs_to :user
end
