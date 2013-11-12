EvernoteClone.Models.Note = Backbone.Model.extend({
	urlRoot: "/notes",

	parse: function(resp) {
		var that = this;
		if( !this._tags ){
			this._tags = new EvernoteClone.Collections.Tags();
		}
		if (resp.tags) {
			this._tags.reset(resp.tags);	
		}
		delete resp.tags;
		return resp;
	}


});