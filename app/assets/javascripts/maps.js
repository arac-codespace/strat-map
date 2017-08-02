/*global $*/
/*global d3*/
/*global google*/
/*global OverlappingMarkerSpiderfier*/

$(document).on('turbolinks:load', function () {
  if ($('.maps.index').length == 1) {
    console.log("It works on each visit!");
    google.maps.event.addDomListener(window, 'turbolinks:load', initMap);
    google.maps.event.addDomListener(window, 'turbolinks:load', fadingIn);
  } else {
    return false;
  }
});

function fadingIn() {
  $("#pac-input").fadeIn(5000);
}

function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 18.2208, lng: -66.5901 },
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
    styles: googleStyleList()
  }); //List end

  // SEARCH BAR 
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  // For overlapping markers...  
  var oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });

  // FEEDS json to marker function 
  $.getJSON("data.json").done(function (data) {

    for (var i = 0, dataLen = data.length; i < dataLen; i++) {
      // addMarkerCustom(data[i]);
      oms.addMarker(addMarkerCustom(data[i]));
    }
  });

  // Bind btns to markers...
  $(".flex-container-map").hide();

  $(".close-map").click(function () {
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
    title: place.name,
    icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });

  // Custom INFOWINDOW LISTENER
  var idName = "column_" + place.id;
  var idSelect = "#column_" + place.id;

  // spider_click will only open marker infowindows on spiderfied markers!
  marker.addListener('spider_click', function () {
    // Checks if any of the three side columns is occupied
    // Attachs the svg anchor to the unoccupied column
    for (var i = 0; i < 4; i++) {
      if ($(".flex-map-" + i).attr("id") == null && $(".flex-container-map").find(idSelect).length == 0) {
        $(".flex-map-" + i).attr("id", idName);
        $(".title-" + i).text(place.name);
        $(".flex-container-map").show();
        $(".flex-map-" + i).show();
        break;
      }
    }

    var checkExist = $(idSelect).find("*");
    // if the svg doesn't exist within the div with id idSelect...
    if (!checkExist.hasClass("stratChart")) {
      // drawchart(place, idSelect)
      var data_url = "strat_columns/" + place.id + "/data.json";
      d3.json(data_url, drawchart);
    }
  }); // listener end
  // This will return the marker which will feedit to OMS's addMarker function
  return marker;
} //addMarkerCustom end


