EvernoteClone.Routers.AppRouter = Backbone.Router.extend({
	initialize: function(bodyEl, notes, notebooks) {	
		this.noteDisplay = $("#note-display"),
		this.notebooksSidebar = $("#notebooks-sidebar"),
		this.notesSidebar = $("#notes-sidebar"),
		this.notes = notes,
		this.notebooks = notebooks
		//re-renders notedisplay when neccessary
		this.listenTo(this.notes, "add", this.renderNote);
		this.listenTo(this.notes, "remove", this.renderNote);
	},

	routes: {
		'' : "renderAll",
		'notes/:id' : "renderNote"
	},

	renderAll: function() {
		this.renderNotesIndex();
		this.renderNotebooksIndex();
		this.renderNote();
		this.renderSearch();
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
	},

	renderSearch: function() {
		var searchView = new EvernoteClone.Views.TagSearch();
		if(this._oldSearch){
			this._oldSearch.remove();
		}
		this._oldSearch = searchView;
		this.notebooksSidebar.append(searchView.render().$el);
	}
});