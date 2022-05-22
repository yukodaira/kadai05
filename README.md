# kadai05
乗換案内アプリ

## ①課題内容（どんな作品か）
- ルート検索アプリ
- geolocation APIとBingMap APIを使って地点の記録(開始/停止)を行い、地図上にルートを反映させる

## ②工夫した点・こだわった点
- Startを押下するとgeolocation APIのwatchPositionによる自身の位置座標をチェックする。
- その位置座標をsetIntervalで10秒おきに取得しlocalStorageに記録。Stopを押下することでwatchPositionとsetIntervalを終了させ、
  データロットとしてLocalStorage内に記録させるという点を工夫。したが、うまく地図に反映されない？

## ④その他（感想、シェアしたいことなんでも）
- 地図への反映が出来ず、、中途半端に。何点かエラー箇所も修正する必要有
- こちら、自分の会社で作っているアプリにも使える要素が盛りだくさんだったので、色々いじってみる。
  https://www.bing.com/api/maps/sdk/mapcontrol/isdk/Overview?toWww=1&redig=D070517A831C44F999D34DBF5ED1CCD1#HTML
