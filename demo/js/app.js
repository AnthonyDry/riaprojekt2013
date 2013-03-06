/**
 * @author Anthony Dry
 * @class Starts up my application. atm only intializing the router and sents it back to main to present.
 * 
 */
define(['jquery', 'backbone','router',], function($, Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    var page = new Router();
    Backbone.history.Start();
  };
});