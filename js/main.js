//--------------------------------- DATASETS ------------------------------------
const DATASET_ART = 'https://data.cityofnewyork.us/resource/43hw-uvdj.json';
const DATASET_BANK = 'https://data.ny.gov/resource/ndex-ad5r.json';
const DATASET_BEACH = 'https://data.cityofnewyork.us/resource/p9cw-7gsv.json';
const DATASET_BIKE = 'https://data.cityofnewyork.us/resource/dimy-qyej.json';
const DATASET_CRIME = 'https://data.cityofnewyork.us/resource/5uac-w243.json';
const DATASET_FIRE = 'https://data.cityofnewyork.us/resource/byk8-bdfw.json';
const DATASET_HOUSES = 'https://data.cityofnewyork.us/resource/ffxx-dfvk.json';
const DATASET_MUSEUM = 'https://data.cityofnewyork.us/resource/fn6f-htvy.json';
const DATASET_NEIGHBORHOOD = 'https://data.cityofnewyork.us/resource/xyye-rtrs.json';
const DATASET_POLICEPRE = 'https://data.cityofnewyork.us/resource/kmub-vria.json';
const DATASET_VACCINATION = 'https://data.cityofnewyork.us/resource/w9ei-idxz.json';

//--------------------------------- MARKERS & PATHS ----------------------------
var artMarkers = [];
var bankMarkers = [];
var beachPath = [];
var bikeMarkers = [];
var crimeMarkers = [];
var fireMarkers = [];
var houseMarkers = [];
var housePrice = [];
var museumMarkers = [];
var policeprePath = [];
var vaccinationMarkers = [];
var min, max;

//--------------------------------- ICONS --------------------------------------
var artIcon = 'https://i.imgur.com/GX5aWua.png';
var bankIcon = 'https://i.imgur.com/MXEoxhl.png';
var bikeIcon = 'https://i.imgur.com/5RXH6Xg.png';
var crimeIcon = 'https://i.imgur.com/okVe50a.png';
var fireIcon = 'https://i.imgur.com/OhIUqPN.png';
var libertyStatue = 'https://i.imgur.com/SuLaO1T.png';
var houseIcon = 'https://i.imgur.com/n17uorJ.png';
var museumIcon = 'https://i.imgur.com/vtU6YG1.png';
var vaccinationIcon = 'https://i.imgur.com/vBhyCRN.png';
var universityIcon = 'https://i.imgur.com/XXq4A7R.png';