function drawchart(data) {

  // append svg to column_id
  var stratColumnId = data[0].strat_column_id;

  var divId = "#column_" + stratColumnId;
  var stratId = "strat_" + stratColumnId;
  var stratIdSelect = "#" + stratId;

  d3.select(divId).append("svg").attr("class", "stratChart").attr("id", stratId);

  var thickness_h = d3.sum(data, function (d) {
    return parseFloat(d.thickness);
  });

  var margin = { top: 20, right: 80, bottom: 40, left: 20 },
      width = 200 - margin.left - margin.right,
      //960
  height = 35 * Math.sqrt(thickness_h) - margin.top - margin.bottom; //500

  // x-axis scale!
  var x = d3.scaleBand();

  // y-axis scale!    
  var y = d3.scaleLinear().range([height, 0]);

  var stratChart = d3.select(stratIdSelect).attr("width", '100%');

  // Sets the height for the svg/chart container.
  stratChart.attr('height', height + margin.top + margin.bottom);

  // For use inside the function.  This allows for the sum of successive thickness.
  var sumPrevThickness = 0;

  // Just sums the thickness of all the datasets in the JSON.
  var totalThickness = d3.sum(data, function (d) {
    return parseFloat(d.thickness);
  });

  // Sets upper domain to the max thickness.
  y.domain([0, totalThickness]);

  // Defines the previous function to store previous thickness value up next
  for (var i = 0; i < data.length; i++) {
    data[i].previous = data[i - 1];
  }

  // Bar data bind and transformation
  var bar = stratChart.selectAll("g").data(data).enter().append("g").attr("transform", function (d, i) {
    // Note that i refers to the number of objects!
    // Empty var to store previous thickness
    var prevThickness;
    // To avoid NaN error, make the var 0 when the index is greater than 0
    // ie.  No previous index exist before index 0/ first data array
    if (i > 0) {
      prevThickness = parseFloat(d.previous.thickness);
    } else {
      prevThickness = 0;
    }

    // Var defined outside of function allows for the addition of the 
    // prevThickness value due to how the function loop works.
    sumPrevThickness += prevThickness;
    var transSum = y(0) - y(sumPrevThickness);
    // This is the value that will translate-y the bars right to the top of
    // the bar located below.  IE: Stack bars.
    return "translate(0," + transSum + ")";
  });

  // Append bar for texture 

  var x2 = x.copy();
  x2.rangeRound([0, width]).domain(['Lithology']).padding(0).align(0.25);

  bar.append('rect').attr('class', 'bar').attr('fill', function (d) {
    if ($('.interbedded-carbonate').length >= 1) {
      $('.interbedded-carbonate').attr('fill', '#6caad5');
    }
    var lithologyClass = d.lithology.classification;

    // Pass class to lithologyColoring function will return
    // a color string
    return lithologyColoring(lithologyClass);
  }).attr('width', function (d) {
    return x2.bandwidth();
  }).attr('height', function (d) {
    return y(0) - y(parseFloat(d.thickness));
  });

  // LITHOLOGY Texture 
  bar.append('rect').attr('class', 'bar').attr('fill', function (d) {
    // Here I can just return the url stored in the lithology json object!
    var patternSelect = d.lithology.url;

    // To prevent the pattern scaling operation from being done more than once...
    if (!$(patternSelect + '> g').hasClass(patternSelect)) {
      var patternWidth = $(patternSelect).attr('width');
      var patternHeight = $(patternSelect).attr('height');

      $(patternSelect + '> g').addClass(patternSelect);
      $(patternSelect + '> g').attr('transform', 'scale(4)');
      $(patternSelect).attr('width', patternWidth * 4);
      $(patternSelect).attr('height', patternHeight * 4);
      $(patternSelect).attr('x', '15');
      $(patternSelect).attr('y', '20');
    }
    return 'url(' + patternSelect + ')';
  }).attr('width', function (d) {
    return x2.bandwidth();
  }).attr('height', function (d) {
    return y(0) - y(parseFloat(d.thickness));
  }).attr('x', function (d) {
    return x2('Lithology');
  });

  // CREATE unconformityPatterns container for dynamic pattern creation
  if ($('.unconformityPatterns').length == 0) {
    d3.select('body').append('svg').attr('class', 'unconformityPatterns').attr('width', 0).attr('height', 0).attr('display', 'absolute').append('defs');
  }

  // UNCONFORMITY COLOR

  // If user indicates an unconformity... 
  bar.append('rect').attr('class', 'unconformity-color').attr('fill', function (d, i) {
    var contact_type = d.contact.contact_type;

    if (contact_type === 'Depositional') {

      // GENERATE COLORS FOR UNCONFORMITY PATTERNS DYNAMICALLY
      var dynFill = 'transparent';

      // Prevents NaN from performing a previous operation on data index 0
      if (i > 0) {

        var lithologyClass = d.previous.lithology.classification;

        // Pass to coloring function and assign the fill to the dynFill var...
        dynFill = lithologyColoring(lithologyClass);
      }

      var patternPath = '<g transform="rotate(-180 125.319091796875,22.8419189453125)"><path fill = ' + dynFill + ' d="m35.65581,28.28433c5.93317,-4.22123 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73268,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73253,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73269,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73252,16.88482c11.86651,0 11.86651,-16.88482 23.73269,-16.88482c11.86635,0 17.79952,12.6636 23.73269,16.32332" stroke-width="2" stroke="black" fill-rule="evenodd" fill="transparent"/></g>';

      if ($('#unconformity-color' + i + '-id-' + d.id).length == 0) {
        d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-color' + i + '-id-' + d.id).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-18').attr('width', '50').attr('height', '9999').html(patternPath);
      }

      return 'url(#unconformity-color' + i + '-id-' + d.id + ')';
    } else {
      return 'transparent';
    }
  }).attr('width', width).attr('height', function (d) {
    return y(0) - y(parseFloat(d.thickness));
  }).attr('stroke', 'transparent');

  // UNCONFORMITIES Textures
  // If user indicates an unconformity... 
  bar.append('rect').attr('class', 'unconformity').attr('fill', function (d, i) {
    var contact_type = d.contact.contact_type;

    if (contact_type === 'Depositional') {

      // GENERATE UNCONFORMITY PATTERNS DYNAMICALLY

      var dynFill = 'transparent';

      // Prevents NaN by preventing .previous operation from occuring
      // at data index 0
      if (i > 0) {
        dynFill = 'url(' + d.previous.lithology.url + ')';
      }

      var patternPath = '<g transform="rotate(-180 125.319091796875,22.8419189453125)"><path fill = ' + dynFill + ' d="m35.65581,28.28433c5.93317,-4.22123 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73268,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73253,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73269,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73252,16.88482c11.86651,0 11.86651,-16.88482 23.73269,-16.88482c11.86635,0 17.79952,12.6636 23.73269,16.32332" stroke-width="2" stroke="black" fill-rule="evenodd" fill="transparent"/></g>';

      if ($('#unconformity-' + i + '-id-' + d.id).length == 0) {
        d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-' + i + '-id-' + d.id).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-18').attr('width', '50').attr('height', '9999').html(patternPath);
      }

      return 'url(#unconformity-' + i + '-id-' + d.id + ')';
    } else if (contact_type === 'Tectonic') {
      return 'url(#tectonic)';
    } else if (contact_type === 'Intrusion') {
      return 'url(#intrusion)';
    } else {
      return 'transparent';
    }
  }).attr('width', function (d) {
    return width;
  }).attr('height', function (d) {
    return y(0) - y(parseFloat(d.thickness));
  }).attr('stroke', 'transparent');

  // GEOLOGIC AGE
  var x3 = d3.scaleBand();
  x3.rangeRound([0, width / 2]).domain(['Age']).padding(0.5).align(0);

  // Append bar for age 
  bar.append('rect').attr('class', 'age').attr('fill', function (d) {
    return d.timescale.color;
  }).attr('width', function (d) {
    return x3.bandwidth();
  }).attr('height', function (d) {
    return y(0) - y(parseFloat(d.thickness));
  }).attr('x', function (d) {
    return x3('Age');
  });

  // x3-axis geologic age line and ticks
  d3.select(stratIdSelect).append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x3).tickSizeOuter([0])).selectAll('.tick text');

  // x2-axis lithology line and ticks
  d3.select(stratIdSelect).append('g').attr('class', 'axis axis--x').attr('transform', 'translate(0,' + height + ')').call(d3.axisBottom(x2)).selectAll('.tick text');

  // y-axis line and ticks
  d3.select(stratIdSelect).append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(10, "s")).append("text").attr("transform", "rotate(-90)").attr("y", -45).attr("x", '-15%').attr("dy", "0.71em").text("THICKNESS (m)");

  if ($('.tool').length != 0) {
    $('.tool').remove();
  }
  // Tooltip D3 settings
  var tooltip = d3.select("body").append("div").attr('class', 'tool').style("background-color", "white").style("border", "1px solid black").style("padding", "12px").style("border-radius", "8px").style("position", "absolute").style("z-index", "10").style("visibility", "hidden");

  // Tooltip action
  d3.selectAll('.bar, .bar-overlay, .unconformity').on("mouseover", function (d) {
    return tooltip.style("visibility", "visible").html("Lithology: " + d.name + "</br>" + "Formation: " + d.formation + "</br>" + "Geologic Age: " + d.timescale.interval_name + "</br>" + "Upper Contact: " + d.contact.name + "</br>" + "Thickness (m): " + d.thickness + "</br>" + "Lithology Pattern: " + d.lithology.name);
  }).on("mousemove", function () {
    return tooltip.style("top", event.pageY - 120 + "px").style("left", event.pageX + 20 + "px");
  }).on("mouseout", function () {
    return tooltip.style("visibility", "hidden");
  });
} // draw chart end


