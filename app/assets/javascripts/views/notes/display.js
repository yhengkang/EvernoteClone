	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		// "click #update-note" : "updateNote",
		"click #delete-note": "deleteNote",
		"keyup input#note_title" : "updateTimer",
		"keyup textarea#note_content" : "updateTimer"
	},

	render: function() {
		if (!this.model) {
			this.model = this.collection.models[0] ? this.collection.models[0] : undefined
		}

		var renderedContent = this.template({
			note: this.model
		});
		this.$el.html(renderedContent);
		this.bindJqueryUi();
		return this;
	},

	updateNote: function(formData) {	
		console.log("updated note")
		var that = this;
		this.model.save(formData, {
			success: function() {
				that.collection.sort();		
			}
		});
	},

	updateTimer: function(timeDelay) {
		console.log("timer created");
		if ($(event.srcElement).attr("id") === "note_title") {
			var timeDelay = 10;
		} else {
			var timeDelay = 2000;
		}

		if(this._timerId){
			window.clearTimeout(this._timerId);
		}
		//form data is now compiled each time the timer is created
		var formData = $("form#note-form").serializeJSON();
		this._timerId = window.setTimeout(this.updateNote.bind(this), timeDelay, formData);
		console.log(this._timerId);
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
	},

	bindJqueryUi: function() {
		var $noteDisplay = this.$el.find("form#note-form");
		$noteDisplay.draggable({
			revert: "invalid"
		});
	}


});