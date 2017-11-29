
function domap(origin1,destination1){
	var StationData=[]
	var Origin2Station=[]
	var Destination2Station=[]
	var closestIndexO=[]
	var closestIndexD=[]
	var closestIndex=[]
	var closestStation=[]
	var Marker=[]
	var Waypoint=[]
	var StationAdds=[]
	var LabelLet=['A1','B1','C1','A2','B2','C2']
	var origin={lat:0,lng:0},destination={lat:0,lng:0}
	//origin = {lat: 38.97, lng: -77.08};
	//destination = {lat: 38.95, lng: -77.08};
	//origin = {lat: 38.9610356, lng: -77.08008889999999};
	origin = origin1;
	destination = destination1;
	d3.json('./data/station_information.json',function(d) {
		for( i = 0 ; i < d.data.stations.length ; i++ ){
			StationData[i]={name : d.data.stations[i].name,id : d.data.stations[i].short_name, lat : d.data.stations[i].lat, lon : d.data.stations[i].lon}
			Origin2Station[i]=distanceLatLon(origin.lat,origin.lng,StationData[i].lat,StationData[i].lon)
			Destination2Station[i]=distanceLatLon(destination.lat,destination.lng,StationData[i].lat,StationData[i].lon)
		}
		closestIndexO=mySort(Origin2Station)
		closestIndexD=mySort(Destination2Station)
		//console.log(closestIndexO)
		//console.log(closestIndexD)
		for( i = 0 ; i < closestIndexO.length ; i++ ){
			closestIndex.push(closestIndexO[i])
		}
		for( i = 0 ; i < closestIndexO.length ; i++ ){
			closestIndex.push(closestIndexD[i])
		}
		//console.log(closestIndex)
		for( i = 0 ; i < closestIndex.length ; i++ ){
			closestStation[i]=StationData[closestIndex[i]];
		}
		console.log(closestStation)

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: (origin.lat+destination.lat)/2, lng: (origin.lng+destination.lng)/2}
    });
	var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
	var geocoder = new google.maps.Geocoder;
	for(i=0; i<closestStation.lenght; i++){
		geocodeLatLng(geocoder, map, {lat: closestStation[i].lat, lng: closestStation[i].lon})
		console.log(i)
	}
	console.log('for')
	var markerO = new google.maps.Marker({
      position: origin,
	  label: 'Origin',
        map: map
    });
	var markerD = new google.maps.Marker({
      position: destination,
	  label: 'Dest',
          map: map
    });
	for (i=0;i<closestStation.length;i++){
		Marker[i]=new google.maps.Marker({
			position: {lat: closestStation[i].lat, lng: closestStation[i].lon},
			label: LabelLet[i],
			map: map
			});
	}
      function calculateAndDisplayRoute(directionsService, directionsDisplay,Waypoints) {
        directionsService.route({
          origin: origin,
          destination: destination,
		  waypoints: Waypoints,
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });}


		calculateAndDisplayRoute(directionsService,directionsDisplay)
		Marker[0].addListener('click',function(){
			Waypoint[0]={location: closestStation[0].name};
			calculateAndDisplayRoute(directionsService,directionsDisplay,Waypoint);})
		Marker[1].addListener('click',function(){
			Waypoint[0]={location: closestStation[1].name};
			calculateAndDisplayRoute(directionsService,directionsDisplay,Waypoint)})
		Marker[2].addListener('click',function(){
			Waypoint[0]={location: closestStation[2].name};
			calculateAndDisplayRoute(directionsService,directionsDisplay,Waypoint)})
		Marker[3].addListener('click',function(){
			if (Waypoint[0]==null){
			Waypoint[0]={location: closestStation[0].name};
			}
			else {
				Waypoint[1]={location: closestStation[3].name};
			}
			calculateAndDisplayRoute(directionsService,directionsDisplay,Waypoint)})
		Marker[4].addListener('click',function(){
			if (Waypoint[0]==null){
				Waypoint[0]={location: closestStation[0].name};
			}
			else {
				Waypoint[1]={location: closestStation[4].name};
			}
			calculateAndDisplayRoute(directionsService,directionsDisplay,Waypoint)})
		Marker[5].addListener('click',function(){
			if (Waypoint[0]==null){
				Waypoint[0]={location: closestStation[0].name};
			}
				Waypoint[1]={location: closestStation[5].name};
			calculateAndDisplayRoute(directionsService,directionsDisplay,Waypoint)})
	});

	function geocodeLatLng(geocoder, map, latLon) {
        geocoder.geocode({'location': latLon}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
			StationAdds.push(results[0].formatted_address)
			console.log(StationAdds)
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }
}
