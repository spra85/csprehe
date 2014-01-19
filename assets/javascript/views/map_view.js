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