class QuestionSerializerSerializer < ActiveModel::Serializer
  attributes :id, :question_text, :answer, :value, :category_id, :wiki_intro, :wiki_image

  has_one :category, serializer: CategorySerializer
end
