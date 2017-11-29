/*
function saveUserInfo() {
  var msg = document.getElementById("msg");
  var f = document.user_info;
  var location = f.location.value;
  var location2 = f.location2.value;
  var stationid = f.stationid.value;
  var month = f.month.value
  var day = f.day.value
  var time = f.time.value
  var number = f.number.value
  var url = "../cgi-bin/first_processor.py";
  var postStr = "location=" + location+"&stationid="+stationid;
  console.log(closestStation)
  $(function() {
    $.ajax({
      type: 'POST',
      url: url,
      data: postStr,
      dataType: "text",
      success: function(data) {
        //alert(data);
        //console.log(data);
        a = data;
        main(a);
      }
    });
  });
}

function main(a) {

  console.log(a)
  lineChart(parseInt(a),1)


}
*/
