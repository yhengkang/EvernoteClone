	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		"submit form" : "updateNote",
		"click #delete-note": "deleteNote"
	},

	render: function() {
		var renderedContent = this.template({
			note: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},

	updateNote: function() {
		event.preventDefault();	
		var formData = $("form#note-form").serializeJSON();
		console.log(formData);
		this.model.save(formData, {
			success: function() {
				console.log("Updated Note")
			}
		});
	},

	deleteNote: function() {
		this.model.destroy();
		this.$el.empty();
	}


});