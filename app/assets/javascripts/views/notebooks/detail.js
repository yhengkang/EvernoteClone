	EvernoteClone.Views.NotebookDetail = Backbone.View.extend({
		template: JST["notebooks/detail"],

	events: {
		"click button#delete-notebook" : "deleteNotebook",
		"click .edit-view" : "editView",
		"click #notebook-name" : "toggleNoteList"
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

	toggleNoteList: function() {
		console.log("clicked!");
		this.$el.find("ul#notes-list").toggleClass("hidden");
	},

	deleteNotebook: function(event) {
		this.model.destroy({
			succcess: function() {
				console.log("notebook destroyed");	
			}
		})
	},

	editView: function() {
		// var events = ["click button#delete-notebook", "dblclick #notebook-name", "click #notebook-name"];
		// var that = this;
		// events.forEach(function(event) {
		// 	that.off(event);
		// });
		// this.$el.find("#notebook-name").off();
		this.$el.empty();
		var editView = new EvernoteClone.Views.NoteEdit({
			model: this.model
		});
		//need to swap//problem is with the detail view not getting removed. not the edit view.
		// if (this._oldEditView) {
		// 	this._oldEditView.remove();	
		// } 
		// this._oldEditView = editView;
		this.$el.html(editView.render().$el);
	},

	bindJqueryUi: function() {
		var $notebookItem = this.$el.find("pre#notebook-name");
		var that = this;
		//handles dropping of note items
		$notebookItem.droppable({
			accept: function(element){
				//REFACTOR
				return (element.attr("id") === "note-item" || element.attr("id") === "note-form");
			},
			drop: function(event, ui){
				console.log("dropped!");
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
			},
			tolerance: "pointer"
		});
		//handling dragging/dropping of the notes from here
		var $noteItem = this.$el.find("pre#note-item");
		$noteItem.draggable({
			revert: "invalid"
		});
		$noteItem.disableSelection();
	}

})