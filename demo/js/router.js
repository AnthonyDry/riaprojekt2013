/**
 * @author Anthony Dry
 * @class my router class directs the users to the right views. in this case there is only an index so basically this is just like a middle man for my application 
 * to combine the right views and models etc.
 * @return {String} returns an instace of the router class to the app class.
 */
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
 
], function($, _, Backbone, LogoView, TimerView, GameModel, Storage, GameAreaView, HighscoreView) {
  
  var AppRouter = Backbone.View.extend({
  	
  	initialize:function(){
  		this.render();
  	},
	  render:function(){
	  	var store = new Storage();
    	//Models
    	var gameModel = new GameModel();
    	//Views.
    	var logoView = new LogoView({el: $("#logo_container")});
    	var timerView = new TimerView({model:gameModel, el:$('#clock')});
    	var gameAreaView = new GameAreaView({model:gameModel, collection:store, el: $("#board")});
    	var highscoreView = new HighscoreView({collection:store, el:$('#scoreBoard')});
       	//Render my views
    	logoView.render();
    	timerView.render();
    	gameAreaView.render();
    	highscoreView.render();
	  }
    
  });
  
  return AppRouter;
});
