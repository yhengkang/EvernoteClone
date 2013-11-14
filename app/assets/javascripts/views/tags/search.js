EvernoteClone.Views.TagSearch = Backbone.View.extend({
	template: JST["tags/search"],

	initialize: function() {
		this.listenTo(EvernoteClone.Cache.Notes, "remove", this.render)
	},

	events: {
		"submit form#tag-search" : "searchByTag"
	},

	// to keep track of search after re-render
	// -keep tagname searched as a attribute
	// -render by old attribute each time view is rendered
	// -refactor render function so it renders by search tag name
	// 		-have render function render only search bar if nothing is provided

	
	render: function(searchResult) {
		var that = this;
		this.$el.empty();
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		//if there are search results, append them to the ul
		if(searchResult && searchResult.models) {
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
			url: "/notes/search",
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