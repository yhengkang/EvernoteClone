window.EvernoteClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var router = new EvernoteClone.Routers.AppRouter($("body"));
  	Backbone.history.start();
  }
};

$(document).ready(function(){
  EvernoteClone.initialize();
});
