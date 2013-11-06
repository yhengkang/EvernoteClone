EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
	template: JST["notebooks/index"],

	events: {
		"dblclick #note-item" : "showNote"
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
	}

})