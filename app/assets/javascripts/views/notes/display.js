	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		"submit form" : "updateNote"
	},

	render: function() {
		console.log(this.model);
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
	}

});