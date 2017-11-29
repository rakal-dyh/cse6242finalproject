//var station_selected = 31231; // Fixed value, but need modification for parameterization
//Textbox
//  function handleClick(event){
//      d3.select("g").remove(); //Remove previous chart
//      station_selected = 0;
//      dayofweek_selected = select_changed()
//      station_selected = document.getElementById("myVal").value;
//      lineChart(station_selected, dayofweek_selected)
//      console.log(document.getElementById("myVal").value)
//      return station_selected;
//            }

// Drop down list
//function select_changed() {
//  d3.select("g").remove(); //Remove previous chart
//  var e = document.getElementById("dayofweek");
//  //var dayofweek_selected = e.options[e.selectedIndex].value;  // value itself
//  var dayofweek_selected = e.selectedIndex + 1;
//  //console.log(e.selectedIndex);
//  lineChart(station_selected, dayofweek_selected);
//  return dayofweek_selected;
//}
var plotfilepath="./data/stationuse.tsv"
function lineChart(selectStation, selectDay) {
  var w=960;
  var h=600;
  d3.select("svg").select("g").remove();
  var svg = d3.select("svg"),
      margin = {top: 120, right: 20, bottom: 30, left: 50},
      width = w - margin.left - margin.right,
      height = h - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  timeslot = ["00:00","00:15","00:30","00:45","01:00","01:15","01:30","01:45","02:00","02:15","02:30","//02:45",
    "03:00","03:15","03:30","03:45","04:00","04:15","04:30","04:45","05:00","05:15","05:30","05:45",
    "06:00","06:15","06:30","06:45","07:00","07:15","07:30","07:45","08:00","08:15","08:30","08:45",
    "09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45",
    "12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45",
    "15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45",
    "18:00","18:15","18:30","18:45","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45",
    "21:00","21:15","21:30","21:45","22:00","22:15","22:30","22:45","23:00","23:15","23:30","23:45"];

  timeslot2 = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00",
    "11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];

  // Scaling
  var x = d3.scaleLinear()
      .rangeRound([0, width]);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  console.log(selectStation)

// Load data
d3.tsv(plotfilepath, function(d) {
//d3.tsv("2016Q2Fullcombineddata.tsv", function(d) {
  d.stationID = d.stationID;
  d.year = +d.year;
  d.month = +d.month;
  d.day = +d.day;
  d.week = +d.week;
  d.time = +d.time;
  d.temp = +d.temp;
  d.humidity = +d.humidity;
  d.condition = d.condition;
  d.numin = +d.numin;
  d.numout = +d.numout;
  d.numchange = +d.numchange;
  return d;
}, function(error, data) {
  if (error) throw error;
  summary = [];
  summary2 = [];
  // New dataset for mean value given station/time slot
  for (j=1; j<=96; j++) { // 00:00 - 11:45
    temp_sum1 = 0;
    temp_sum2 = 0;
    temp_sum3 = 0;
    n = 0;
    for (i=0; i<data.length; i++) {
      if (data[i]["time"]==j & data[i]["week"]==selectDay & data[i]["stationID"]==selectStation) {
      temp_sum1 = temp_sum1 + data[i]["numin"]
      temp_sum2 = temp_sum2 + data[i]["numout"]
      temp_sum3 = temp_sum3 + data[i]["numchange"]
      n = n + 1;
    }
      else  {temp_sum1 = temp_sum1 + 0
             temp_sum2 = temp_sum2 + 0
             temp_sum3 = temp_sum3 + 0}
    }
    summary.push({"slot":j, "slotChar":timeslot[j-1], "ave_numin":temp_sum1/n,
      "ave_numout":temp_sum2/n, "ave_numchange":temp_sum3/n});
  }
  //console.log(summary)
  //console.log(timeslot[1])

  var line1 = d3.line()
      .x(function(d) { return x(d.slot) })
      .y(function(d) { return y(d.ave_numin)});

  var line2 = d3.line()
      .x(function(d) { return x(d.slot) })
      .y(function(d) { return y(d.ave_numout)});

  var line3 = d3.line()
      .x(function(d) { return x(d.slot) })
      .y(function(d) { return y(d.ave_numchange)});

  x.domain(d3.extent(data, function(d) { return d.time; }));
  //y.domain(d3.extent(data, function(d) { return d.numin; }));
  y.domain([-10,10]); // Fixed y-domain

  var xScale = d3.scaleOrdinal();
  var xrange = [];

  // Put xtick values (time, e.g. "08:00")
  for (var k=1;k<=24; k++){
    xrange.push((k-1)*width/24)
    g.append("text")
      .attr("transform", "translate(" + xrange[k-1] + "," + (height+20) + ")")
      .attr("font-family","sans-serif")
      .style("font-size","10px")
      .attr("text-anchor", "middle")
      .text(timeslot2[k-1]);
  }

  //console.log(xrange)

  // x axis tickvalues (just numbers)
  //   g.append("g")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(d3.axisBottom(x))
  //     .select(".domain")
  //       //.remove();





  // Axes lables
  g.append("g")
      .call(d3.axisLeft(y))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .attr("font-family","sans-serif")
      .style("font-size","15px")
      .text("number of bikes");

  g.append("g")
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "translate(0," + height + ")")
      .attr("y", -20)
      .attr("x", width*0.95)
      .attr("text-anchor", "end")
      .attr("font-family","sans-serif")
      .style("font-size","15px")
      .text("Time of day");

  g.append("path")
      .data([summary])
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("d", line1)
      .on("mouseover", function(d) {
        d3.select(this).attr("stroke-width", 3);
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("stroke-width", 1);
      });

  g.append("path")
      .data([summary])
      .attr("fill", "none")
      .attr("stroke", "orange")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("d", line2)
      .on("mouseover", function(d) {
        d3.select(this).attr("stroke-width", 3);
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("stroke-width", 1);
      });

  g.append("path")
      .data([summary])
      .attr("fill", "none")
      .attr("stroke", "brown")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1)
      .attr("d", line3)
      .on("mouseover", function(d) {
        d3.select(this).attr("stroke-width", 3);
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("stroke-width", 1);
      });


  // Legend
  g.append("circle")
      .attr("r", 5)
      .attr("cx", 40)
      .attr("cy", 30)
      .attr("stroke","steelblue")
      .style("fill","steelblue");
  g.append("circle")
      .attr("r", 5)
      .attr("cx", 40)
      .attr("cy", 60)
      .attr("stroke","orange")
      .style("fill","orange");
  g.append("circle")
      .attr("r", 5)
      .attr("cx", 40)
      .attr("cy", 90)
      .attr("stroke","brown")
      .style("fill","brown");

  g.append("text")
      .attr("x", 50).attr("y", 35)
      .attr("font-family","sans-serif")
      .text("Number of in (drop-off)");
  g.append("text")
      .attr("x", 50).attr("y", 65)
      .attr("font-family","sans-serif")
      .text("Number of out (pick-up)");
  g.append("text")
      .attr("x", 50).attr("y", 95)
      .attr("font-family","sans-serif")
      .text("Number of change (in-out)");
  g.append("g")
      .append("text")
      .attr("x", width*0.95)
      .attr("y", 20)
      .style("font-size","20px")
      .attr("font-family","sans-serif")
      .style("font-weight","bold")
      .style("text-anchor", "end")
      .text("Station: "+selectStation)
    //g.append("g")
    //  .append("text")
    //  .attr("x", width * 0.95)
    //  .attr("y", 40)
    //  .style("font-size", "20px")
    //  .attr("font-family", "sans-serif")
    //  .style("font-weight", "bold")
    //  .style("text-anchor", "end")
    //  .text("Day of week: " + document.getElementById("dayofweek").value)

  });
};
//var station_selected = 31231;
//lineChart(station_selected,1);
