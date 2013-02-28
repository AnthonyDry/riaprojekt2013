/**
 * @author Anthony Dry
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'mustache'
], function($, _, Backbone, Mustache){
	var HighScoreItemView = Backbone.View.extend({
	template: Mustache.compile($('#highscores-template').html()),
  	className: 'highscoreItem',
  	render: function(){
  		alert('inside item');
  		 this.$el.html(this.template(this));
  	},
  	name: function(){
  		return this.model.name();
  	},
  	score: function(){
  		return this.model.highscore();
  	}
  });

  return HighScoreItemView;
  
});
// gets info something wont make this render thats the problem as soon as i get a render back from tihis i will be all set. just need to add comments.



/*
 * //SUBVIEW RENDERS INDIVIDUAL HIGHSCORES.
  FastFingerz.highscoresView.item = Backbone.View.extend({
  	template: template('highscores'),
  	className: 'highscoreItem',
  	render: function(){
  		 this.$el.html(this.template(this));
      return this;
  	},
  	name: function(){
  		return this.model.name();
  	},
  	score: function(){
  		return this.model.highscore();
  	}
  	
  	
  });
 */