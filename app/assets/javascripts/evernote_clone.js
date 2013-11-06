window.EvernoteClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var notes = new EvernoteClone.Collections.Notes();
  	notes.fetch({
  		success: function() {
  			var router = new EvernoteClone.Routers.AppRouter($("body"), notes);
		  	Backbone.history.start();
  		}
  	});
  }
};

$(document).ready(function(){
  EvernoteClone.initialize();
});
