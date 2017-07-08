Rails.application.routes.draw do
  
  devise_for :users
  root to: 'pages#home'
  get 'data/stratdata', to: 'pages#stratdata'
  resources :strat_columns

end
