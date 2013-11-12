EvernoteClone.Views.TagDetail = Backbone.View.extend({
	template: JST["tags/detail"],

	events: {
		"click button#delete-tag" : "deleteTag"
	},

	render: function() {
		var renderedContent = this.template({
			tag: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},

	deleteTag: function(event) {
		event.preventDefault();
		var tagId = $(event.currentTarget).attr("data-id");
		var tag = this.collection.get(tagId);
		tag.destroy({
			success: function(){
				console.log("tag deleted!");
			}
		});
	}
});