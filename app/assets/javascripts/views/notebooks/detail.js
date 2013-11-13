EvernoteClone.Views.NotebookDetail = Backbone.View.extend({
	template: JST["notebooks/detail"],

	initialize: function() {
		this.listenTo(this.model, "sync", this.render),
		this.$el = $("<li></li>"),
		//handle listening for deletion of notes// need a better way then just re-rendering all the things
		this.listenTo(EvernoteClone.Cache.Notes, "remove", this.render)
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
		//set the li item to the correct id and class
		this.$el.addClass("notebook-item");
		this.$el.attr("data-id", this.model.get("id"));
		//puts rendered content into the li item
		this.$el.html(renderedContent);
		
		var notes = this.model.notes();
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
		var $notebookItem = this.$el.find(".notebook-name");
		var that = this;
		//handles dropping of note items
		$notebookItem.droppable({
			accept: function(element){
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
	}

})