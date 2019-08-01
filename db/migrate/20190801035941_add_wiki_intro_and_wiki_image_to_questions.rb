class AddWikiIntroAndWikiImageToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :wiki_intro, :string, null: false, default: ""
    add_column :questions, :wiki_image, :string, null: false, default: ""
  end
end
