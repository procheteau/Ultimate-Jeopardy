Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :games, only: [:show, :update] do
        resources :questions, only: [:show]
      end
    end
  end

  resources :games, only: [:index, :show, :create, :new] do
    resources :questions, only: [:show]
  end
end
