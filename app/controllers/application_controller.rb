class ApplicationController < ActionController::Base
  # jsに公開鍵を直接変数で送る
  # ビューでの記述も必要
  before_action :public_item
  private
  def public_item
    gon.public_key = ENV["PAYJP_PUBLIC_KEY"]
  end
end
