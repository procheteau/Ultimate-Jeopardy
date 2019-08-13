require "rails_helper"

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
end

RSpec.describe Api::V1::QuestionsController, type: :controller do

    describe "GET #show" do
    let!(:game) { FactoryBot.create(:game) }
    let!(:category) { FactoryBot.create(:category) }
    let!(:question) { FactoryBot.create(:question) }

    context "when user goes to question show page" do
      before {get :show, params: { id: 1, game_id: 1} }

      it "returns a specific question" do
        expect(JSON.parse(response.body).size).to eq(9)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:success)
      end
    end
  end
end
