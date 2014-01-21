//L.marker([40.714, -74.000]).addTo(map)
App.PlacesController = Ember.ArrayController.extend({
  content: [
    { location: L.latLng(40.714, -74.000) },
    { location: L.latLng(40.714, -73.989) },
    { location: L.latLng(40.721, -73.991) }
  ],
  zoom: 2,
  center: L.latLng(40.714, -74.000)
});