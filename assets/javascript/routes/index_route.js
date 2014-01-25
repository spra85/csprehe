App.ApplicationRoute = Ember.Route.extend({
  actions: {
    goToPlaces: function() {
      this.transitionToAnimated("places", { main: "slowSlideLeft" });
    }
  }
});