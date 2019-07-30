class Game < ApplicationRecord
  validates :score, null: false
  validates :completed, null: false

  belongs_to :user
end
