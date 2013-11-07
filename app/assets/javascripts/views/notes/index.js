EvernoteClone.Views.NotesIndex = Backbone.View.extend({
	template: JST["notes/index"],

	initialize: function() {
		var events = ["add", "remove", "sync", "reset"];
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
		var renderedContent = this.template({
			notes: this.collection
		});
		this.$el.html(renderedContent);
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
	}

})