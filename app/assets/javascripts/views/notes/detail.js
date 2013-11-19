EvernoteClone.Views.NoteDetail = Backbone.View.extend({
	template: JST["notes/detail"],

	events: {
		"click pre.note-item" : "showNote"
	},

	initialize: function() {
		this.listenTo(this.model, "change", this.render);
	},

	render: function() {
		var renderedContent = this.template({
			note: this.model
		});
		this.$el.html(renderedContent);
		this.bindJqueryUi();
		return this;
	},

	showNote: function(event) {
		var noteId = $(event.currentTarget).attr("data-id")
		Backbone.history.navigate("notes/" + noteId, {trigger: true});
	},

	bindJqueryUi: function() {
		var $noteItem = this.$el.find("pre.note-item");
		$noteItem.draggable({
			revert: "invalid",
			opacity: 0.7
		});
		$noteItem.disableSelection();
	}

});