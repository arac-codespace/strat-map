/* global $ */
/* global navigator */
/* global d3 */
/* global google */
/* global OverlappingMarkerSpiderfier */
/* global googleStyleList */
/* global fadingIn */
/* global checkBounds */
/* global condensedColumnGenerator */
/* global condensedLegend */
/* global WmsMapType */
/* global addGeoMap */


$(document).on('turbolinks:load', function() {
  if (!$('.maps.index').length) {
    return;
  }

  initMap();
}); // ready end

function initMap() {

  let minZoomLevel;
  let latResponse;
  let lngResponse;

  let zoomCenterMobile = {
    minZoomLevel: 4,
    latResponse: 15.326572,
    lngResponse: -76.157227
  };

  let zoomCenterDesktop = {
    minZoomLevel: 3,
    latResponse: 24.023238,
    lngResponse: -42.645272
  };

  // Zoom level depending on device
  var useragent = navigator.userAgent;
  // If string is not found it returns -1
  let notFound = -1;
  if (
    useragent.indexOf('iPhone') != notFound ||
    useragent.indexOf('Android') != notFound ) {
    minZoomLevel =zoomCenterMobile.minZoomLevel;
    latResponse = zoomCenterMobile.latResponse;
    lngResponse = zoomCenterMobile.lngResponse;
  } else {
    minZoomLevel = zoomCenterDesktop.minZoomLevel;
    latResponse =  zoomCenterDesktop.latResponse;
    lngResponse =  zoomCenterDesktop.lngResponse;
  }

  let map = new google.maps.Map(document.getElementById('map'), {
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
  // stackoverflow.com/questions/3818016/google-maps-v3-limit-viewable-area-and-zoom-level
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
      var zoomMagnigication = 5;
      map.setZoom(zoomMagnigication);
      map.setCenter(pos);
    });
  }

  // SEARCH BAR

  $(window).resize(function() {
      google.maps.event.trigger(map, 'resize');
  });
  google.maps.event.trigger(map, 'resize');
  google.maps.event.addListener(map, 'idle', function() {
    fadingIn();
    // Prevents scrolling out of bounds
    google.maps.event.addListener(map, 'center_changed', function() {
      checkBounds(map);
    });
  });

  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (!places.length) {
      return;
    }

    let bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log('Returned place contains no geometry');
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
  let oms = new OverlappingMarkerSpiderfier(map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });

  // FEEDS json to marker function
  $.getJSON('data.json').done(function(data) {

    for (let i = 0, dataLen = data.length; i < dataLen; i++) {
      // addMarkerCustom(data[i]);
      oms.addMarker(addMarkerMapCustom(data[i]));
    }
  });

  // WMS add map

  // https://github.com/beaugrantham/wmsmaptype
  let geoMapPR = new WmsMapType(
    'PuertoRico_Geology',
    'https://mrdata.usgs.gov/services/pr?',
    {layers: 'geol,fault,faultn'},
    // {layers: "PuertoRico_Geology"},
    {opacity: 0.8});

  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV, the google map object and the WMS
  // object.

  let centerControlDiv = document.createElement('div');
  addGeoMap(centerControlDiv, map, geoMapPR);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);

  google.maps.event.addListener(map, 'center_changed', function() {
      checkBounds(map);
  });
} // iniMap end

// Restricts bound pan
// https://stackoverflow.com/questions/23580831/how-to-block-google-maps-api-v3-panning-in-the-gray-zone-over-north-pole-or-unde

