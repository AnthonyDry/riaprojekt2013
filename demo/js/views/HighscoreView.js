/**
 * @author Anthony Dry
 * @class HighScoreView displays the highscores.
 * @param {Function} HighScoreView	this is my main View for this class. it gets all the objects from the collection and gives the object to the item view.
 * @param {Function} HighScoreItemView	this view gets all the objects and puts them in a template and returns the Views to the HighScoreView
 * @return returns a new instace of HighscoreView.
 * 
 * 
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  
], function($, _, Backbone, Mustache){
	var HighScoreView = Backbone.View.extend({
	el:$('#scoreBoard'),
  	className: 'highscoreList',
  	initialize:function(){
  		this.collect = this.options.collection;
  		this.collect.on('change', this.render, this);
  		this.collect.fetch();
  	},
  	render: function() {
  		//TODO: Get the Highscores in the right orderer havent figured it out yet.
  		var item = null;
     	this.collect.each(function(highscore)
    	{
    		item = new HighscoreItemView({model: highscore});
    		this.$el.append(item.render());
    	
    	},this)
    	
    }
  });
  var HighScoreItemView = Backbone.View.extend({
	template: Mustache.compile($('#highscores-template').html()),
  	className: 'highscoreItem',
  	el: this.el,
  	render: function(){
  		alert(this.model.name()+ ':' +this.model.highscore());
  		 this.$el.html(this.template(this));
  	},
  	name: function(){
  		return this.model.name();
  	},
  	score: function(){
  		return this.model.highscore();
  	}
  });

  return HighScoreView;
  
});