App.PlacesController = Ember.ArrayController.extend({
  zoom: 2,
  center: L.latLng(40.714, -74.000),
  places: null,

  setupLocationContent: function() {
    var content = [];

    this.get("places").forEach(function(place) {
      content.push({ location: L.latLng(place.get("lat"), place.get("lon")) });
    });
    this.set("content", content);
  }

});