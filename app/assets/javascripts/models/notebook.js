EvernoteClone.Models.Notebook = Backbone.Model.extend({

	urlRoot: "/notebooks",

	notes: function() {
		return EvernoteClone.Cache.Notes.where({notebook_id: this.id});
	}
	
});