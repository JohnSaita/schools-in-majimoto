// Define OpenLayers map
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([35.72369436, -1.36005208]), // Default center
    zoom: 12 // Default zoom
  })
});

// Function to add schools to the map
function addSchools(schoolsData) {
  var schoolsLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(schoolsData, {
        featureProjection: 'EPSG:3857'
      })
    }),
    style: function(feature) {
      return new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        }),
        text: new ol.style.Text({
          text: feature.get('name'),
          offsetY: -20,
          fill: new ol.style.Fill({ color: '#000' }),
          stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
        })
      });
    }
  });
  map.addLayer(schoolsLayer);
}

// Example data for schools
var schoolsData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.68413328, -1.26880208] // School 1 coordinates
      },
      "properties": {
        "name": "Parbursh Primary SchooL"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.68003944, -1.33729112] // School 2 coordinates
      },
      "properties": {
        "name": "Kikurku Primary School"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.71490731, -1.33072778  ] // School 2 coordinates
      },
      "properties": {
        "name": "Naisula Academy"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.72369436, -1.36005208] // School 2 coordinates
      },
      "properties": {
        "name": "Iltalala Primary School"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.74501315, -1.40152485] // School 2 coordinates
      },
      "properties": {
        "name": "Olchoro Onyokie Primary School"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.77652508, -1.35931372] // School 2 coordinates
      },
      "properties": {
        "name": "Inchaishi Primary School"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.79733571, -1.41142064] // School 2 coordinates
      },
      "properties": {
        "name": "Osero Lepere Primary School"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [35.75274563, -1.47032160] // School 2 coordinates
      },
      "properties": {
        "name": "Lentukunyi Primary School"
      }
    }


    // Add more schools as needed
  ]
};

// Add schools to the map
addSchools(schoolsData);

// Function to add user location as a blue dot on the map
function addUserLocation(position) {
  var userLocation = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
  map.getView().setCenter(userLocation);
  var userMarker = new ol.Feature({
    geometry: new ol.geom.Point(userLocation)
  });
  userMarker.setStyle(new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: 'blue' }),
      stroke: new ol.style.Stroke({ color: 'white', width: 2 })
    })
  }));
  var userMarkerSource = new ol.source.Vector({
    features: [userMarker]
  });
  var userMarkerLayer = new ol.layer.Vector({
    source: userMarkerSource
  });
  map.addLayer(userMarkerLayer);
}

// Flag to track if user's location has been retrieved
var userLocationRetrieved = false;

// Function to handle geolocation
function handleGeolocation() {
  // Check if geolocation is supported and user's location has not been retrieved yet
  if ("geolocation" in navigator && !userLocationRetrieved) {
    // Get user's current position
    navigator.geolocation.getCurrentPosition(function(position) {
      addUserLocation(position);
      userLocationRetrieved = true;
    }, function(error) {
      console.error('Error getting user location:', error);
      alert('Error getting user location. Please make sure you have allowed location access.');
    });
  } else if (userLocationRetrieved) {
    // Center map on user's location if it has been retrieved already
    var userLayer = map.getLayers().getArray().find(layer => layer.get('name') === 'userLayer');
    if (userLayer) {
      var userSource = userLayer.getSource();
      var userFeatures = userSource.getFeatures();
      if (userFeatures.length > 0) {
        var userGeometry = userFeatures[0].getGeometry();
        map.getView().setCenter(userGeometry.getCoordinates());
      }
    }
  } else {
    alert('Geolocation is not supported by your browser');
  }
}

// Add a button to the control for geolocation
var geolocateButton = document.createElement('img');
geolocateButton.src = './images/location.png'; // Replace with the URL of your PNG image
geolocateButton.className = 'geolocate-button';
geolocateButton.addEventListener('click', handleGeolocation);

// Add the button to the map's control
var geolocateControl = document.createElement('div');
geolocateControl.className = 'ol-control geolocate-control ol-unselectable ol-control';
geolocateControl.appendChild(geolocateButton);
map.addControl(new ol.control.Control({element: geolocateControl}));

// Styling for the button
var style = document.createElement('style');
style.textContent = '.geolocate-control { position: absolute; top: 100px; left: 5px; } .geolocate-button { width: 32px; height: 32px; cursor: pointer; }';
document.head.appendChild(style);
// Function to add schools to the map
function addSchools(schoolsData) {
  var schoolsLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: (new ol.format.GeoJSON()).readFeatures(schoolsData, {
        featureProjection: 'EPSG:3857'
      })
    }),
    style: function(feature) {
      return new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 1],
          src: 'https://openlayers.org/en/latest/examples/data/icon.png'
        }),
        text: new ol.style.Text({
          text: feature.get('name'),
          offsetY: -20,
          fill: new ol.style.Fill({ color: '#000' }),
          stroke: new ol.style.Stroke({ color: '#fff', width: 2 })
        })
      });
    }
  });

  // Function to open Google Maps directions in a new tab
  function openDirections(coordinates, destinationName) {
    var [longitude, latitude] = ol.proj.toLonLat(coordinates);
    var googleMapsURL = 'https://www.google.com/maps/dir/?api=1';
    googleMapsURL += '&destination=' + latitude + ',' + longitude;
    googleMapsURL += '&destination_place_id=' + destinationName;
    window.open(googleMapsURL, '_blank');
  }

  // Function to show a popup with school information and a button to show directions
  function showPopup(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
      return feature;
    });
    if (feature && feature.get('name')) {
      var coordinates = feature.getGeometry().getCoordinates();
      var schoolName = feature.get('name');
      var content = document.createElement('div');
      content.innerHTML = '<p>School: ' + schoolName + '</p><button>Show Directions on Google</button><button class="popup-closer">X</button>';
      var popup = new ol.Overlay({
        element: content,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -20]
      });
      map.addOverlay(popup);
      popup.setPosition(coordinates);
       // Add event listener for closer button
    content.querySelector('.popup-closer').addEventListener('click', function() {
      map.removeOverlay(popup);
    });
      content.querySelector('button').addEventListener('click', function() {
        openDirections(coordinates, schoolName);
      });
    }
  }

  map.addLayer(schoolsLayer);
  map.on('click', showPopup);
}
