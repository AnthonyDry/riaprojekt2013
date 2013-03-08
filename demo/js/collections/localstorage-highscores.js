
// This is the collection for the highscores.

define([
  'underscore',
  'backbone',
  'models/highscoreModel'
], function(_, Backbone, HighscoreModel){
	var Storage = Backbone.Collection.extend({
		model: HighscoreModel,
    	localStorage: new Backbone.LocalStorage('Fast')  
 	});
//returns an instance of the collection.
  return Storage;
  

});