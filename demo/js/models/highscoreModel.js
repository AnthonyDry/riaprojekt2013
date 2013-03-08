
//the model used by the collection anyhow since the collection doesnt work i dont know if this works.

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
//returns an instance of  highscoreModel.
  	return highscoreModel;

});

