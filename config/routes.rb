Rails.application.routes.draw do
  root to: 'products#index'
  resources :orders
  resources :products
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
