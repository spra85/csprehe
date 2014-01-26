App.Place = DS.Model.extend({
  name: DS.attr("string"),
  lat: DS.attr("number"),
  lon: DS.attr("number")
});