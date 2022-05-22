//---------現在位置が取得成功時に実行する関数--------
let map;
function mapsInit(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;  
  map = new Microsoft.Maps.Map('#myMap', {
          center: new Microsoft.Maps.Location(lat, lon), 
          mapTypeId: Microsoft.Maps.MapTypeId.load, 
          zoom: 20
      });
  pushpin(lat,lon,map);
}

//-----現在地にピンを描画--------------
function pushpin(la,lo,now){
  let location = new Microsoft.Maps.Location(la,lo)
  let pin = new Microsoft.Maps.Pushpin(location, {
  color: 'red',            
  draggable:false,          
  enableClickedStyle:true, 
  enableHoverStyle:true,   
  visible:true             
  });
  now.entities.push(pin);
};

//---------現在位置が取得失敗時に実行する関数--------
function mapsError(error) {
let e = "";
if (error.code == 1) { 
  e = "位置情報が許可されてません";
}
if (error.code == 2) { 
  e = "現在位置を特定できません";
}
if (error.code == 3) { 
  e = "位置情報を取得する前にタイムアウトになりました";
}
alert("エラー：" + e);
};

//現在地取得と地図描画
function GetMap() {
navigator.geolocation.getCurrentPosition(mapsInit, mapsError);
}

//位置情報取得オプション
const set ={
  enableHighAccuracy: true, //より高精度な位置を求める
  maximumAge: 20000,        //最後の現在地情報取得が20秒以内であればその情報を再利用する設定
  timeout: 10000            //10秒以内に現在地情報を取得できなければ、処理を終了
};

function mapsInit(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;  
    map = new Microsoft.Maps.Map('#myMap', {
            center: new Microsoft.Maps.Location(lat, lon), 
            mapTypeId: Microsoft.Maps.MapTypeId.load, 
            zoom: 15 
        });
    pushpin(lat,lon,map);
  
  //Direction Module
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
          directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);
    directionsManager.setRenderOptions({itineraryContainer:'#directionsItinerary'});
          directionsManager.showInputPanel('directionsPanel');
      });
  //
  }

  //ルート記録スタート
let watchID;
let startWatch;
let key=0;

$("#start_btn").on('click',function(){
  localStorage.clear();
  let lat;
  let lon;
  watchID = navigator.geolocation.watchPosition(function(pos){
  lat = pos.coords.latitude;
  lon = pos.coords.longitude;
  },mapsError);
  startWatch=setinterval(function(){
    let value = lat+","+lon;
    localStorage.setItem(key,value);
    key++;
  },10000); //10秒おき
})

//ルート記録ストップ
$("#stop_btn").on('click',function(){
    clearInterval(startWatch);
    navigator.geolocation.clearWatch(watchID);
    let run_record="";
    for(i=0;i<(localStorage.length-1);i++){
        let data=localStorage.getItem(i);
        run_record += data+":"; 
    };
    run_record+=localStorage.getItem(key);
    key+=1;
    localStorage.setItem(key,run_record);
})


$("#write_btn").on('click',function(){
  //01:localStorageより座標データ束の取得--------------      
  let data1 = (localStorage.getItem(key)).split(":"); 
  data1.pop();
  let data2=[];

  //02:地図へルートを描画-----------------------
  directionsManager.calculateDirections();    
})
