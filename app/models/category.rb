class Category < ApplicationRecord
  validates :name, presence: true
  validates :clues_count, presence: true

  has_many :questions
end