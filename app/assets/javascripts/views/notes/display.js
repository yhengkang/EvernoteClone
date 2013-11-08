	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		"click #update-note" : "updateNote",
		"click #delete-note": "deleteNote"
	},

	render: function() {
		if (!this.model) {
			this.model = this.collection.models[0] ? this.collection.models[0] : undefined
		}

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
				that.$el.find("form#note-form").empty();
				Backbone.history.navigate("", {trigger: true});
			},
			error: function() {
				console.log("deletion failed");
			},
			wait: true
		});
	}


});