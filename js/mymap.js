StationData = []
Origin2Station = []
closestIndex = []
closestStation = []
var uluru;
var m1;
var m2;
var m3;
d3.json('./data/station_information.json', function(d) {
  for (i = 0; i < d.data.stations.length; i++) {
    StationData[i] = {
      name: d.data.stations[i].name,
      id: d.data.stations[i].short_name,
      lat: d.data.stations[i].lat,
      lon: d.data.stations[i].lon
    }
    //Origin2Station[i]=distanceLatLon(38.8977/*will be from user input*/,-77.0365/*will be from user input*/,StationData[i].lat,StationData[i].lon)
    Origin2Station[i] = distanceLatLon(38.8977 /*will be from user input*/ , -77.0365 /*will be from user input*/ , StationData[i].lat, StationData[i].lon)
  }
  closestIndex = mySort(Origin2Station)
  for (i = 0; i < closestIndex.length; i++) {
    closestStation[i] = StationData[closestIndex[i]];
  }
  console.log(closestStation)
  console.log("aaa")
  //main();
  uluru = {
    lat: 38.8977,
    lng: -77.0365
  };
  m1 = {
    lat: closestStation[0].lat,
    lng: closestStation[0].lon
  };
  m2 = {
    lat: closestStation[1].lat,
    lng: closestStation[1].lon
  };
  m3 = {
    lat: closestStation[2].lat,
    lng: closestStation[2].lon
  };
});

function initMap() {
  console.log(uluru)
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
  var marker1 = new google.maps.Marker({
    position: m1,
    map: map
  });
  var marker2 = new google.maps.Marker({
    position: m2,
    map: map
  });
  var marker3 = new google.maps.Marker({
    position: m3,
    map: map
  });
}
