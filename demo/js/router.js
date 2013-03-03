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
 
], function($, _, Backbone, LogoView, TimerView, GameModel, Store, GameAreaView, HighscoreView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      // my url Root. since i dont really get this require.js thingy.
      "": "index"
    },
    
  });
  
  var initialize = function(){

    var app_router = new AppRouter;
    
    app_router.on('route:index', function(){
    	//collections
    	var store = new Store();
    	//Models
    	var gameModel = new GameModel();
    	//Views.
    	var logoView = new LogoView();
    	var timerView = new TimerView({model:gameModel});
    	var gameAreaView = new GameAreaView({model:gameModel, collection:store});
    	var highscoreView = new HighscoreView({collection:store});
       	//Render my views
    	logoView.render();
    	timerView.render();
    	gameAreaView.render();
    	highscoreView.render();
    	
   	
    });

    Backbone.history.start();
  };
  return { 
    initialize: initialize
  };
});
