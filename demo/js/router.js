/**
 * @author Anthony Dry
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
    	var gameAreaView = new GameAreaView({model:gameModel});
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
/*
      var logo = new FastFingerz.Index();
      var gameModel =  new FastFingerz.Game();
      var col = new FastFingerz.Storeage(); 
      var highscoresView = new FastFingerz.highscoresView({collection:col});
      var counter = new FastFingerz.TimerView({model: gameModel});
      var gameArea = new FastFingerz.GameAreaView({model: gameModel, collection: col});
      this.el.empty();
      this.el.append(logo.render().el);
      this.el.append(counter.render().el);
      this.el.append(gameArea.render().el);
      this.el.append(highscoresView.render().el);*/