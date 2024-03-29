class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :amount, null: false
      t.references :product, null: false, foreign_key: true

      t.timestamps
    end
  end
end
