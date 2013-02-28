/**
 * @author Anthony Dry
 */
define([
  'underscore',
  'backbone',
], function(_, Backbone) {

  var highscoreModel = Backbone.Model.extend({
		name: function(){
			return this.get('name');
		},
		highscore:function(){
			return this.get('highscore');
		}

    });

  	return highscoreModel;

});

/*
 * FastFingerz.highscoreModel = Backbone.Model.extend({
		name: function(){
			return this.get('name');
		},
		highscore:function(){
			return this.get('highscore');
		}
	});
 */