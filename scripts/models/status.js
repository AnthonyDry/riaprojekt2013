define(['backbone','jquery', 'underscore', 'relational'], function(Backbone, $,  _, Relational){
	return Backbone.RelationalModel.extend({
		
		//Validate input before create or update a model
		validate: function(attrs) {
				if ( attrs.status_name === '' ) {
					return 'A name is required!';
				}
		}
	});
});
