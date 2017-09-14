/*global $*/
/*global navigator*/
/*global d3*/
/*global google*/
/*global OverlappingMarkerSpiderfier*/


$(document).on('turbolinks:load', function () {
  if ($('.maps.index').length != 1) {
    return;
  }
  
  initMap();
}); // ready end
  
function initMap() {
    
  var minZoomLevel;
  var latResponse;
  var lngResponse;
  
  // Zoom level depending on device
  var useragent = navigator.userAgent;
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    minZoomLevel = 4;
    latResponse = 15.326572;
    lngResponse = -76.157227;
  } else {
    minZoomLevel = 3;
    latResponse = 24.023238;
    lngResponse = -42.645272;
  }
    
  var map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(latResponse,lngResponse),
    zoom: minZoomLevel,
    mapTypeControl: true,
    fullscreenControl: false,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    styles: googleStyleList()
  }); 
  
  // Limit the zoom level
  // https://stackoverflow.com/questions/3818016/google-maps-v3-limit-viewable-area-and-zoom-level
  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
  });
   
  // Try HTML5 geolocation if user allows it.
  // https://developers.google.com/maps/documentation/javascript/geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setZoom(5);
      map.setCenter(pos);
  })}
 
  // SEARCH BAR

  $(window).resize(function() {
      google.maps.event.trigger(map, 'resize');
  });
  google.maps.event.trigger(map, 'resize');
  
  google.maps.event.addListener(map, 'idle', function() {
    fadingIn();
  });
  
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
      oms.addMarker(addMarkerMapCustom(data[i]));
    }
  });

  // Bind btns to markers...
  $(".flex-container-map").hide();

  $(".close-sidebar-btn").click(function () {
    var closeData = $(this).attr("data-close");
    var dataToClose = $(".flex-container-map").find("[data-toclose='" + closeData + "']");

    dataToClose.hide();
    dataToClose.removeAttr("id");
    dataToClose.find(".modal-body >svg").remove();
    dataToClose.find(".stratChart").remove();
    dataToClose.find(".title").text("");
  });
  
  
  // WMS add map
  
  // https://github.com/beaugrantham/wmsmaptype
  var geoMapPR = new WmsMapType(
    "PuertoRico_Geology",
    "https://mrdata.usgs.gov/services/pr?",
    {layers: "geol,fault,faultn"},
    // {layers: "PuertoRico_Geology"},
    {opacity: 0.8});
  
  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV, the google map object and the WMS
  // object.
  
  var centerControlDiv = document.createElement('div');
  var centerControl = new addGeoMap(centerControlDiv, map, geoMapPR);  
  
  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);

  google.maps.event.addListener(map, 'center_changed', function() {
      checkBounds(map);
  });
  
} // iniMap end

// Restricts bound pan
//https://stackoverflow.com/questions/23580831/how-to-block-google-maps-api-v3-panning-in-the-gray-zone-over-north-pole-or-unde

function addMarkerMapCustom(place) {

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
        $(".title-" + i).html("<a target='_blank' href= '/strat_columns/" +  place.id + "'>" + place.name + "</a>");
        $(".flex-container-map").show();
        $(".flex-map-" + i).show();
        break;
      }
    }

    var checkExist = $(idSelect).find("*");
    // if the svg doesn't exist within the div with id idSelect...
    if (!checkExist.hasClass("stratChart")) {
      // drawMapColumn(place, idSelect)
      var data_url = "strat_columns/" + place.id + "/data.json";
      d3.json(data_url, drawMapColumn);
    }
  }); // listener end
  // This will return the marker which will feedit to OMS's addMarker function
  return marker;
} //addMarkerCustom end

