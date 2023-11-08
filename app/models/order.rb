class Order < ApplicationRecord
  # トークンという値を取り扱えるようになる
  # カラムは増えてない
  attr_accessor:token
  validates :price,presence:true
  validates :token,presence:true
end