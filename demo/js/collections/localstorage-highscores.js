/**
 * @author Anthony Dry
 * @class this is the collection for the highscores (atm its not working would love if someone fixed it in the next step of this course)
 * @return returns an instace of the collection.
 */

define([
  'underscore',
  'backbone',
  'models/highscoreModel'
], function(_, Backbone, HighscoreModel){
	var Storage = Backbone.Collection.extend({
		model: HighscoreModel,
    	localStorage: new Backbone.LocalStorage('Fast')  
 	});

  return Storage;
  

});