//--------------------------------- OPEN WEATHER -------------------------------
function getWeather(){
  $.ajax({
     url:'http://api.openweathermap.org/data/2.5/weather?id=5128638&units=metric&appid=91cbed08c3101a5f0b8a29539b63a743',
     type: 'GET',
     dataType: 'json',
     success: function(data){
       document.getElementById("humidity").innerHTML = data.main.humidity;
       document.getElementById("pressure").innerHTML = data.main.pressure;
       document.getElementById("temp").innerHTML = data.main.temp;
       document.getElementById("windDeg").innerHTML = data.wind.deg;
       document.getElementById("wind").innerHTML = data.wind.speed;
     }
  });
};
//--------------------------------- ART ----------------------------------------
function getArt(){
  $.getJSON(DATASET_ART, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: artIcon
      });
      artMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.name + '<br/> Tel: ' + entry.tel + '<br/> URL: ' + entry.url
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setArt(type){
  for (var i = 0; i < artMarkers.length; i++) {
    artMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnArt").on('click', function(){
    if (!x){
      setArt(null)
      x = true;
    }
    else {
      setArt(map)
      x = false;
    }
  });
});
//--------------------------------- BANK ----------------------------------------
function getBank(){
  $.getJSON(DATASET_BANK, function(data, textstatus){
    $.each(data, function(i, entry){
      try{
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(parseFloat(entry.location_1.latitude),
                                           parseFloat(entry.location_1.longitude)),
          map: null,
          title: entry.name_of_institution,
          icon: bankIcon
        });
        bankMarkers.push(marker);
        var infowindow = new google.maps.InfoWindow({
          content: 'Name: ' +entry.name_of_institution+'<br>Street Address: '+entry.street_address
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
      }
      catch(err)
      {

      }
    });
  });
};
function setBank(type){
  for (var i = 0; i < bankMarkers.length; i++) {
    bankMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnBank").on('click', function(){
    if (!x){
      setBank(null)
      x = true;
    }
    else {
      setBank(map)
      x = false;
    }
  });
});
//--------------------------------- BEACH --------------------------------------
function getBeach(){
  $.getJSON(DATASET_BEACH, function(data, textstatus){
    $.each(data, function(i, entry){
      var path = [];
      var coor = entry.the_geom.coordinates[0][0];
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      var beachPol = new google.maps.Polygon({
        paths: path,
        strokeColor: '#8b9820',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#8b9820',
        fillOpacity: 0.35
      });
      beachPol.setMap(null);
      beachPath.push(beachPol);
    });
  });
};
function setBeach(type){
  for (var i = 0; i < beachPath.length; i++) {
    beachPath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnBeach").on('click', function(){
    if (!x){
      setBeach(null)
      x = true;
    }
    else {
      setBeach(map)
      x = false;
    }
  });
});
//--------------------------------- BICYCLE PARKING ----------------------------
function getBike(){
  $.getJSON(DATASET_BIKE, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: bikeIcon
      });
      bikeMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: 'Location: ' + entry.location
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setBike(type){
  for (var i = 0; i < bikeMarkers.length; i++) {
    bikeMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
  $("#btnBike").on('click', function(){
    if (!x){
      setBike(null);
      x = true;
    }
    else {
      setBike(map);
      x = false;
    }
  });
});
//--------------------------------- CRIME --------------------------------------
function getArt(){
  $.getJSON(DATASET_CRIME, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.cmplnt_num,
        icon: crimeIcon
      });
      crimeMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.ofns_desc + '<br/>Borough: ' + entry.boro_nm + '<br/>Date: ' + entry.rpt_dt.split('T')[0] + '<br>Hour: ' +entry.cmplnt_fr_tm
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setCrime(type){
  for (var i = 0; i < crimeMarkers.length; i++) {
    crimeMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnCrime").on('click', function(){
    if (!x){
      setCrime(null)
      x = true;
    }
    else {
      setCrime(map)
      x = false;
    }
  });
});
//--------------------------------- CYCLE PATHS --------------------------------
function setPathBike(type){
  bicycling.setMap(type);
}
$(document).ready(function() {
  var x = true;
  $("#btnPaths").on('click', function(){
    if (!x){
      setPathBike(null);
      x = true;
    }
    else {
      setPathBike(map);
      x = false;
    }
  });
});
//--------------------------------- FIRE DEPARMENTS ----------------------------
function getFire(){
  $.getJSON(DATASET_FIRE, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.nta,
        icon: fireIcon
      });
      fireMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.nta + '<br/>Address: ' + entry.facilityaddress+'<br/>Borough: ' + entry.borough
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setFire(type){
  for (var i = 0; i < fireMarkers.length; i++) {
    fireMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnFire").on('click', function(){
    if (!x){
      setFire(null)
      x = true;
    }
    else {
      setFire(map)
      x = false;
    }
  });
});
//--------------------------------- HOUSE --------------------------------------
function getHouse(){
  $.getJSON(DATASET_HOUSES, function(data, textstatus){
    $.each(data, function(i, entry){
      if(entry.avg_monthly_gross_rent != undefined){
        var add = entry.location_street_a.replace(/\s/,"+");
        $.ajax({
           url:'https://maps.googleapis.com/maps/api/geocode/json?address='+add+',NY&key=AIzaSyA-BwPXkomJr-XssDju3O_3Iatxl-6Am50',
           dataType: 'json'
        }).done(function(obj){
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(parseFloat(obj.results[0].geometry.location.lat),
                                             parseFloat(obj.results[0].geometry.location.lng)),
            map: null,
            title: obj.place_id,
            icon: houseIcon
          });
          houseMarkers.push(marker);
          housePrice.push(parseInt(entry.avg_monthly_gross_rent.replace(/","/,"").split('$')[1]));
          var infowindow = new google.maps.InfoWindow({
            content: entry.development + '<br/>Cost per month: ' + entry.avg_monthly_gross_rent
                    +'<br>Number of current apartments: '+ entry.number_of_current_apartments
                    +'<br>Number of rental rooms: '+ parseInt(entry.number_of_rental_rooms)
          });
          marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
        });
      }
    });
  });
};
function setHouse(type, min, max){
  var con = 0;
  for (var i = 0; i < houseMarkers.length; i++) {
    if(housePrice[i] >= parseInt(min)){
      if(housePrice[i] <= parseInt(max)){
        houseMarkers[i].setMap(type);
        con += 1;
      }
    }
  }
  if(con == 0){
    alert("Don't find places")
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnHouse").on('click', function(){
    if (!x){
      setHouse(null, min, max)
      x = true;
    }
    min = document.getElementById('min').value;
    max = document.getElementById('max').value;
    if(min != ''){
      if( max != ''){
        setHouse(map, min, max)
        x = false;
      }
      else{
        max = 1300;
        setHouse(map, min, max)
        x = false;
      }
    }
    else if(max != ''){
      min = 0;
      setHouse(map, min, max)
      x = false;
    }
    else{
      min = 0;
      max = 1300;
      setHouse(map, min, max)
      x = false;
    }
  });
});
//--------------------------------- MUSEUM -------------------------------------
function getMuseumData(){
  $.getJSON(DATASET_MUSEUM, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.the_geom.coordinates[1]),
                                         parseFloat(entry.the_geom.coordinates[0])),
        map: null,
        title: entry.name,
        icon: museumIcon
      });
      museumMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.name + '<br/> Tel: ' + entry.tel + '<br/> Page: ' + entry.url
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setMuseumData(type){
  for (var i = 0; i < museumMarkers.length; i++) {
    museumMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnMuseum").on('click', function(){
    if (!x){
      setMuseumData(null)
      x = true;
    }
    else {
      setMuseumData(map)
      x = false;
    }
  });
});
//--------------------------------- POLICE PRECINTS ----------------------------
function getPolicepre(){
  $.getJSON(DATASET_POLICEPRE, function(data, textstatus){
    $.each(data, function(i, entry){
      //console.log(entry.precinct);
      var path = [];
      var coor = entry.the_geom.coordinates[0][0];
      for (var i = 0; i < coor.length; i++) {
        var lati = parseFloat(coor[i][1]);
        var lngi = parseFloat(coor[i][0]);
        path.push({'lat': lati, 'lng': lngi});
      }
      var policePol = new google.maps.Polygon({
        paths: path,
        strokeColor: '#216291',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#216291',
        fillOpacity: 0.35
      });
      var dataPol = 'Police precinct number: ' + entry.precinct;
      policePol.setMap(null);
      policeprePath.push(policePol);
      policePol.addListener('click', showData);

      infoWindow = new google.maps.InfoWindow;

      function showData(event) {
        var vertices = this.getPath();

        infoWindow.setContent(dataPol);
        infoWindow.setPosition(event.latLng);

        infoWindow.open(map);
      }
      google.maps.event.addListener(policePol,"mouseover",function(){
       this.setOptions({fillColor: "#00FF00"});
      });
      google.maps.event.addListener(policePol,"mouseout",function(){
       this.setOptions({fillColor: "#216291"});
      });
    });
  });
};
function setPolicepre(type){
  for (var i = 0; i < policeprePath.length; i++) {
    policeprePath[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnPolicepre").on('click', function(){
    if (!x){
      setPolicepre(null)
      x = true;
    }
    else {
      setPolicepre(map)
      x = false;
    }
  });
});
//--------------------------------- VACCINATION --------------------------------
function getVac(){
  $.getJSON(DATASET_VACCINATION, function(data, textstatus){
    $.each(data, function(i, entry){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(entry.latitude),
                                         parseFloat(entry.longitude)),
        map: null,
        title: entry.facility_name,
        icon: vaccinationIcon
      });
      vaccinationMarkers.push(marker);
      var infowindow = new google.maps.InfoWindow({
        content: entry.facility_name + '<br>Address: ' +
                 entry.address +'<br>Type service: ' +
                 entry.service_type + '<br/> Phone: ' +
                 entry.phone
      });
      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    });
  });
};
function setVac(type){
  for (var i = 0; i < vaccinationMarkers.length; i++) {
    vaccinationMarkers[i].setMap(type);
  }
}
$(document).ready(function() {
  var x = true;
	$("#btnVac").on('click', function(){
    if (!x){
      setVac(null)
      x = true;
    }
    else {
      setVac(map)
      x = false;
    }
  });
});
//--------------------------------- Smooth Scrolling ---------------------------
$('a.toMove').click(function(){
  $('html, body').animate({
    scrollTop: $( $(this).attr('href')
    ).offset().top
  },1500)
  return false;
})
//--------------------------------- GoogleMaps ---------------------------------
var map;
var bycicling;
var uluru = {lat: 40.7291, lng: -73.9965};
var ls = {lat: 40.689209, lng: -74.044439};

