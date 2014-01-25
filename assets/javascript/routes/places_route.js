App.PlacesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("place");
  },

  setupController: function(controller, model) {
    this._super();
    controller.set("places", model);
    controller.setupLocationContent();
  }
});