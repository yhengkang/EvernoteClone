EvernoteClone.Views.NoteEdit = Backbone.View.extend({
	template: JST["notebooks/edit"],

	events: {
		"click button#edit-notebook" : "editNotebook",
		"click button#delete-notebook" : "deleteNotebook"
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
				that.detailView();
			}
		});
	},

	deleteNotebook: function(event) {
		event.preventDefault();
		this.model.destroy();
	},

	detailView: function(){
		this.$el.empty();
		var detailView = new EvernoteClone.Views.NotebookDetail({
			model: this.model
		});
		//check for neccessity of swapping?
		this.$el.html(detailView.render().$el);
	}


});