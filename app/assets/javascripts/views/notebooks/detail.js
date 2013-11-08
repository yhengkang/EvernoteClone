EvernoteClone.Views.NotebookDetail = Backbone.View.extend({
	template: JST["notebooks/detail"],

	events: {
		"click button#delete-notebook" : "deleteNotebook",
		"click #notebook_item" : "editView"
	},

	render: function() {
		var renderedContent = this.template({
			notebook: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},

	deleteNotebook: function(event) {
		this.model.destroy({
			succcess: function() {
				console.log("notebook destroyed");	
			}
		})
	},

	// editView: function() {
	// 	this.$el.empty();
	// 	var editView = EvernoteClone
	// }

})