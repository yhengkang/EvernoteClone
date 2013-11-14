EvernoteClone.Views.NotebooksIndex = Backbone.View.extend({
	template: JST["notebooks/index"],

	initialize: function() {
		var notebooksEvents = ["add", "remove", "reset"];
		var that = this;
		notebooksEvents.forEach(function(event){
			that.listenTo(that.collection, event, that.render);
		});
		var notesEvents = ["sync"];
		notesEvents.forEach(function(event){
			that.listenTo(EvernoteClone.Cache.Notes, event, that.render);
		});
	},

	events: {
		"click button#create-notebook" : "createNotebook"
		// "click pre.note-item" : "showNote"
	},

	render: function() {
		var that = this;
		this.$el.empty();
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		this.collection.forEach(function(notebook){
			var detailView = new EvernoteClone.Views.NotebookDetail({
				model: notebook
			});
			that.$el.find("ul#notebook-list").append(detailView.render().$el);
		});
		this.bindJQueryUi();
		return this;
	},

	// showNote: function(event) {
	// 	var noteId = $(event.currentTarget).attr("data-id")
	// 	Backbone.history.navigate("notes/" + noteId, {trigger: true});
	// },

	createNotebook: function() {
		var notebook = new EvernoteClone.Models.Notebook();
		var that = this;
		notebook.save({},{
			success: function() {
				that.collection.add(notebook);
			}
		})
	},

	bindJQueryUi: function() {
		var $notebookList = this.$el.find("#notebook-list")
		$notebookList.sortable({
			opacity: 0.7
		});
		$notebookList.disableSelection();
	}
	
});