/**
 * @author Anthony Dry
 */

define([
  'underscore',
  'backbone',
  'localstorage',
  'models/highscoreModel'
], function(_, Backbone, localStoreage, HighscoreModel){
	var Storage = Backbone.Collection.extend({
		model: HighscoreModel,
    	localStorage: new Store("Fastfingerz-highscores")  
 	});

  return Storage;
  

});


/*
 * 
 * FastFingerz.Storeage = Backbone.Collection.extend({
  		model: FastFingerz.highscoreModel,
    	localStorage: new Store("Fastfingerz-highscores")
  	});
 */