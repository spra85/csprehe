(Me.Controllers.Homepage = {
  initialize: function() {
    Me.Dispatcher.on("initHomepage", this.initHomepage, this);
  },

  initHomepage: function() {
    this.initMap();
    this.initBlogPosts();
    _.bindAll(this, "addMapMarker");
  },

  chicagoCenter: function() {
    return new google.maps.LatLng(41.8337329,-87.7321555);
  },

  addMapMarker: function(data) {
    var map = Me.Controllers.Homepage.map,
      markers = Me.Controllers.Homepage.markers;
    var point = new google.maps.LatLng(data.lat,data.lon);
    var marker = new google.maps.Marker({
        position: point,
        title: data.name
    });

    marker.setMap(map);
    markers.push(marker);
  },

  addLocations: function() {
    this.markers = this.markers || [];

    _.forEach(Me.Data.Locations, this.addMapMarker);
  },

  initMap: function() {
    var mapOptions = {
      zoom: 2,
      center: this.chicagoCenter()
    };

    this.map = new google.maps.Map($("#map")[0], mapOptions);
    this.addLocations();
  },

  initBlogPosts: function() {
    var blogContainer = $(".posts");

    _.forEach(Me.Data.Blogs, function(post) {
      var html = '<a href="' + post.url + '" title="' + post.name + '" target="_blank">';
      html += '<li><i class="fa fa-pencil-square-o">' + post.name + '</i></li></a>';
      blogContainer.append(html);
    });
  }
}).initialize();
