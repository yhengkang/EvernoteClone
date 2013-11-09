EvernoteClone.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(bodyEl, notes, notebooks) {	
		this.noteDisplay = $("#note-display"),
		this.notebooksSidebar = $("#notebooks-sidebar"),
		this.notesSidebar = $("#notes-sidebar"),
		this.notes = notes,
		this.notebooks = notebooks
	},

	routes: {
		'' : "renderAll",
		'notes/:id' : "renderNote"
	},

	renderAll: function() {
		this.renderNotesIndex();
		this.renderNotebooksIndex();
		this.renderNote();
	},

	renderNote: function(id) {
		var displayView = new EvernoteClone.Views.NoteDisplay({
			model: this.notes.get(id),
			collection: this.notes
		});
		if (this._oldNoteDisplay){
			this._oldNoteDisplay.remove();
		}
		this._oldNoteDisplay = displayView;
		this.noteDisplay.html(displayView.render().$el);
	},

	renderNotesIndex: function() {		
		var indexView = new EvernoteClone.Views.NotesIndex({
			collection: this.notes
		}); 	
		if(this._oldNotesIndex){
			this._oldNotesIndex.remove();
		}
		this._oldNotesIndex = indexView;
		this.notesSidebar.html(indexView.render().$el);
	},

	renderNotebooksIndex: function() {
		var indexView = new EvernoteClone.Views.NotebooksIndex({
			collection: this.notebooks
		})
		if(this._oldNotebooksIndex){
			this._oldNotebooksIndex.remove();
		}
		this._oldNotebooksIndex = indexView
		this.notebooksSidebar.html(indexView.render().$el);
	}

});