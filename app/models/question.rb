class Question < ApplicationRecord
  validates :question_text, presence: true
  validates :answer, presence: true
  validates :value, presence: true
  validates :wiki_intro, presence: true
  validates :wiki_image, presence: true

  belongs_to :category
  has_many :game_questions
  has_many :game_categories, through: :game_questions
end
