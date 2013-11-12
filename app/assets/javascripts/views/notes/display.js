	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		"keyup input#note_title" : "updateTimer",
		"keyup textarea#note_content" : "updateTimer",
		"click button#create-tag" : "createTag"
	},

	render: function() {
		if (!this.model) {
			this.model = this.collection.models[0] ? this.collection.models[0] : undefined
		}
		var renderedContent = this.template({
			note: this.model
		});

		this.$el.html(renderedContent);

		var tagsIndex = new EvernoteClone.Views.TagsIndex({
			collection: this.model._tags
		});
		this.$el.find("div.controls").append(tagsIndex.render().$el);

		this.bindJqueryUi();
		return this;
	},

	updateNote: function(formData) {
		var that = this;
		this.model.save(formData, {
			success: function() {
				that.collection.sort();		
			}
		});
	},

	updateTimer: function(timeDelay) {
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
	},

	createTag: function(event) {
		event.preventDefault();
		var that = this;
		//nested form doesnt work, nest our own attributes
		var tagData = {
			tag: {
				name: this.$el.find("input#tag_name").val(),
				note_id: this.model.get("id")
			}
		}
		var newTag = new EvernoteClone.Models.Tag();
		newTag.save(tagData, {
			success: function() {	
				that.model._tags.add(newTag);
				that.$el.find("input#tag_name").val("");
				console.log("tag saved!");
			}
		});
	},

	bindJqueryUi: function() {
		var $noteDisplay = this.$el.find("form#note-form");
		$noteDisplay.draggable({
			revert: "invalid"
		});
	}


});