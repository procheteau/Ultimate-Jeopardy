class GameCategory < ApplicationRecord
  validates :completed, null: false

  belongs_to :category
  belongs_to :game
end
