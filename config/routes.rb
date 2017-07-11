Rails.application.routes.draw do
  
  devise_for :users
  root to: 'pages#home'
  # get 'data/stratdata', to: 'data#stratdata'
  
  resources :strat_columns do
    get '/data', to: 'data#data'
    # resources :data, only: [:index]
  end

end
