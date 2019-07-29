class Question < ApplicationRecord
  validates :question, presence: true
  validates :answer, presence: true
  validates :value, presence: true

  belongs_to :category
end
