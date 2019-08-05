class GameCategorySerializer < ActiveModel::Serializer
  attributes :id, :completed, :game_id, :category_id

  belongs_to :game
end
