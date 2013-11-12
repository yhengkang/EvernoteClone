EvernoteClone.Views.TagsIndex = Backbone.View.extend({
	template: JST["tags/index"],

	initialize: function() {
		var events = ["add", "remove"];
		var that = this;
		events.forEach(function(event){
			that.listenTo(that.collection, event, that.render)
		});
	},

	render: function() {
		var renderedContent = this.template();
		var that = this;
		this.$el.html(renderedContent);
		this.collection.forEach(function(tag){
			var detailView = new EvernoteClone.Views.TagDetail({
				model: tag,
				collection: that.collection
			});
			that.$el.find("ul").append(detailView.render().$el);
		});
		return this;
	}
})