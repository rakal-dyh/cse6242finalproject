function distanceLatLon(lat1,lon1,lat2,lon2){
	var lat1rad=Math.PI*lat1/180
	var lat2rad=Math.PI*lat2/180
	var lon1rad=Math.PI*lon1/180
	var lon2rad=Math.PI*lon2/180
	var theta=lon1rad-lon2rad
	var distance = 180/Math.PI*60*1.1515*Math.acos(Math.sin(lat1rad)*Math.sin(lat2rad)+Math.cos(lat1rad)*Math.cos(lat2rad)*Math.cos(theta))
	return distance
	}