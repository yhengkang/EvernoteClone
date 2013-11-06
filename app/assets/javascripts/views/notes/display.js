EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	// initialize: function(notes) {
	// 	this.notes = notes;
	// 	this.note = notes.models[0];
	// },

	events: {
		"submit form" : "updateNote"
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
		this.model.save(formData, {
			success: function() {
				console.log("Updated Note")
			}
		});
	}

});