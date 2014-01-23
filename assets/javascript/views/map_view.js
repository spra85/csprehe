L.Icon.Default.imagePath = "images";

// App.customMarkerIcon = L.icon({
//   iconUrl: 'Map-icon.png'
// });

App.MarkerCollectionLayer = EmberLeaflet.MarkerCollectionLayer.extend({
  contentBinding: "controller"
});

App.GoogleMapLayer = EmberLeaflet.Layer.extend({
  _newLayer: function() {
    return new L.Google('ROADMAP');
  }
});

App.MapView = EmberLeaflet.MapView.extend({
  childLayers: [
    App.GoogleMapLayer,
    App.MarkerCollectionLayer
  ]
});