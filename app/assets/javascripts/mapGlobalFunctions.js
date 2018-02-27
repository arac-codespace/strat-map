// https://developers.google.com/maps/documentation/javascript/examples/control-custom
function addGeoMap(controlDiv, map, wms) {

  // Set CSS for the control border.
  let controlUI = document.createElement('div');
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
  let controlText = document.createElement('div');
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

    for (let i=0; i < overlayMapArray.length; i++) {

      if (overlayMapArray[i].name == wmsName ) {
        arrayCheck = true;
      }
    }
    if (arrayCheck == true) {
      wms.removeFromMap(map);
    } else {
      wms.addToMap(map);
    }

  });
}

// https://github.com/beaugrantham/wmsmaptype
function WmsMapType(name, url, params, options) {
	var TILE_SIZE = 256;
	var EARTH_RADIUS_IN_METERS = 6378137;
	var CIRCUMFERENCE = 2 * Math.PI * EARTH_RADIUS_IN_METERS;

  this.name = name;
	this.url = url;
	this.tileSize =
  new google.maps.Size(TILE_SIZE, TILE_SIZE); // required by API

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

	for (let key in params) {
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

	for (let key in options) {
		this.options[key] = options[key];
	}

	/*
	 * Prototype getTile method.
	 */
	this.getTile = function(coord, zoom, ownerDocument) {
		if (!this.params['layers'].length) {
			console.log('[WmsMapType] Required param "layers" is empty');
			return ownerDocument.createElement('div'); // empty div
		}
		let url = this.url + '?';

		for (let key in this.params) {
			url += key + '=' + this.params[key] + '&';
		}

		let bounds = getBounds(coord.x, coord.y, zoom);
		url += 'bbox=' + bounds.swX + ',' + bounds.swY + ',' + bounds.neX + ',' + bounds.neY;

		if (this.options['cache'] == false) {
			let date = new Date();
			url += '&cache=' + date.getTime();
		}

		let div = ownerDocument.createElement('div');
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
			map.overlayMapTypes
      .insertAt(Math.min(index, map.overlayMapTypes.getLength()), this);
		} else {
			map.overlayMapTypes.push(this);
		}
	};

	/*
	 * Remove this MapType from a map.
	 */
	this.removeFromMap = function(map) {
		let overlayTypes = map.overlayMapTypes;

		for (let i = 0; i < overlayTypes.getLength(); i++) {
			let element = overlayTypes.getAt(i);

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

		for (let i in this.tiles) {
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

		let resolution = (CIRCUMFERENCE / TILE_SIZE) / Math.pow(2, z); // meters per pixel

		let swPoint = getMercatorCoord(x, y, resolution);
		let nePoint = getMercatorCoord(x + 1, y + 1, resolution);

		let bounds = {
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