class Game < ApplicationRecord
  validates :score, null: false
  validates :completed, null: false

  belongs_to :user
  has_many :gamecategories
  has_many :categories, through: :gamecategories

  has_many :gamequestions
  has_many :questions, through: :gamequestions
end
