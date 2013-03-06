/**
 * @author Anthony Dry
 * @class TimerView displays the timer and updates it on model change.
 * @return returns a new instace of the TimerView.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache'
], function($, _, Backbone, Mustache){
	var TimerView = Backbone.View.extend({
  	template: Mustache.compile($('#timer-template').html()),
  	initialize: function(){
	  	_.bindAll(this)
	    this.model.on('change', this.render, this);
	    this.model.set('name', '00:00:00');
	    this.model.set('m', '0');
	    this.model.set('s', '0');
	    this.model.set('ms', '0');
	    this.model.set('IsStarted', false);
	    this.model.set('gameIsFinsihed', false);
	    //this.StartTimer();
  	},
  	events:{
  		"click": "StartTimer"
  	},
  	render:function(){
  		this.$el.html(this.template(this));  		
  	},
  	time:function()
  	{
  		return this.model.get('name');
  	},
  	StartTimer:function()
  	{
  		this.model.set('IsStarted', true);
  		this.model.UpdateTimer();			
  	}
  });

  return TimerView;
  
});
