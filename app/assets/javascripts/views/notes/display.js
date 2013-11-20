	EvernoteClone.Views.NoteDisplay = Backbone.View.extend({

	template: JST["notes/display"],

	events: {
		// "keyup input#note_title" : "updateTimer",
		// "keyup textarea#note_content" : "updateTimer",
		"keyup input#note_title" : "updateModel",
		"keyup textarea#note_content" : "updateModel",
		"submit form#tag-form" : "createTag"
	},

	render: function() {
		if (!this.model) {
			this.model = this.collection.models[0] ? this.collection.models[0] : undefined
		}
		var renderedContent = this.template({
			note: this.model
		});

		this.$el.html(renderedContent);
		//render tags if there are any		
		var tagsIndex = new EvernoteClone.Views.TagsIndex({
			collection: this.model._tags
		});
		this.$el.find("div.controls").append(tagsIndex.render().$el);

		this.bindJqueryUi();
		return this;
	},

	updateModel: function() {
		var that = this;
		var formData = $("form#note-form").serializeJSON();
		this.model.set(formData);
		if(this._timerId) {
			window.clearTimeout(this._timerId)
		}
		var options = {
			success: function() {
				// console.log("success!");
				
			},
			error: function() {
				that.model.sync("update", that.model);
			}
		}
		this._timerId = window.setTimeout(this.model.sync, 10000, "update", this.model, options)
	},

	createTag: function(event) {
		event.preventDefault();
		var that = this;
		var tagData = $(event.currentTarget).serializeJSON();
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
		var $noteDisplay = this.$el.find("div.note-display");
		$noteDisplay.draggable({
			revert: "invalid",
			opacity: 0.7
		});
	}


});