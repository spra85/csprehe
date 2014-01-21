App.PlacesController = Ember.ArrayController.extend({
  zoom: 2,
  center: L.latLng(40.714, -74.000),
  locations: null,

  setupLocationContent: function() {
    var content = [];
    var locations = Ember.A(this.get("locations"));

    locations.forEach(function(latLngHash) {
      content.push({ location: L.latLng(latLngHash.lat, latLngHash.lon) });
    });
    this.set("content", content);
  }

});