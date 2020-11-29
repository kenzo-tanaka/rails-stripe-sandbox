class Product < ApplicationRecord
  validates :name, :price, presence: true
  has_many :orders
end
