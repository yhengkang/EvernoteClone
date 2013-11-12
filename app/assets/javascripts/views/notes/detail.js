EvernoteClone.Views.NoteDetail = Backbone.View.extend({
	template: JST["notes/detail"],

	render: function() {
		var renderedContent = this.template({
			note: this.model
		});
		this.$el.html(renderedContent);
		return this;
	}
})