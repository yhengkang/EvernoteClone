EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
	template: JST["notebooks/index"],

	initialize: function() {
		var events = ["add", "remove", "reset"];
		var that = this;
		events.forEach(function(event){
			that.listenTo(that.collection, event, that.render);
		});
	},

	events: {
		"click button#create-notebook" : "createNotebook"
	},

	render: function() {
		console.log("index render")
		var that = this;
		this.$el.empty();
		var renderedContent = this.template();
		this.$el.html(renderedContent)
		this.collection.forEach(function(notebook){
			var detailView = new EvernoteClone.Views.NotebookDetail({
				model: notebook
			});
			//somethings wrong here
			that.$el.find("div.list").append(detailView.render().$el);
		});
		return this;
	},

	createNotebook: function() {
		console.log("Created a book");
		var notebook = new EvernoteClone.Models.Notebook();
		var that = this;
		notebook.save({},{
			success: function() {
				that.collection.add(notebook);
			}
		})
	},

	addNotebookNote: function() {

	}

});