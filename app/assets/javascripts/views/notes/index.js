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
		"click #note-item" : "showNote",	
		"click #create-note" : "createNote"
	},

	render: function() {
		var uncatagorizedNotes = this.collection.where({notebook_id: null});
		var renderedContent = this.template({
			notes: uncatagorizedNotes
		});
		this.$el.html(renderedContent);
		this.bindJqueryUi();
		return this;
	},

	showNote: function(event) {
		var noteId = $(event.currentTarget).attr("data-id")
		Backbone.history.navigate("notes/" + noteId, {trigger: true});
	},

	createNote: function() {
		var newNote = new EvernoteClone.Models.Note();	
		var that = this;	
		newNote.save({},{
			success: function() {
				that.collection.add(newNote);
				Backbone.history.navigate("notes/" + newNote.get("id"), {trigger: true});
			}
		});
	},

	bindJqueryUi: function() {
		var $noteItem = this.$el.find("pre#note-item");
		$noteItem.draggable({
			revert: "invalid"
		});
		
		//handle dropping of notes back in here
		var that = this;
		var $noteList = this.$el.find("#notes-list");
		$noteList.droppable({
			accept: "#note-item",
			drop: function(event, ui){
				var noteId = ui.draggable.attr("data-id");
				var note = EvernoteClone.Cache.Notes.get(noteId);
				note.save({notebook_id: null},{
					success: function() {
						console.log("note modified");
						ui.draggable.remove();
						that.render();
					}
				});	
			}
		});
		$noteItem.disableSelection();
	}

})