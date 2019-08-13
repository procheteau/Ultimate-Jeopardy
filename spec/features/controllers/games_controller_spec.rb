require "rails_helper"

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
end

RSpec.describe Api::V1::GamesController, type: :controller do

    describe "GET #show" do

    let!(:game) { FactoryBot.create(:game) }

    context "when user goes to game show page" do
      before {get :show, params: { id: 1} }

      it "returns a specific game" do
        expect(JSON.parse(response.body).size).to eq(1)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(:success)
      end
    end
  end
end
