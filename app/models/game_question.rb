class GameQuestion < ApplicationRecord
  belongs_to :game_category
  belongs_to :question

end
