L.Icon.Default.imagePath = "images";
App = Ember.Application.create({
  rootElement: "#main",
  currentPath: "",
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
});
App.deferReadiness();