function CenterControl(controlDiv, map) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '1px solid #fff';
  controlUI.style.borderRadius = '3px';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginTop = '5px';
  controlUI.style.marginBottom = '22px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to recenter the map';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = '#333';
  controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlText.style.fontSize = '16px';
  controlText.style.lineHeight = '38px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'Center Map';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    map.setCenter(uluru),
    map.setZoom(14)
  });
}

function initMap() {
  //Google Maps JS
	//Set Map
  var name = 'NYU Stern School of Business';
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  //Add Marker
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    text: name,
    icon: universityIcon
  });
  var markerLs = new google.maps.Marker({
    position: ls,
    map: map,
    text: 'Liberty Statue',
    icon: libertyStatue
  });
  //Info Window
  var infowindow = new google.maps.InfoWindow({
    content: name
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
  var infowindowls = new google.maps.InfoWindow({
    content: 'Statue of Liberty <br> Location: Liberty Island, Manhattan, New York City, New York, U.S.'
  });
  markerLs.addListener('click', function() {
    infowindowls.open(map, markerLs);
  });

  //Resize Function
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
  });

  //Function Buttons
  bicycling = new google.maps.BicyclingLayer();

  getArt();
  getBank();
  getBeach();
  getBike();
  getFire();
  getHouse();
  getMuseumData();
  getPolicepre();
  getVac();
  updateMaxTemp();
  getWeather();

  //Center
  var centerControlDiv = document.createElement('div');
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

}
//JQuery Effects ---------------------------------------------------------------
$(document).ready(function(){
    $("#mark").click(function(){
        $("#list").slideToggle("slow");
    });
    $("#markTem").click(function(){
        $("#tempContainer").slideToggle("slow");
    });
});

