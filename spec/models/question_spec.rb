require 'rails_helper'

describe Question do
  it { should have_valid(:question_text).when("Hey this is a question") }
  it { should_not have_valid(:question_text).when(nil) }

  it { should have_valid(:answer).when("Hey this is an answer") }
  it { should_not have_valid(:answer).when(nil) }

  it { should have_valid(:value).when(200) }

  it { should have_valid(:wiki_intro).when("Hey this is an awesome Wikipedia Intro") }
  it { should_not have_valid(:wiki_intro).when(nil) }

  it { should have_valid(:wiki_image).when("wikipedia.org/images/img.jpg") }
  it { should_not have_valid(:wiki_intro).when(nil) }
end
