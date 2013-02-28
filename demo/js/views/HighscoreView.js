/**
 * @author Anthony Dry
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'views/HighscoreItemView'
], function($, _, Backbone, Mustache, HighscoreItemView){
	var HighScoreView = Backbone.View.extend({
	el:$('#scoreBoard'),
  	className: 'highscoreList',
  	initialize:function(){
  		this.collect = this.options.collection;
  		this.collect.on('add', this.render, this);
  		this.collect.fetch();
  	},
  	render: function() {
  		//TODO: Get the Highscores in the right orderer havent figured it out yet.
     	this.collect.each(function(highscore)
    	{
    		var item = new HighscoreItemView({model: highscore});
    		this.$el.append(item.render());
    	},this)
    }
  });

  return HighScoreView;
  
});

/*
 *  FastFingerz.highscoresView = Backbone.View.extend({
  	className: 'highscoreList',
  	initialize:function(){
  		this.collect = this.options.collection;
  		this.collect.on('add', this.render, this);
  		this.collect.fetch();
  	},
  	render: function() {
  		//TODO: Get the Highscores in the right orderer havent figured it out yet.
  		
     	this.collect.each(function(highscore)
    	{
    		var item = new FastFingerz.highscoresView.item({model: highscore});
    		this.$el.append(item.render().el);
    	},this)
    	
    	
     	return this;
    }
  });
  //SUBVIEW RENDERS INDIVIDUAL HIGHSCORES.
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