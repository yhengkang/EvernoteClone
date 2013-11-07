EvernoteClone.Collections.Notebooks = Backbone.Collection.extend({
	url: "/notebooks",

	model: EvernoteClone.Models.Notebook,

	comparator: function(model) {
		return (-parseInt(model.get("updated_at")))
	}
});