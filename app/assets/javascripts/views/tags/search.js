EvernoteClone.Views.TagSearch = Backbone.View.extend({
	template: JST["tags/search"],

	events: {
		"submit form#tag-search" : "searchByTag"
	},

	render: function(searchResult) {
		var that = this;
		this.$el.empty();
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		//if there are search results, append them to the ul
		if(searchResult) {
			searchResult.models.forEach(function(note){
				//note detail view has an extra div in it, REFACTOR
				var noteDetail = new EvernoteClone.Views.NoteDetail({
					model: note
				});
				that.$el.find("ul#search-result-list").append(noteDetail.render().$el);
			});
		}
		return this;
	},

	searchByTag: function(event) {
		event.preventDefault();
		var that = this;
		formData = $(event.currentTarget).serializeJSON();
		$.ajax({
			type: "POST",
			url: "/tags/search",
			data: formData
		}).done(function(resp){
			if (resp.length > 0) {
				var searchResult = new EvernoteClone.Collections.Notes(resp);
				that.render(searchResult);
			} else {
				that.render();
			}
		});
	}
})