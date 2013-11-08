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
		var $noteItem = this.$el.find("#note-item");
		$noteItem.draggable({
			revert: "invalid"
		});
		$noteItem.disableSelection();
	}

})