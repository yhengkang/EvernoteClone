EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
	template: JST["notebooks/index"],

	initialize: function() {
		var events = ["add", "remove", "sync"];
		var that = this; 
		events.forEach(function(event){
			that.listenTo(that.collection, event, that.render)
		});
	},

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