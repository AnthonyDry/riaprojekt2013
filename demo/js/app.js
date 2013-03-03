/**
 * @author Anthony Dry
 * @class Starts up my application. atm only intializing the router and sents it back to main to present.
 * 
 */
define(['jquery', 'underscore', 'backbone','router',], function($, _, Backbone, Router){
  var initialize = function(){
    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  return { 
    initialize: initialize
  };
});