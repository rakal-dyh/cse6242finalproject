function saveUserInfo() {
  var msg = document.getElementById("msg");
  var f = document.user_info;
  var location = f.location.value
  var location2 = f.location2.value
  var stationid = f.stationid.value
  var month = f.month.value
  var day = f.day.value
  var time = f.time.value
  var number = f.number.value
  var url = "../cgi-bin/first_processor.py";


  if (location.length==0){
    location="Military Rd NW & Reno Rd NW, DC";
  }
  if (location2.length==0){
    location2="dc convention center";
  }
  if (stationid.length==0){
    stationid="31100"
  }

  location=location.replace('&',"!")
  location2=location2.replace('&',"!")

  var postStr = "location="+location+"&stationid="+stationid+
                "&location2="+location2+"&month="+month+
                "&day="+day+"&time="+time+"&number="+number;
  //var origin;
  //origin = {lat: 38.9610356, lng: -77.08008889999999};

  console.log(postStr)
  $(function() {
    $.ajax({
      type: 'POST',
      url: url,
      data: postStr,
      dataType: "text",
      success: function(data) {
        //alert(data);
        console.log("succeed");
        a = data;
        console.log(a)
        main(a);
      }
    });
  });
}

function main(a) {

  //console.log(a)
  var has=a.split('\t')
  latfloat1=parseFloat(has[0])
  lngfloat1=parseFloat(has[1])
  latfloat2=parseFloat(has[2])
  lngfloat2=parseFloat(has[3])
  stationuse=parseInt(has[4])

  //console.log("main succeed")38.9610356
  origin1 = {lat: latfloat1, lng: lngfloat1};
  destination1 = {lat: latfloat2, lng: lngfloat2};
  domap(origin1,destination1)
  lineChart(stationuse,1)




}
