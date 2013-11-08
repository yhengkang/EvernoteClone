EvernoteClone.Views.NotebookDetail = Backbone.View.extend({
	template: JST["notebooks/detail"],

	events: {
		"click button#delete-notebook" : "deleteNotebook",
		"dblclick #notebook-name" : "editView"
	},

	render: function() {
		var renderedContent = this.template({
			notebook: this.model,
			notes: EvernoteClone.Cache.Notes.where({notebook_id: this.model.id})
		});
		this.$el.html(renderedContent);
		this.bindJqueryUi();
		return this;
	},

	deleteNotebook: function(event) {
		this.model.destroy({
			succcess: function() {
				console.log("notebook destroyed");	
			}
		})
	},

	editView: function() {
		this.$el.empty();
		var editView = new EvernoteClone.Views.NoteEdit({
			model: this.model
		});
		//check for neccessity of swapping?
		this.$el.html(editView.render().$el);
	},

	bindJqueryUi: function() {
		var $notebookItem = this.$el.find("pre#notebook-name");
		var that = this;
		$notebookItem.droppable({
			accept: "#note-item",
			drop: function(event, ui){
				var noteId = ui.draggable.attr("data-id");
				var note = EvernoteClone.Cache.Notes.get(noteId);
				var notebookId = that.model.get("id");
				note.save({notebook_id: notebookId},{
					success: function() {
						console.log("note modified");
						ui.draggable.remove();
						that.render();
					}
				});	
			}
		});
	}

})