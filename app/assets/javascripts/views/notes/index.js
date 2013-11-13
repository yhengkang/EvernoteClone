EvernoteClone.Views.NotesIndex = Backbone.View.extend({
	template: JST["notes/index"],

	initialize: function() {
		var events = ["add", "remove", "sync", "reset", "sort"];
		var that = this; 
		events.forEach(function(event){
			that.listenTo(that.collection, event, that.render)
		});
	},

	events: {	
		"click #create-note" : "createNote"
	},

	render: function() {
		var that = this;
		var uncategorizedNotes = this.collection.where({notebook_id: null});
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		//where returns an arry of models
		if(uncategorizedNotes.length > 0) {
			uncategorizedNotes.forEach(function(note){
				var detailView = new EvernoteClone.Views.NoteDetail({
					model: note
				});
				that.$el.find("ul#notes-list").append(detailView.render().$el);
			});
		}
		this.bindJqueryUi();
		return this;
	},

	createNote: function() {
		var newNote = new EvernoteClone.Models.Note();	
		var that = this;	
		newNote.save({},{
			success: function() {
				that.collection.add(newNote);
				// Backbone.history.navigate("notes/" + newNote.get("id"), {trigger: true});
			}
		});
	},

	bindJqueryUi: function() {
		
		//handle dropping of notes back in here
		var that = this;
		var $noteList = this.$el.find("#notes-list");
		$noteList.droppable({
			accept: ".note-item",
			drop: function(event, ui){
				var noteId = ui.draggable.attr("data-id");
				var note = EvernoteClone.Cache.Notes.get(noteId);
				note.save({notebook_id: null},{
					success: function() {
						ui.draggable.remove();
						that.render();
					}
				});	
			}
		});
	}

})