function drawMapColumn(data) {

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
      width = 225 - margin.left - margin.right,
      //960
  height = 35 * Math.sqrt(thickness_h) - margin.top - margin.bottom  + data.length*100; //500
  if (height < 300) {
    height = 300  + data.length*100;
  } else if (height > 1500) {
    height = 1500 + data.length*100;
  }
  // stratIdSelect is the id of the svg wherein the chart will be generated
  condensedColumnGenerator(data, height, width, stratIdSelect, margin);
  
  // INCORPORATE LEGEND
  // Gets rid of duplicates by grouping... 
  var ageFilteredData = d3.nest()
    .key(function (d) {
      return d.timescale.interval_name;
    })
    .key(function (d) {
      return d.timescale.color;
    })
    .entries(data);


  var lithologyFilteredData = d3.nest().key(function (d) {
    return d.lithology.name;
  }).key(function (d) {
    return d.lithology.url;
  }).entries(data);
  
  var unconformityFilteredData = d3.nest().key( function (d) {
    return d.contact.contact_type;
  })
  // Here we filter out data that we don't want in the legend...
  .entries(data.filter(function(d) { return d.contact.contact_type != 'Conformity'; }));
  
  var filteredData =  ageFilteredData.concat(lithologyFilteredData);
  filteredData = filteredData.concat(unconformityFilteredData);

  var currentId = data[0].strat_column_id;
  var legendSelect = "legendContainer_" + currentId;
  // divId identifies the sidebar that the column will occupy
  var legendContainer = d3.select(divId).select(".modal-body").append('svg').attr('id',legendSelect).append('g').attr('class','legendContainer');
  
  // Attaching name to legend modal
  var columnName = d3.select(divId).select(".title").text();
  d3.select(divId).select(".modal-title").text(columnName + " Legend");
  
  condensedLegend(legendContainer, filteredData, ageFilteredData, width, lithologyFilteredData);    
  
  // This piece of code is to dynamically assign height to legend svg.
  // The +1 takes care of the extra space that divides age from lithology/features
  // And 35 is an arbitrary height.
  var legendCount = $('#' + legendSelect + ' > .legendContainer > g').length;
  d3.select('#' + legendSelect).attr('height', (legendCount+1) * 35).attr('width','100%');
  
  
  
  
} // draw chart end

