EvernoteClone.Views.NotebookDetail = Backbone.View.extend({
	template: JST["notebooks/detail"],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render)
	},

	events: {
		"dblclick .notebook-name" : "editView",
		"click .notebook-name" : "toggleNoteList",
		"click button#detail-notebook" : "render"
	},

	render: function() {
		var that = this;
		var renderedContent = this.template({
			notebook: this.model,
		});
		this.$el.html(renderedContent);
		
		var notes = EvernoteClone.Cache.Notes.where({notebook_id: this.model.id})
		if(notes.length > 0){
			notes.forEach(function(note){
				var detailView = new EvernoteClone.Views.NoteDetail({
					model: note
				});
				that.$el.find("ul.notes-list").append(detailView.render().$el);
			})
		}

		this.bindJqueryUi();
		return this;
	},

	toggleNoteList: function() {
		console.log("clicked!");
		this.$el.find("ul.notes-list").toggleClass("hidden");
	},

	editView: function() {
		this.$el.empty();
		var editView = new EvernoteClone.Views.NoteEdit({
			model: this.model
		});
		this.$el.html(editView.render().$el);
	},

	bindJqueryUi: function() {
		var $notebookName = this.$el.find("pre.notebook-name");
		var that = this;
		//handles dropping of note items
		$notebookName.droppable({
			accept: function(element){
				//REFACTOR
				return (element.is(".note-item, .note-display") );
			},
			drop: function(event, ui){
				var noteId = ui.draggable.attr("data-id");
				var note = EvernoteClone.Cache.Notes.get(noteId);
				var notebookId = that.model.get("id");
				note.save({notebook_id: notebookId},{
					success: function() {
						ui.draggable.remove();
						that.render();
					}
				});	
			},
			tolerance: "pointer"
		});
		//handling dragging/dropping of the notes from here
		// var $noteItem = this.$el.find("pre#note-item");
		// $noteItem.draggable({
		// 	revert: "invalid"
		// });
		// $noteItem.disableSelection();
	}

})