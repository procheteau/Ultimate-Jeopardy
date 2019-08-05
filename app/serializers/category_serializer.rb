class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name,:clues_count,:user_id

end
