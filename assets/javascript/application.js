App = Ember.Application.create({
  rootElement: "#main",
  currentPath: "",
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true
});
App.ApplicationAdapter = DS.FixtureAdapter;
App.deferReadiness();
App.Map = {};

function loadBackgroundImage() {
  var $el = $("#container");
  console.log("loadBackgroundImage");
  var src;
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    src = $el.data("x2-src");
  } else {
    src = $el.data("src");
  }
  $el.css("background-image", "url(" + src + ")");
}

$(window).on("DOMContentLoaded load", loadBackgroundImage);