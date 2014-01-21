App.PlacesRoute = Ember.Route.extend({
  model: function() {
    return $.ajax({ url: "http://localhost:3000", dataType: "json" });
  },

  setupController: function(controller, model) {
    this._super();
    controller.set("locations", model.locations);
    controller.setupLocationContent();
  }
});