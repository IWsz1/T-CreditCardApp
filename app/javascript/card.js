const pay = () => {
  // 公開鍵の変数を受け取る
  const publicKey = gon.public_key
  // 公開鍵の設定 ライブラリを使用するためのインスタンスでもある
  const payjp = Payjp(publicKey)
  // カード情報入力欄のフォームをPayJpのAPIに作成してもらうための設定
  const elements = payjp.elements();
  // カード情報の入力に必要な3つのフォームを設定で作成したelementsインスタンスにcreateメソッドを用いて作成してもらう
  const numberElement = elements.create('cardNumber');
  const expiryElement = elements.create('cardExpiry');
  const cvcElement = elements.create('cardCvc');
  // 作成したフォームをHTMLの用意していた枠に当てはめていく
  numberElement.mount('#number-form');
  expiryElement.mount('#expiry-form');
  cvcElement.mount('#cvc-form');
  
  // フォームを変数に代入
  const form = document.getElementById('charge-form') 
  // 送信が押されたら
  form.addEventListener("submit", (e) => {
  // PayJpにカード情報が送り(response)で帰ってきたトークンの取得をする
  payjp.createToken (numberElement).then(function (response) {
      // レスポンスで帰ってきたトークン情報にエラーがなければelseの処理を行う
      if (response.error) {
      } else {
        const token = response.id;
        // console.log(token)
        // HTMLのフォームを変数に代入
        const renderDom = document.getElementById("charge-form")
        // サーバーサイドに送る用のinput要素にトークンを変換させる
        // valueにトークンのデータ name(railsで言うハッシュのKey)にtokenという名前をつける
        const tokenObj = `<input value=${token} name='token' >`
        // formの入力値にtokenを入力
        renderDom.insertAdjacentHTML("beforeend", tokenObj); 
      }
      // カード情報のトークン化前情報を削除
      numberElement.clear()
      expiryElement.clear()
      cvcElement.clear()
      // フォームの情報をサーバーサイドに送信
      document.getElementById("charge-form").submit()
    });
    // サーバーサイドへの処理を止める
    e.preventDefault();
  });
};

window.addEventListener("turbo:load",pay);