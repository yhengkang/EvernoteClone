EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	initialize: function(notes) {
		this.notes = notes;
		this.note = notes.models[0];
	},

	render: function() {
		var renderedContent = this.template({
			note: this.note
		});
		this.$el.append(renderedContent);
		return this;
	}

});