L.Icon.Default.imagePath = "images";

var customPin = L.icon({
  iconUrl: "images/custom_pin.png",
  iconSize: [10, 35],
  iconAnchor: [5, 35]
});

EmberLeaflet.MarkerLayer.reopen({
  init: function() {
    this._super();
    this.set("options", { icon: customPin });
  }
});

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