
//Gets the logo. this view is kind of pointless. sorry about that.
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache'
], function($, _, Backbone, Mustache){

  var LogoView = Backbone.View.extend({
    

    render: function(){
      
      this.$el.html("<h2> FastFingerz</h2>");
    }

  });

  return LogoView;
  
});


