EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
	template: JST["notebooks/index"],

	render: function() {
		var renderedContent = this.template({
			notebooks: this.collection
		});
		this.$el.html(renderedContent);
		return this;	
	}

});