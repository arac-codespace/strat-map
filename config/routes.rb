Rails.application.routes.draw do
  
  devise_for :users
  root to: 'pages#home'
  # get 'data/stratdata', to: 'data#stratdata'
  
  get '/data', to: 'data#all_data'
  get '/timescales', to: 'data#timescales_data'
  resources :strat_columns do
    get '/data', to: 'data#data'
    # resources :data, only: [:index]
  end
  
  resources :maps, only: [:index]

end
