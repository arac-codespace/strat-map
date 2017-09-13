/* global $*/
/* global d3 */

// Map search bar fade in
function fadingIn() {
  $("#pac-input").fadeIn(5000);
}  
  
// StratColumn bar coloring
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
  
// StratColumn bar unconformities
function generateUnconformity(dynFill, i, type) {
  var patternPath = '<g transform="rotate(-180 125.319091796875,22.8419189453125) "><path fill = ' + dynFill + ' d="m35.65581,28.28433c5.93317,-4.22123 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73268,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73253,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73269,16.88482c11.86634,0 11.86634,-16.88482 23.73269,-16.88482c11.86634,0 11.86634,16.88482 23.73252,16.88482c11.86651,0 11.86651,-16.88482 23.73269,-16.88482c11.86635,0 17.79952,12.6636 23.73269,16.32332" stroke-width="2" stroke= "black" fill-rule="evenodd" fill="transparent"/></g>';
  if (type == 'texture')
  {
    d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-' + i).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-18').attr('width', '50').attr('height', '9999').html(patternPath);
  
    return 'url(#unconformity-' + i + ')'; 
  }
  else if (type == 'color')
  {
    d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-color' + i).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-18').attr('width', '50').attr('height', '9999').html(patternPath);
  
    return 'url(#unconformity-color' + i + ')';
  }
  else if (type == 'legend')
  {
    d3.select('.unconformityPatterns > defs').append('pattern').attr('id', 'unconformity-legend' + i).attr('patternUnits', 'userSpaceOnUse').attr('x', '0').attr('y', '-12').attr('width', '50').attr('height', '9999').html(patternPath);
  
    return 'url(#unconformity-legend' + i + ')'; 
  }
  else
  {
    console.log('generateUnconformity: Type argument invalid');
  }
}

// Google map style
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