// This function returns the color of the bar
// according to the d.lithology.classification
function lithologyColoring(lithologyClass) {
  if (lithologyClass == 'Sandstone' || lithologyClass == 'Breccia' || lithologyClass == 'Conglomerate' || lithologyClass == 'Ironstone' || lithologyClass == 'Phosphatic') {
    return '#fbf7af';
  } else if (lithologyClass == 'Mudrock' || lithologyClass == 'Siliceous' || lithologyClass == 'Interbedded-mudrock') {
    return '#d2d3d3';
  } else if (lithologyClass == 'Carbonate' || lithologyClass == 'Evaporite') {
    return '#6caad5';
  } else if (lithologyClass == 'Igneous') {
    return '#f05a89';
  } else if (lithologyClass == 'Volcanic' || lithologyClass == 'Volcanoclastic') {
    return '#a1258e';
  } else if (lithologyClass == 'Metamorphic') {
    return '#4d25a1';
  } else if (lithologyClass == 'Other') {
    return '#ff6b6b';
  } else {
    return 'transparent';
  }
} //lithologyColoring end


function googleStyleList() {
  var styleList = [{
    "stylers": [{
      "hue": "#bbff00"
    }, {
      "weight": 0.5
    }, {
      "gamma": 0.5
    }]
  }, {
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "landscape.natural",
    "stylers": [{
      "color": "#a4cc48"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }, {
      "visibility": "on"
    }, {
      "weight": 1
    }]
  }, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [{
      "visibility": "simplified"
    }, {
      "gamma": 1.14
    }, {
      "saturation": -18
    }]
  }, {
    "featureType": "road.highway.controlled_access",
    "elementType": "labels",
    "stylers": [{
      "saturation": 30
    }, {
      "gamma": 0.76
    }]
  }, {
    "featureType": "road.local",
    "stylers": [{
      "visibility": "simplified"
    }, {
      "weight": 0.4
    }, {
      "lightness": -8
    }]
  }, {
    "featureType": "water",
    "stylers": [{
      "color": "#4aaecc"
    }]
  }, {
    "featureType": "landscape.man_made",
    "stylers": [{
      "color": "#718e32"
    }]
  }, {
    "featureType": "poi.business",
    "stylers": [{
      "saturation": 68
    }, {
      "lightness": -61
    }]
  }, {
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "weight": 2.7
    }, {
      "color": "#f4f9e8"
    }]
  }, {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [{
      "weight": 1.5
    }, {
      "color": "#e53013"
    }, {
      "saturation": -42
    }, {
      "lightness": 28
    }]
  }];

  return styleList;
}