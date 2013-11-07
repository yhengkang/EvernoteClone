EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
	template: JST["notebooks/index"],

	initialize: function() {
		var events = ["add", "remove", "sync", "reset"];
		var that = this;
		events.forEach(function(event){
			that.listenTo(that.collection, event, that.render);
		});
	},

	events: {
		"click button#create-notebook" : "createNotebook",
		"click button#delete-notebook" : "deleteNotebook",
		"click button#add-notebook-note" : "addNotebookNote"
	},

	render: function() {
		var renderedContent = this.template({
			notebooks: this.collection
		});
		this.$el.html(renderedContent);
		return this;	
	},

	createNotebook: function() {
		var notebook = new EvernoteClone.Models.Notebook();
		var that = this;
		notebook.save({},{
			success: function() {
				that.collection.add(notebook);
			}
		})
	},

	deleteNotebook: function(event) {
		var notebookId = $(event.currentTarget).attr("data-id");
		var notebook = this.collection.get(notebookId);
		this.collection.remove(notebook, {});
		notebook.destroy();
	},

	addNotebookNote: function() {

	}

});