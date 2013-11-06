EvernoteClone.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(bodyEl, collection) {
		this.noteDisplay = $("#note-display"),
		this.notebookSidebar = $("#notebook-sidebar")
		this.notes = collection
		// this.notes = new EvernoteClone.Collections.Notes(),
		// this.notes.fetch();
	},

	routes: {
		'' : "renderAll",
		'notes/:id' : "renderNote"
	},

	renderAll: function() {
		console.log("rendering all..");
		this.renderIndex();
		this.renderNote(1);
	},

	renderNote: function(id) {
		var displayView = new EvernoteClone.Views.NoteDisplay({
			model: this.notes.get(id)
		});
		if (this._oldNoteDisplay){
			this._oldNoteDisplay.remove();
		}
		this._oldNoteDisplay = displayView;
		this.noteDisplay.html(displayView.render().$el);
	},

	renderIndex: function() {
		var indexView = new EvernoteClone.Views.NotebooksIndex({
			collection: this.notes
		}); 	
		if(this._oldNotebookIndex){
			this._oldNotebookIndex
		}
		this._oldNotebookIndex = indexView
		this.notebookSidebar.html(indexView.render().$el);
	}

});