// Note that place is a singular column's data!
function addMarkerMapCustom(place) {

  var myLatLng = new google.maps.LatLng(place.lat, place.lng);

  var marker = new google.maps.Marker({
    position: myLatLng,
    title: place.name,
    icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });

  // Custom INFOWINDOW LISTENER
  var idName = `column_${place.id}`;
  var idSelect = `#column_${place.id}`;

  // spider_click will only open marker infowindows on spiderfied markers!
  marker.addListener('spider_click', function() {
    // Checks if any of the three side columns is occupied
    // Attachs the svg anchor to the unoccupied column


  var columnHtml =
    `<div class="flex-child" id=${idName} data-toClose="close-${idName}">
      <div class="chart-header-group text-center">
        <h4 class="title title-${idName}">
          <a target="_blank" href= "/strat_columns/${place.id}">${place.name}</a>
        </h4>
        <span class="close-sidebar-btn" title="Close" data-close= "close-${idName}">
          <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
        </span>
        <span class="legend-btn" data-toggle="modal" data-target="#modalLegend_${idName}">
          <span class="glyphicon glyphicon-list-alt column_legend_${idName}" title="Legend"></span>
        </span>        
        <div class="modal fade modal-legend" id="modalLegend_${idName}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title legend-title" id="myModalLabel"></h4>
              </div>
              <div class="modal-body"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div> `;


    // If id doesn't exist, generate html and run drawMapColumn
    let maxWindowNum = 9;
    if (!$(idSelect).length && ($('.flex-child').length < maxWindowNum)) {
      $('.flex-container-map').append(columnHtml);
      let data_url = `strat_columns/${place.id}/data.json`;
      d3.json(data_url, drawMapColumn);
    }

    // Bind btns to markers...
    // Btw, the reason this is here is bc the handler must
    // run at least once after the column's html is generated.
    // Additionally, I bind the handler to the specific btn of
    // the column to prevent applying the handler multiple
    // times to the same close btn.


    $(idSelect).find('.close-sidebar-btn').click(function() {
      var closeData = $(this).attr('data-close');
      var dataToClose = $('.flex-container-map')
      .find(`[data-toclose = ${closeData}]`);

      dataToClose.remove();
    });

  });
  // This will return the marker which will feedit to OMS's addMarker function
  return marker;
}

function drawMapColumn(data) {

  // append svg to column_id
  let firstIndex = 0;
  var stratColumnId = data[firstIndex].strat_column_id;

  var divId = `#column_${stratColumnId}`;
  var stratId = `strat_${stratColumnId}`;
  var stratIdSelect = `#${stratId}`;

  d3.select(divId).append('svg')
  .attr('class', 'stratChart condensedChart').attr('id', stratId);

  let totalThickness = d3.sum(data, function(d) {
    return parseFloat(d.thickness);
  });

  let margin = { top: 20, right: 80, bottom: 40, left: 20 },
      width = 225 - margin.left - margin.right;

  let height = 1200 - margin.top - margin.bottom;

  height = 35 * Math.sqrt(totalThickness) - margin.top - margin.bottom  + data.length*100; // 500
  if (height < 300) {
    height = 300  + data.length*100;
  } else if (height > 1500) {
    height = 1500 + data.length*100;
  }

  // stratIdSelect is the id of the svg wherein the chart will be generated
  // The multiplication is just scaling things down for Map View.
  condensedColumnGenerator(data, height, width, stratIdSelect, margin, false);

  // INCORPORATE LEGEND
  // Gets rid of duplicates by grouping...
  let ageFilteredData = d3.nest()
    .key(function(d) {
      return d.timescale.interval_name;
    })
    .key(function(d) {
      return d.timescale.color;
    })
    .entries(data);


  let lithologyFilteredData = d3.nest().key(function(d) {
    let lithNameAssembler;
    if (d.lithology.name3 !== '') {
      lithNameAssembler =
      `${d.lithology.name} / ${d.lithology.name2} / ${d.lithology.name3}`;
    } else if (d.lithology.name2 !== '') {
      lithNameAssembler = `${d.lithology.name} / ${d.lithology.name2}`;
    } else {
      lithNameAssembler = `${d.lithology.name}`;
    }

    return lithNameAssembler;
  }).key(function(d) {
    return d.lithology.url;
  }).entries(data);

  let unconformityFilteredData = d3.nest().key( function(d) {
    return d.contact.contact_type;
  })
  // Here we filter out data that we don't want in the legend...
  .entries(data.filter(function(d) {
    return d.contact.contact_type != 'Conformity';
  }));

  let filteredData =  ageFilteredData.concat(lithologyFilteredData);
  filteredData = filteredData.concat(unconformityFilteredData);

  let legendSelect = `legendContainer_${stratColumnId}`;
  // divId identifies the sidebar that the column will occupy
  let legendContainer = d3.select(divId).select('.modal-body')
  .append('svg').attr('id',legendSelect).append('g')
  .attr('class','legendContainer');

  // Attaching name to legend modal
  let columnName = d3.select(divId).select('.title').text();
  d3.select(divId).select('.modal-title').text(`${columnName} Legend`);

  condensedLegend(legendContainer, filteredData, ageFilteredData, width, lithologyFilteredData);

  // This piece of code is to dynamically assign height to legend svg.
  // The +1 takes care of the extra space that divides age from
  // lithology/features and 35 is an arbitrary height.
  // `#${legendSelect} > .legendContainer > g`
  let legendCount = $(`#${legendSelect} > .legendContainer > g`).length;

  d3.select('#' + legendSelect)
  .attr('height', (legendCount+1) * 35)
  .attr('width','100%');
} // draw chart end
