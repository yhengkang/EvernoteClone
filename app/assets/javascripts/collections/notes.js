EvernoteClone.Collections.Notes = Backbone.Collection.extend({
	url: "/notes",

	model: EvernoteClone.Models.Note,

	comparator: function(model) {
		return -Date.parse(model.get("updated_at"));
	}

});