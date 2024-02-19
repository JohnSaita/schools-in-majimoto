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

// Example event listener for clicking on a school
map.on('click', function(evt) {
  map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
    var schoolCoordinates = feature.getGeometry().getCoordinates();
    var schoolName = feature.get('name'); // Assuming you have stored the school name in a property
    redirectToGoogleMaps(schoolCoordinates, schoolName);
  });
});

// Function to redirect to Google Maps for directions
function redirectToGoogleMaps(coordinates, destinationName) {
  var [longitude, latitude] = ol.proj.toLonLat(coordinates);

  // Constructing Google Maps directions URL
  var googleMapsURL = 'https://www.google.com/maps/dir/?api=1';
  googleMapsURL += '&destination=' + latitude + ',' + longitude;
  googleMapsURL += '&destination_place_id=' + destinationName;

  // Open Google Maps in a new tab
  window.open(googleMapsURL, '_blank');
}
