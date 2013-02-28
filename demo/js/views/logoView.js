/**
 * @author Anthony Dry
 */

define([
  'jquery',
  'underscore',
  'backbone',
  'mustache'
], function($, _, Backbone, Mustache){

  var LogoView = Backbone.View.extend({
    el: $("#logo_container"),

    render: function(){
      
      this.$el.html("<h2> FastFingerz</h2>");
    }

  });

  return LogoView;
  
});


/*FastFingerz.Index = Backbone.View.extend({
    template: template('index'),
    model: new FastFingerz.HelloWorld(),
    
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    name: function() {
      return this.model.name();
    }
  });*/