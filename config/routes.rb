Rails.application.routes.draw do
  
  root to: 'pages#home'
  get 'data/stratdata', to: 'pages#stratdata'

end
