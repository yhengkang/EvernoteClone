EvernoteClone.Views.NoteEdit = Backbone.View.extend({
	template: JST["notebooks/edit"],

	events: {
		"click button#edit-notebook" : "editNotebook"
	},

	render: function() {
		var renderedContent = this.template({
			notebook: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},

	editNotebook: function(event) {
		event.preventDefault();
		var that = this;
		var formData = $("#notebook-form").serializeJSON();
		this.model.save(formData, {
			success: function() {
			}
		});
	},

});