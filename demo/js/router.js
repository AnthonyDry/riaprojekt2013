//Anthony Dry
// my router class directs the users to the right views. in this case there is only an index so basically this is just like a middle man for my application 
//to combine the right views and models etc.
//returns an instance of the views.

define([
  'jquery',
  'underscore',
  'backbone',
  'views/logoView',
  'views/timerView',
  'models/gameModel',
  'collections/localstorage-highscores',
  'views/gameAreaView',
  'views/HighscoreView'
 
], function($, _, Backbone, LogoView, TimerView, GameModel, Storage, GameAreaView, HighScoreView) {
  
  var AppRouter = Backbone.View.extend({
  	
  	initialize:function(){
  		this.render();
  	},
	  render:function(){
	  	var store = new Storage();
    	var gameModel = new GameModel();
    	var logoView = new LogoView({el: $("#logo_container")});
    	var timerView = new TimerView({model:gameModel, el:$('#clock')});
    	var gameareaView = new GameAreaView({model:gameModel, collection:store, el: $("#board")});
    	var highscoreView = new HighScoreView({collection:store, el:$('#scoreBoard')});
    	
    	
    	logoView.render();
    	timerView.render();
    	gameareaView.render();
    	highscoreView.render();
	  }
    
  });
  
  return AppRouter;
});
