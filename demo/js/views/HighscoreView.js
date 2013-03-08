
//HighScoreView displays the highscores.
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  
], function($, _, Backbone, Mustache){
	var HighScoreView = Backbone.View.extend({
	
  	className: 'highscoreList',
  	//Gets the collection and listens for changes.
  	initialize:function(){
  		
  		this.collection.on('change', this.render, this);
  		this.collection.fetch();
  	},
  	//renders the items from the collection and presents it to the user.
  	render: function() {
  		//TODO: Get the Highscores in the right orderer havent figured it out yet.
     	this.collection.each(function(highscore)
    	{
    		console.log(highscore.name());
    		var item = new HighScoreItemView({model: highscore});
    		this.$el.append(item.render());
    	},this)
    	
    }
  });
//renders the individual items and gives em back to the HighScoreView.
  var HighScoreItemView = Backbone.View.extend({
	template: Mustache.compile($('#highscores-template').html()),
  	className: 'highscoreItem',

  	render: function(){
  		 return this.$el.html(this.template(this));
  	},
  	name: function(){
  		return this.model.name();
  	},
  	score: function(){
  		return this.model.highscore();
  	}
  });
//returns an instance of the HighScoreView.
  return HighScoreView;
  
});