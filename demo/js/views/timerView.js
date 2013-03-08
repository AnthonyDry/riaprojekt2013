
//TimerView displays the timer and updates it on model change.

define([
  'jquery',
  'underscore',
  'backbone',
  'mustache'
], function($, _, Backbone, Mustache){
	var TimerView = Backbone.View.extend({
  	template: Mustache.compile($('#timer-template').html()),
  	//Sets the models standard values.
  	initialize: function(){
	  	_.bindAll(this)
	    this.model.on('change', this.render, this);
	    this.model.set('name', '00:00:00');
	    this.model.set('m', '0');
	    this.model.set('s', '0');
	    this.model.set('ms', '0');
	    this.model.set('IsStarted', false);
	    this.model.set('gameIsFinsihed', false);

  	},
  	//eventlistener.
  	events:{
  		"click": "StartTimer"
  	},
  	//renders the view.
  	render:function(){
  		this.$el.html(this.template(this));  		
  	},
  	time:function()
  	{
  		return this.model.get('name');
  	},
  	//Starts the game basically.
  	StartTimer:function()
  	{
  		this.model.set('IsStarted', true);
  		this.model.UpdateTimer();			
  	}
  });
//returns Instance of timerView.
  return TimerView;
  
});
