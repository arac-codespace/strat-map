/* global $ */
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
/* global zoomColumn */

$(document).on('turbolinks:load', function() {

  if (!$('.collections.show').length) {
    return;
  }

  // Get data to feed draw function
  let url_id = $('.general-info').data('collectionid');
  let data_url = url_id + '/collections.json';

  initMapCollection(data_url);

  $.getJSON(data_url).done(function(data) {
    for (let i = 0; i < data.length; i++) {
      columnUrlParser(data[i]);
    }
  });

  showFossilHandler();
  sortColumns();
  zoomColumn();
  hideCollectionDetails();
}); // ready end

function initMapCollection(data_url) {
  let minZoomLevel;

  let zoomCenterMobile = {
    minZoomLevel: 4,
    // Caribbean centralization
    latResponse: 15.326572,
    lngResponse: -76.157227
  };

  let zoomCenterDesktop = {
    minZoomLevel: 3,
    // Caribbean centralization
    latResponse: 24.023238,
    lngResponse: -42.645272
  };

  // Zoom level depending on device
  let useragent = navigator.userAgent;
  // If string is not found it returns -1
  let notFound = -1;
  if (
    useragent.indexOf('iPhone') != notFound ||
    useragent.indexOf('Android') != notFound ) {
    minZoomLevel = zoomCenterMobile.minZoomLevel;
  } else {
    minZoomLevel = zoomCenterDesktop.minZoomLevel;
  }

  let centerLatLng = {
    lat: 0,
    lng: 0
  };

  window.map = new google.maps.Map(document.getElementById('collection_map'), {
    center: new google.maps.LatLng(centerLatLng.lat,centerLatLng.lng),
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
  google.maps.event.addListener(window.map, 'idle', function() {
    fadingIn();

    // Prevents scrolling out of bounds
    google.maps.event.addListener(window.map, 'center_changed', function() {
      checkBounds(window.map);
    });
  });

  // Limit the zoom level
  // https://stackoverflow.com/questions/3818016/google-maps-v3-limit-viewable-area-and-zoom-level
  google.maps.event.addListener(window.map, 'zoom_changed', function() {
    if (window.map.getZoom() < minZoomLevel) window.map.setZoom(minZoomLevel);
  });

  // SEARCH BAR
  let input = document.getElementById('pac-input');
  let searchBox = new google.maps.places.SearchBox(input);
  window.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

  window.map.addListener('bounds_changed', function() {
    searchBox.setBounds(window.map.getBounds());
  });

  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
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
    window.map.fitBounds(bounds);
  });

  // For overlapping markers...
  let oms = new OverlappingMarkerSpiderfier(window.map, {
    markersWontMove: true,
    markersWontHide: true,
    basicFormatEvents: true
  });

  // FEEDS json to marker function
  let firstLatLng = false;

  $.getJSON(data_url).done(function(data) {
    for (let i = 0, dataLen = data.length; i < dataLen; i++) {
      // addMarkerCustom(data[i]);
      if (data[i].lat != null || data[i].lng != null) {
        if (firstLatLng == false) {
          let myLatLng = new google.maps.LatLng(data[i].lat, data[i].lng);
          firstLatLng = true;
          window.map.setCenter(myLatLng);
          window.map.setZoom(7);
        }
        oms.addMarker(addMarkerCustom(data[i], window.map));
      }
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
  addGeoMap(centerControlDiv, window.map, geoMapPR);

  centerControlDiv.index = 1;
  window.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(centerControlDiv);

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
    if (infowindow) {
      infowindow.close();
    }
    let contentString =
      `<div id="iw-container">
          <div class="iw-title"><h3>${column.name}<h3></div>
            <div class="iw-content">
              <h5> Location:<strong> ${column.location}</strong></h5>
              <h5> Latitude:<strong> ${column.lat},</strong> Longitude:<strong> ${column.lng}</strong></h5>
              <h5> Total thickness(m):<strong> ${column.total_thickness}</strong></h5>
              <h5> Description: </h5><p>${column.description}</p>
          </div>
        </div>`;

        infowindow = new google.maps.InfoWindow({
          content: contentString
        });
      infowindow.open(map, marker);
  });

  // This will return the marker which will feedit to OMS's addMarker function
  return marker;
}

function columnUrlParser(data) {
  var column_data_url = `/strat_columns/${data.id}/data.json`;

  d3.json(column_data_url, drawCollectionChart);
}

function drawCollectionChart(data) {

  // append svg to column_id
  var firstIndex = 0;
  var stratColumnId = data[firstIndex].strat_column_id;

  var divId = `.column_${stratColumnId}`;
  var stratId = `strat_${stratColumnId}`;
  var stratIdSelect = `#${stratId}`;

  d3.select(divId).append('svg')
  .attr('class', 'stratChart condensedChart')
  .attr('id', stratId);


  let totalThickness = d3.sum(data, function(d) {
    return parseFloat(d.thickness);
  });

  let margin = { top: 20, right: 80, bottom: 40, left: 20 },
      width = 225 - margin.left - margin.right;

  // To scale according to min thickness and max height if necessary...
  let minThickness = $('.general-info').data('minthickness');
  let maxTotalThickness = $('.general-info').data('maxtotalthickness');
  // Using 32px for minLayerHeight due to fossil thumbnail size
  let minLayerHeight = 32;
  // Arbitrary min height
  let minColumnHeight = 1000;

  // minThickness:totalThickness = minLayerHeight:Height
  let minMaxProportionality = minThickness/totalThickness;
  let height = (minLayerHeight/minMaxProportionality);

  // Calculates in advance the max height if the current proportion
  // is maintained
  let maxHeight = minLayerHeight/(minThickness/maxTotalThickness);

  // If maxHeight < desiredHeight, look for the scaling factor and
  // use that scale maxHeight to desiredHeight and to maintain the
  // scaling across columns
  if (maxHeight < minColumnHeight) {
    let scalingFactor = minColumnHeight/maxHeight;
    height*=scalingFactor;
  }

  // stratIdSelect is the id of the svg wherein the chart will be generated
  condensedColumnGenerator(data, height, width, stratIdSelect, margin, true);

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

  let legendSelect = `#legendContainer_${stratColumnId}`;
  let legendContainer = d3.select(legendSelect)
  .append('g').attr('class','legendContainer');

  condensedLegend(legendContainer, filteredData, ageFilteredData, width, lithologyFilteredData);

  // This piece of code is to dynamically assign height to legend svg.
  // The +1 takes care of the extra space that divides age from
  // lithology/features and 35 is an arbitrary height.
  // `#${legendSelect} > .legendContainer > g`

  let legendCount = $(legendSelect + ' > .legendContainer > g').length;
  d3.select(legendSelect)
  .attr('height', (legendCount+1) * 35)
  .attr('width','100%');
} // draw chart end

// showFossil btn event handler
function showFossilHandler() {
  $('.showFossils').on('click', function(){

    d3.selectAll('.fossil-overflow').style('visibility','hidden');

    if ($('.fWindow').length == 0) {

      let columnContainers = d3.selectAll('.columnContainer');

      // var fWindow = columnContainers.append('g').attr('class','fWindow');
      columnContainers.each(function(){
        var currentContainer = d3.select(this);
        var getColumnId = d3.select(this.parentNode).attr('id');
        // debugger;

        var allTransformGs = currentContainer.selectAll('.gLayer');
        var fWindow = currentContainer.append('g').attr('class','fWindow');

        allTransformGs.each(function(){
          var currentG = d3.select(this);
          var translate = currentG.attr('transform');

          var thisBar = currentG.select('.bar');
          var boundingRect = thisBar.node().getBoundingClientRect();
          var ageWidth = parseInt(currentG.select('.age').attr('width'));

          var fossil = currentG.selectAll('.fossil-content');
          var fossilSize = fossil.size();
          let fossilRowLimit = 3;
          let minUnderlayHeight = 30;
          // ceil division helps determine min ammount of rows
          // to fit x fossilRowLimit of minUnderlayHeight
          let layerUnderlaySize = minUnderlayHeight*Math
          .ceil(fossilSize/fossilRowLimit);


          var layerGrouping = fWindow.append('g').attr('transform', translate)
          .attr('class', `copyGrouping ${currentG.attr('id')}`);

          layerGrouping.append('rect').attr('height', layerUnderlaySize)
          .attr('width', parseInt(thisBar.attr('width'))- ageWidth)
          .style('fill','rgba(255, 255, 255, 0.85)')
          .attr('top', boundingRect.top).attr('left',boundingRect.left)
          .attr('x',ageWidth).attr('class',`fBar ${currentG.attr('id')}`)
          .attr('data-cID',getColumnId)
          .attr('visibility','hidden');

          fossil.each(function(){
            let thisFossil = d3.select(this);
            thisFossil.attr('data-cID', getColumnId);
            // let fossilId = thisFossil.attr('id');
            layerGrouping.append('use')
            .attr('xlink:href', `#${thisFossil.attr('id')}`)
            .attr('data-cID',getColumnId)
            .attr('class', currentG.attr('id'));
          });
        });
      });
    }

    // Explode behaviour...
    d3.selectAll('use').on('mouseenter', function(){
      // When mouse enters fossil icon, expand
      // underlay
      var thisElement = d3.select(this);
      var elemParent = d3.select(this.parentNode);

      elemParent.raise();

      // Make overflowing icons and underlay visible
      d3.selectAll(`#${thisElement.attr('class')} > .fossil-overflow`)
      .style('visibility','visible');

      d3.selectAll(`rect.${thisElement.attr('class')}`)
      .style('visibility', 'visible');

    });

    d3.selectAll('.copyGrouping').on('mouseleave', function(){
      // When mouse leaves, hide overflowing icons and underlay
      d3.selectAll('.fossil-overflow').style('visibility','hidden');
      d3.selectAll('.fBar').style('visibility','hidden');

    });

    // ternary operator, if fshow's off, turn it on, else, turn it off...
    $(this).attr('data-fshow', function(i, val){
      return val === 'off' ? 'on' : 'off' ;
    });
    $('.fossil-content').toggle();

    let onVSOff = $(this).attr('data-fshow');

    // Toggle display attribute of column features for
    // improved fossil visibility
    let classesToHide =
    '.lithTexture, .unconformity-color, .unconformity, .hoverBar';

    if (onVSOff == 'off') {
      d3.selectAll(classesToHide).style('display','inline');
    } else {
      d3.selectAll(classesToHide).style('display','none');
    }
  });
}

// Make collection columns sortable!
function sortColumns() {
  return $('.collections-flex-container-map').sortable({
    axis: 'x',
    handle: '.handle',
    update: function() {
      return $.post($(this).data('update-url'),
        $(this).sortable('serialize'));
    }
  });
}

function hideCollectionDetails() {
  // Hides Collection details and toggles glyphicon class
  $('button.hide-details').on('click', function() {
    $('div.right-column-collection').toggle();
    $('button.hide-details > i')
    .toggleClass(
      'glyphicon glyphicon-menu-right glyphicon glyphicon-menu-left'
      );
    // Fixes gray areas when resizing map div
    google.maps.event.trigger(window.map, 'resize');

  });
}