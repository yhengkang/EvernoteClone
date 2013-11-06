EvernoteClone.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(bodyEl) {
		this.noteDisplay = $("#note-display"),
		this.notebookSidebar = $("#notebook-sidebar")
	},

	routes: {
		'' : "renderAll"
	},

	renderAll: function() {
		console.log("rendering all..");
		var notes = new EvernoteClone.Collections.Notes();
		var that = this;
		notes.fetch({
			success: function(notes) {
				console.log(notes);
				that.renderNote(notes);		
			}
		})
		
	},

	renderNote: function(notes) {
		var displayView = new EvernoteClone.Views.NoteDisplay(notes);
		this.noteDisplay.html(displayView.render().$el);
	}

});