/*global $*/
/*global d3*/
/*global google*/
/*global OverlappingMarkerSpiderfier*/

$(document).on('turbolinks:load', function () {
  
  if ($('.collections.show').length !== 1) {
    return;
  }


    // Make collection columns sortable!
    $(function() {
      return $('.collections-flex-container-map').sortable({
        axis: 'x',
        handle: '.handle',
        update: function() {
          return $.post($(this).data('update-url'), $(this).sortable('serialize'));
        }
      });
    }); 

    // Get data to feed draw function
    var url_id = $('.general-info').data('collectionid');
    var data_url = url_id + '/collections.json';
    
    initMapCollection(data_url);
    
    $.getJSON(data_url).done(function(data) {
      for (var i = 0; i < data.length; i++) {
        columnUrlParser(data[i]);
      }
    });    
    // Initialize map
  
    zoomColumn();

    // Hides Collection details and toggles glyphicon class
    $("button.hide-details").on("click", function() {
      $("div.right-column-collection").toggle();
      $("button.hide-details > i").toggleClass("glyphicon glyphicon-menu-right glyphicon glyphicon-menu-left");
      // Fixes gray areas when resizing map div
      google.maps.event.trigger(map, "resize");

    });    

  
}); // ready end

function initMapCollection(data_url) {
  
  var minZoomLevel;

  
  // Zoom level depending on device
  var useragent = navigator.userAgent;
  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    minZoomLevel = 4;
  } else {
    minZoomLevel = 3;
  }  
  
    map = new google.maps.Map(document.getElementById('collection_map'), {
    center: new google.maps.LatLng(0,0),
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
  
  // These functions are meant to occur after the map loads
  google.maps.event.addListener(map, 'idle', function() {
    fadingIn();
    
    // Prevents scrolling out of bounds
    google.maps.event.addListener(map, 'center_changed', function() {
      checkBounds(map);
    });    
  });    
  
  // Limit the zoom level
  // https://stackoverflow.com/questions/3818016/google-maps-v3-limit-viewable-area-and-zoom-level
  google.maps.event.addListener(map, 'zoom_changed', function() {
    if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
  });  
  
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
  var firstLatLng = false;
  
  $.getJSON(data_url).done(function (data) {
    for (var i = 0, dataLen = data.length; i < dataLen; i++) {
      // addMarkerCustom(data[i]);
      if (data[i].lat != null || data[i].lng != null)
      {
          
        if (firstLatLng == false)
        {
          var myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
          firstLatLng = true;
          map.setCenter(myLatLng);
          map.setZoom(7);
        }
        
        oms.addMarker(addMarkerCustom(data[i], map));
      }
    }
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

} // iniMap end

function addMarkerCustom(column, map) {

  var myLatLng = new google.maps.LatLng(column.lat, column.lng);

  var marker = new google.maps.Marker({
    position: myLatLng,
    title: column.name,
    icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });
        
  var infowindow;  
  
  marker.addListener('spider_click', function() {
    if (infowindow)
    {
      infowindow.close();
    }
      var contentString = '<div id="iw-container">' +
                        '<div class="iw-title">' +  '<h3>' + column.name + '<h3>' + '</div>' +
                        '<div class="iw-content">' +
                        '<h5> Location: ' + '<strong>' + column.location + '</strong>' +'</h5>' +
                        '<h5> Latitude: ' + '<strong>' + column.lat + ', </strong>' + 'Longitude: ' + '<strong>' + column.lng + '</strong>' +'</h5>' +
                        '<h5> Total thickness(m): ' + '<strong>' + column.total_thickness + '</strong>' +'</h5>' +
                        '<h5> Description: </h5>' + '<p>' + column.description +'</p>' +
                        '</div>' +
                        '</div>';   
        
        infowindow = new google.maps.InfoWindow({
          content: contentString
        });
      infowindow.open(map, marker);
  });
  
  // This will return the marker which will feedit to OMS's addMarker function
  return marker;
} //addMarkerCustom end  

function columnUrlParser(data) {
  var column_data_url = "/strat_columns/" + data.id + "/data.json";
  
  d3.json(column_data_url, drawCollectionChart);
}

function drawCollectionChart(data) {

  // append svg to column_id
  var stratColumnId = data[0].strat_column_id;

  var divId = ".column_" + stratColumnId;
  var stratId = "strat_" + stratColumnId;
  var stratIdSelect = "#" + stratId;

  d3.select(divId).append("svg").attr("class", "stratChart").attr("id", stratId);


  var totalThickness = d3.sum(data, function (d) {
    return parseFloat(d.thickness);
  });

  var margin = { top: 20, right: 80, bottom: 40, left: 20 },
      width = 225 - margin.left - margin.right

  var height = 1200 - margin.top - margin.bottom;

  // To scale according to min thickness
  var minThickness = $(".general-info").data("minthickness");
  var minMaxProportionality = minThickness/totalThickness;

  // Finds the pixel height of the minThickness layer.
  var currentProportionality = minMaxProportionality*height;

  // If the pixel height is less than C, calculate a new height
  // that would result in the minThickness having a height of
  // C
  if (currentProportionality < 32) {
    var dynHeight = 32/minMaxProportionality;

    height = dynHeight;
  }  
    
  // stratIdSelect is the id of the svg wherein the chart will be generated
  condensedColumnGenerator(data, height*0.8, width*0.8, stratIdSelect, margin);
  
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
    return d.lithology.name3 !== "" ? d.lithology.name + ' / ' + d.lithology.name2 + ' / ' + d.lithology.name3 : d.lithology.name2 !== '' ? d.lithology.name + ' / ' + d.lithology.name2 : d.lithology.name;
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
  var legendSelect = "#legendContainer_" + currentId;
  var legendContainer = d3.select(legendSelect).append('g').attr('class','legendContainer');
  
  condensedLegend(legendContainer, filteredData, ageFilteredData, width, lithologyFilteredData);    
  
  // This piece of code is to dynamically assign height to legend svg.
  // The +1 takes care of the extra space that divides age from lithology/features
  // And 35 is an arbitrary height.
  var legendCount = $(legendSelect + ' > .legendContainer > g').length;
  d3.select(legendSelect).attr('height', (legendCount+1) * 35).attr('width','100%');
  
  
  
}; // draw chart end
