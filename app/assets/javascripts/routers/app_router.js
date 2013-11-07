EvernoteClone.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(bodyEl, collection) {
		this.noteDisplay = $("#note-display"),
		this.notebooksSidebar = $("#notebooks-sidebar"),
		this.notesSidebar = $("#notes-sidebar"),
		this.notes = collection
	},

	routes: {
		'' : "renderAll",
		'notes/:id' : "renderNote"
	},

	renderAll: function() {
		console.log("rendering all..");
		this.renderIndex();
		var lastNote = this.notes.models[0]
		this.renderNote(lastNote.get("id"));
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

	renderIndex: function() {
		var indexView = new EvernoteClone.Views.NotesIndex({
			collection: this.notes
		}); 	
		if(this._oldNotesIndex){
			this._oldNotesIndex
		}
		this._oldNotesIndex = indexView
		this.notesSidebar.html(indexView.render().$el);
	}

});