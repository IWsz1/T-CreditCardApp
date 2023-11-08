class OrdersController < ApplicationController
  def index
    @order = Order.new
  end
  def create
    @order = Order.create(order_params)
    if @order.valid?
      pay_item
      redirect_to root_path
    else
      # binding.pry # 正しい使い方: メソッド内で binding.pry を呼び出す
      render 'index',status: :unprocessable_entity
    end
  end
  private
  def order_params
    params.require(:order).permit(:price).merge(token:params[:token])
  end
  def pay_item
  # PayjpのGemが提供するPayjpクラスのapi_keyを言うインスタンスに秘密鍵を代入
  Payjp.api_key = ENV["PAYJP_SECRET_KEY"]
  # Payjp::Charge.createクラスメソッドにユーザーの情報を代入
  Payjp::Charge.create(
    # 金額
    amount:order_params[:price],
    # トークン
    card:order_params[:token],
    # 通貨
    currency:"jpy"
  )
  end
end
