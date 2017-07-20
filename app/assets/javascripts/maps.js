$( document ).on('turbolinks:load', function() {
  if ($('.maps.index').length == 1)
  {
    var map;
    console.log("It works on each visit!")
    google.maps.event.addDomListener(window, 'turbolinks:load', initMap);
  }
  else
  {
    return false;
  }

  
})

function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 18.2208, lng: -66.5901},
      zoom: 9,
      mapTypeControl: true,        
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_RIGHT
      },
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      styles: [
        {
            "stylers": [
                {
                    "hue": "#bbff00"
                },
                {
                    "weight": 0.5
                },
                {
                    "gamma": 0.5
                }
            ]
        },
        {
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "stylers": [
                {
                    "color": "#a4cc48"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "visibility": "on"
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "gamma": 1.14
                },
                {
                    "saturation": -18
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels",
            "stylers": [
                {
                    "saturation": 30
                },
                {
                    "gamma": 0.76
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "weight": 0.4
                },
                {
                    "lightness": -8
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#4aaecc"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "stylers": [
                {
                    "color": "#718e32"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "saturation": 68
                },
                {
                    "lightness": -61
                }
            ]
        },
        {
            "featureType": "administrative.locality",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "weight": 2.7
                },
                {
                    "color": "#f4f9e8"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "weight": 1.5
                },
                {
                    "color": "#e53013"
                },
                {
                    "saturation": -42
                },
                {
                    "lightness": 28
                }
            ]
        }
    ]
       					
    });
    
  // For overlapping markers...  
  var oms = new OverlappingMarkerSpiderfier(map, { 
    markersWontMove: true, 
    markersWontHide: true,
    basicFormatEvents: true
  });  
    
  $.getJSON("data.json").done(function(data){
    
    for (var i=0, dataLen = data.length; i < dataLen; i++)
    {
      // addMarkerCustom(data[i]);
      oms.addMarker(addMarkerCustom(data[i]));
    }
  
  });
  
  // Bind btns to markers...
  $(".flex-container-map").hide();
    
    
    $(".close-map").click(function(){
      var closeData = $(this).attr("data-close");
      var dataToClose = $(".flex-container-map").find("[data-toclose='" + closeData + "']");
      
      dataToClose.hide();
      dataToClose.removeAttr("id");
      dataToClose.find(".stratChart").remove();
      dataToClose.find(".title").text("");
      
    });  
  
} // iniMap end


function addMarkerCustom(place) {
  
  var myLatLng = new google.maps.LatLng(place.lat, place.lng);
  
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: place.location
    });
  
  // Custom INFOWINDOW LISTENER
  var idName = "column_" + place.id
  var idSelect = "#column_" + place.id
  
  // spider_click will only open marker infowindows on spiderfied markers!
  marker.addListener('spider_click', function() {
    // Checks if any of the three side columns is occupied
    // Attachs the svg anchor to the unoccupied column
    for (var i = 0; i<3; i++)
    {
      if ($(".flex-map-" + i).attr("id") == null && $(".flex-container-map").find(idSelect).length == 0)
      {
        $(".flex-map-" + i).attr("id", idName);
        $(".title-"+i).text(place.name);
        $(".flex-container-map").show();
        $(".flex-map-"+i).show();
        break;
      }
    }
    
    var checkExist = $(idSelect).find("*")
    // if the svg doesn't exist within the div with id idSelect...
    if (!checkExist.hasClass("stratChart"))
    {      
      // drawchart(place, idSelect)
      var data_url = "strat_columns/" + place.id + "/data.json";
      stratdata = d3.json(data_url, drawchart);
    } 
  }); // listener end
  // This will return the marker which will feedit to OMS's addMarker function
  return marker;
} //addMarkerCustom end



