window.EvernoteClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  	var notes = new EvernoteClone.Collections.Notes();
    var notebooks = new EvernoteClone.Collections.Notebooks();
  	notes.fetch({
  		success: function() { 
        notebooks.fetch({
          success: function() {
            var router = new EvernoteClone.Routers.AppRouter($("body"), notes, notebooks);
            Backbone.history.start();
          }
        });
  		}
  	});
  }
};

$(document).ready(function(){
  EvernoteClone.initialize();
});
