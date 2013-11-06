EvernoteClone.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(bodyEl) {
		this.noteDisplay = $("#note-display"),
		this.notebookSidebar = $("#notebook-sidebar")
	},

	routes: {
		'' : "renderAll",
		'notes/:id' : "renderNote"
	},

	renderAll: function() {
		console.log("rendering all..");
		var notes = new EvernoteClone.Collections.Notes();
		var that = this;
		notes.fetch({
			success: function(notes) {
				that.notes = notes
				that.renderIndex();		
			}
		})
		
	},

	renderNote: function(id) {
		var displayView = new EvernoteClone.Views.NoteDisplay({
			model: this.notes.get(id)
		});
		this.noteDisplay.html(displayView.render().$el);
	},

	renderIndex: function() {
		var indexView = new EvernoteClone.Views.NotebooksIndex({
			collection: this.notes
		}); 	
		this.notebookSidebar.html(indexView.render().$el);
	}


});