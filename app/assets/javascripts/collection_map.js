/*global $*/
/*global d3*/
/*global google*/
/*global OverlappingMarkerSpiderfier*/


$(document).on('turbolinks:load', function () {
  if ($('.collections.show').length == 1) {

    // This sets the map's height dynamically before rendering
    // Allows the height of the map to adjust to right-column's height
    var leftColHeight = $(".right-column").css("height");
    var leftColTitle = $(".left-column-title").css("height");
      
    if (parseInt(leftColHeight) > 446) {
      $(".left-column").css("height", parseInt(leftColHeight) - parseInt(leftColTitle));
    }
    
    google.maps.event.addDomListener(window, 'turbolinks:load', initMap());
  } else {
    return false;
  }
  
  function initMap() {
  
    var map = new google.maps.Map(document.getElementById('collection_map'), {
      center: { lat: 18.2208, lng: -66.5901 },
      zoom: 9,
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
  
    
  } // iniMap end
  
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
  
  
});


