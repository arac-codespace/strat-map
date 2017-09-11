Rails.application.routes.draw do
  
  devise_for :users
  root to: 'pages#home'
  # get 'data/stratdata', to: 'data#stratdata'
  
  get '/data', to: 'data#all_data'
  get '/timescales', to: 'data#timescales_data'
  get '/lithologies', to: 'data#lithologies_data'
  resources :strat_columns do
    get '/data', to: 'data#data'
    # resources :data, only: [:index]
  end
  
  resources :maps, only: [:index]
  resources :layers
  resources :collections do
    get '/collections', to: 'data#collections_data'
  end
  
  post '/collection_sort', to: 'collections#sort'

end
