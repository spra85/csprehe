App.ApplicationView = Ember.View.extend({
  changeDescription: function(event) {
    var target = $(event.target).closest("a");
    this.get("controller").set("activeLinkDescription", target.data("desc"));
  },

  clearDescription: function() {
    this.get("controller").set("activeLinkDescription", null);
  },

  setupEvents: function() {
    _.bindAll(this, "changeDescription", "clearDescription");
    var iconsContainer = $(".icons");
    iconsContainer.on("mouseenter", ".nav-link", this.changeDescription);
    iconsContainer.on("mouseleave", ".nav-link", this.clearDescription);
  }.on("didInsertElement")
});