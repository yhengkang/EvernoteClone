	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		"click #update-note" : "updateNote",
		"click #delete-note": "deleteNote"
	},

	render: function() {
		var renderedContent = this.template({
			note: this.model
		});
		this.$el.html(renderedContent);
		return this;
	},

	updateNote: function(event) {	
		event.preventDefault();	
		var formData = $("form#note-form").serializeJSON();
		var that = this;

		this.model.save(formData, {
			success: function() {
				that.collection.sort();		
			}
		});
	},

	deleteNote: function(event) {
		event.preventDefault();
		var that = this;
		this.model.destroy({
			success: function() {
				if (that.collection.models[0]){
					var lastNoteId = that.collection.models[0].get("id");
					Backbone.history.navigate("notes/" + lastNoteId, {trigger: true});
				} else {
					that.$el.find("form#note-form").empty();
					Backbone.history.navigate("", {trigger: true});
				}
				
			},
			error: function() {
				console.log("deletion failed");
			},
			wait: true
		});
	}


});