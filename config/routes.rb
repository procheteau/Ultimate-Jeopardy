Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :games, only: [:show] do
        resources :game_categories, only: [:index] do
          resources :categories, only: [:index]
        end
      end
    end
  end

  namespace :api do
    namespace :v1 do
      resources :games, only: [:show] do
        resources :game_categories, only: [:index] do
          resources :game_questions, only: [:index] do
            resources :questions, only: [:index]
          end
        end
      end
    end
  end


  resources :games, only: [:index, :show, :create, :new]
end