// https://github.com/beaugrantham/wmsmaptype
function WmsMapType(name, url, params, options) {
	var TILE_SIZE = 256;
	var EARTH_RADIUS_IN_METERS = 6378137;
	var CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS_IN_METERS;
	
        this.name = name;
	this.url = url;
	this.tileSize = new google.maps.Size(TILE_SIZE, TILE_SIZE); // required by API

	this.tiles = [ ]; // maintain managed tiles
	
	/*
	 * Params representing key/value pairs included in the GetMap query.
	 * 
	 * Set default values and then override as needed.
	 */
	this.params = {
			// General
			service: 'WMS',
			version: '1.1.1',
			request: 'GetMap',
			
			// Image props
			transparent: true,
			format: 'image/png',
			width: this.tileSize.width,
			height: this.tileSize.height,
			
			// Spatial Reference System
			srs: 'EPSG:3857',
			
			// Style
			styles: '',
			
			// Layers
			layers: ''
	};

	for (var key in params) {
		this.params[key] = params[key];
	}
	
	/*
	 * Extra options.
	 * 
	 * Set default values and then override as needed.
	 */
	this.options = {
			opacity: 0.5,
			cache: false
	};
	
	for (var key in options) {
		this.options[key] = options[key];
	}

	/*
	 * Prototype getTile method.
	 */
	this.getTile = function(coord, zoom, ownerDocument) {
		if (!this.params['layers'].length) {
			console.log("[WmsMapType] Required param 'layers' is empty");
			return ownerDocument.createElement('div'); // empty div
		}
		var url = this.url + "?";
		
		for (var key in this.params) {
			url += key + "=" + this.params[key] + "&";
		}

		var bounds = getBounds(coord.x, coord.y, zoom);
		url += 'bbox=' + bounds.swX + "," + bounds.swY + "," + bounds.neX + "," + bounds.neY;	

		if (this.options['cache'] == false) {
			var date = new Date();
			url += "&cache=" + date.getTime();
		}
		
		var div = ownerDocument.createElement('div');
		div.innerHTML = '<img src="' + url + '"/>';
		div.style.width = this.tileSize.width + 'px';
		div.style.height = this.tileSize.height + 'px';
		div.style.opacity = this.options['opacity'];

		this.tiles.push(div);
		
		return div;
	};

	/*
	 * Add this MapType to a map at the given index, or on top of other layers
	 * if index is omitted.
	 */
	this.addToMap = function(map, index) {
		if (index !== undefined) {
			map.overlayMapTypes.insertAt(Math.min(index, map.overlayMapTypes.getLength()), this);
		}
		else {
			map.overlayMapTypes.push(this);
		}
	};
	
	/*
	 * Remove this MapType from a map.
	 */
	this.removeFromMap = function(map) {
		var overlayTypes = map.overlayMapTypes;
		
		for (var i = 0; i < overlayTypes.getLength(); i++) {
			var element = overlayTypes.getAt(i);
			
			if (element !== undefined && element === this) {
				overlayTypes.removeAt(i);
				break;
			}
		}

		this.tiles = [ ];
	};

	/*
	 * Change opacity on demand.
	 */
	this.setOpacity = function(opacity) {
		this.options['opacity'] = opacity;

		for (var i in this.tiles) {
			this.tiles[i].style.opacity = opacity;
		}
	};
	
	/*
	 * ---------------
	 * Private methods
	 * ---------------
	 */

	/*
	 * Return the tile bounds for the given x, y, z values.
	 */
	function getBounds(x, y, z) {
		y = Math.pow(2, z) - y - 1; // Translate Y value
		
		var resolution = (CIRCUMFERENCE / TILE_SIZE) / Math.pow(2, z); // meters per pixel
		
		var swPoint = getMercatorCoord(x, y, resolution);
		var nePoint = getMercatorCoord(x + 1, y + 1, resolution);
		
		var bounds = {
				swX : swPoint.x,
				swY : swPoint.y,
				neX : nePoint.x,
				neY : nePoint.y
		};
		
		return bounds;
	}

	/*
	 * Translate the xy & resolution to spherical mercator (EPSG:3857, EPSG:900913).
	 */
	function getMercatorCoord(x, y, resolution) {
		var point = {
				x: x * TILE_SIZE * resolution - CIRCUMFERENCE / 2.0,
				y: y * TILE_SIZE * resolution - CIRCUMFERENCE / 2.0
		};
		
		return point;
	}
}

// https://developers.google.com/maps/documentation/javascript/examples/control-custom
function addGeoMap(controlDiv, map, wms) {

  // Set CSS for the control border.
  var controlUI = document.createElement('div');
  controlUI.id = 'geo-map-btn';
  controlUI.style.borderRadius = '2px';
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginBottom = '22px';
  controlUI.style.marginRight = '10px';
  controlUI.style.marginTop = '30px';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Click to toggle geologic map overlay. - Experimental';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior.
  var controlText = document.createElement('div');
  controlText.style.color = 'rgb(25,25,25)';
  controlText.style.fontFamily = 'Tahoma, Roboto,Arial,sans-serif';
  controlText.style.fontSize = '11px';
  controlText.style.lineHeight = '28px';
  controlText.style.paddingLeft = '5px';
  controlText.style.paddingRight = '5px';
  controlText.innerHTML = 'PR Geologic Map';
  controlUI.appendChild(controlText);

  // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', function() {
    
    
    var overlayMapArray = map.overlayMapTypes.b;
    var wmsName = wms.name;
    var arrayCheck = false;
    
    for (var i=0; i < overlayMapArray.length; i++)
    {
      
      if (overlayMapArray[i].name == wmsName ){
        arrayCheck = true;
      }
      
    }
    
    if (arrayCheck == true){
      wms.removeFromMap(map);
    }
    else
    {
      wms.addToMap(map);
    }

  });
}
