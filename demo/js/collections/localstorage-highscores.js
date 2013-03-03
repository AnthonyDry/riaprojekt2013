/**
 * @author Anthony Dry
 * @class this is the collection for the highscores (atm its not working would love if someone fixed it in the next step of this course)
 * @return returns an instace of the collection.
 */

define([
  'underscore',
  'backbone',
  'backbone.localstorage',
  'models/highscoreModel'
], function(_, Backbone, localStorage101, HighscoreModel){
	var Storage = Backbone.Collection.extend({
		model: HighscoreModel,
		//this really dont want to work i know it's suppose to be localStorage101("Fast") but that ends up being an error.
    	localStorage: new Store("Fast")  
 	});

  return Storage;
  

});