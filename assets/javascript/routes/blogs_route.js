App.BlogsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find("blog");
  },

  setupController: function(controller, model) {
    this._super();
    controller.set("blogs", model);
  }
});