function drawchart(data){

  // append svg to column_id
  var stratColumnId = data[0].strat_column_id;   
  
  var divId = "#column_" + stratColumnId;
  var stratId= "strat_" + stratColumnId;
  var stratIdSelect = "#" + stratId;
  
  d3.select(divId).append("svg").attr("class","stratChart").attr("id", stratId);
  
  var thickness_h = d3.sum(data,function(d){
	                  return parseFloat(d.thickness);
                  });
  
  var object_num = data.length;
  // alert(object_num);
  
  var margin = {top: 20, right: 80, bottom: 40, left: 20},
      width = 300 - margin.left - margin.right, //960
      height = 60*Math.sqrt(thickness_h) - margin.top - margin.bottom; //500

  // x-axis scale!
  var x = d3.scaleOrdinal().range([0, width]);
  
  // y-axis scale!    
  var y = d3.scaleLinear()
    .range([height, 0]);

  var stratChart = d3.select(stratIdSelect)
      .attr("width", width + margin.left + margin.right);
      
  // Sets the height for the svg/chart container.
  stratChart.attr('height', height + margin.top + margin.bottom);

  // For use inside the function.  This allows for the sum of successive thickness.
  var sumPrevThickness = 0;

  // Just sums the thickness of all the datasets in the JSON.
  var totalThickness = d3.sum(data, function(d) { return parseFloat(d.thickness)} );
  
  // Sets upper domain to the max thickness.
  y.domain([0, totalThickness]);

  // Defines the previous function to store previous thickness value up next
  for(var i = 0; i < data.length; i++) { data[i].previous = data[i-1]; }      
    
    
  // Bar data bind and transformation
  var bar = stratChart.selectAll("g")
    .data(data)
    .enter().append("g") 
    .attr("transform", function(d, i) { 
      // Note that i refers to the number of objects!
      // Empty var to store previous thickness
      var prevThickness;
      // To avoid NaN error, make the var 0 when the index is greater than 0
      // ie.  No previous index exist before index 0/ first data array
      if (i > 0) { prevThickness = parseFloat(d.previous.thickness)}
      else { prevThickness = 0};

      // Var defined outside of function allows for the addition of the 
      // prevThickness value due to how the function loop works.
      sumPrevThickness += prevThickness;
      var transSum = y(0) - y(sumPrevThickness);
      // This is the value that will translate-y the bars right to the top of
      // the bar located below.  IE: Stack bars.
      return "translate(0," + transSum + ")"; 
    });      
    // Append bar for color    
    bar.append("rect")
        .attr("class", "bar-overlay")
        .attr("fill", function(d) {
          var spelCol = d.timescale.color;

          if (d.lithology.url == "#sed659")
          {
            $(".inFill").css("fill",spelCol);
          }
          else
          {
            return d.timescale.color;
            
          }

        })
        .attr("width", width)
        .attr("height", function(d) { return  y(0) - y(parseFloat(d.thickness)) ; });    
    
    
  // Bar texture 
  bar.append("rect")
      .attr("class", "bar")
      .attr("fill",function(d){
        // Here I can just return the url stored in the lithology json object!
        return "url(" + d.lithology.url + ")";
      ;})
      .attr("width", width)
      .attr("height", function(d) { return  y(0) - y(parseFloat(d.thickness)) ; });

  // Append for unconformity
  bar.append("rect")
    .attr("class","unconformity")
    .attr("fill", function(d){
      var contact_type = d.contact.contact_type;
      if (contact_type == "Depositional")
      {
        return "url(#unconformity)";
      }
      else if (contact_type == "Tectonic")
      {
        return "url(#tectonic)";
      }
      else if (contact_type == "Intrusion")
      {
        return "url(#intrusion)";
      }
      else
      {
        return "None";
      }
    })
    .attr("width", width)
    .attr("height", function(d){
      return y(0) - y(parseFloat(d.thickness));
    })    


  // x-axis line and ticks
  d3.select(stratIdSelect).append('g').attr("class", "axis axis--x")
  .attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x)).selectAll(".tick text");

  // y-axis line and ticks
  d3.select(stratIdSelect).append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "s"))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -45)
      .attr("x", '-15%')
      .attr("dy", "0.71em")
      .text("THICKNESS (m)");      
  
  // Tooltip D3 settings
  var tooltip = d3.select("body")
  	.append("div")
  	.attr('class','tool')
  	.style("background-color","white")
  	.style("border", "1px solid black")
  	.style("padding", "12px")
    .style("border-radius", "8px")
  	.style("position", "absolute")
  	.style("z-index", "10")
  	.style("visibility", "hidden");

  // Tooltip action
  d3.selectAll('.bar, .bar-overlay, .unconformity')
  	.on("mouseover", function(d) { 
  	  return tooltip.style("visibility", "visible").html(
    	    "Lithology: " + d.name + "</br>" + "Formation: " +d.formation + "</br>" +
    	    "Geologic Age: " + d.timescale.interval_name + "</br>" +
    	    "Upper Contact: " + d.contact.name + "</br>" + "Thickness (m): " + d.thickness + "</br>" +
    	    "Lithology Pattern: " + d.lithology.name
    	    )
  	  ;})
  	.on("mousemove", function(){return tooltip.style("top", (event.pageY-170)+"px").style("left",(event.pageX+20)+"px");})
  	.on("mouseout", function(){return tooltip.style("visibility", "hidden");});      
} // draw chart end