//d3js -------------------------------------------------------------------------
var maxTemp2017 = [];
var maxTemNOAA2017 = 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&datatypeid=tmax&locationid=CITY:US360019&stationid=GHCND:USW00094728&units=metric&startdate=2017-01-01&enddate=2017-11-01&limit=366'
var tokenNOAA ='tNspoqZwkFAFxbHkIcsfnNgEGSYqEhdh';

$.ajax({
  url: maxTemNOAA2017,
  headers:{
    'token': tokenNOAA
  },
  success: function(entry){
    for (var i = 0; i < entry.results.length; i++) {
      var date = entry.results[i].date.substring(0,10);
      var temp = entry.results[i].value;
      maxTemp2017.push([date, temp])
    }
  }
});

function updateMaxTemp(){
  var svg = d3.select("svg")
      margin = {top: 10, right: 10, bottom: 20, left: 25}
      width = $(window).width() - margin.right - margin.left
      height = 300 - margin.top - margin.bottom
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var parseTime = d3.timeParse("%Y-%m-%d");

  var x = d3.scaleTime()
            .rangeRound([0, width]);
  var y = d3.scaleLinear()
            .rangeRound([height, 0]);
  var area = d3.area()
               .x(function(d) { return x(d.date); })
               .y0(height)
               .y1(function(d) { return y(d.close); });
  var line = d3.line()
              .x(function(data) { return x(data.date); })
              .y(function(data) { return y(data.close); });

  var data = maxTemp2017.map(function(data){
    return{
      date: parseTime(data[0]),
      close: data[1]
    };
  });

  x.domain(d3.extent(data, function(d){ return d.date; }));
  y.domain(d3.extent(data, function(d){ return d.close; }));

  g.append("path")
       .data([data])
       .attr("class", "area")
       .attr("d", area);

  g.append("g")
   .attr("transform", "translate(0," + height+ ")")
   .call(d3.axisBottom(x));

  g.append("g")
   .call(d3.axisLeft(y))
   .append("text")
   .attr("fill", "#000")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy" , "0.7em")
   .text("New York Max Temperature 2017")

  g.append("path")
   .datum(data)
   .attr("fill", "none")
   .attr("stroke", "rgba(255, 84, 0, 0.76)")
   .attr("stroke-width", 2)
   .attr("d", line);
}

//WRITE TOOL(MY NOTEBOOK) ------------------------------------------------------
//Make the DIV element draggagle:
dragElement(document.getElementById(("mydiv")));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
$(document).ready(function(){
    $("#note").click(function(){
        $("#mydiv").toggle();
    });
});
