/**
 * @author Anthony Dry
 * @class gameAreaView is the main view for this prodject it presents the game and also handles the events from click and isFinished.
 * @param {Function} render 	this function handles both the output of this view and it also instances a new view if the game is finished.
 * @param {Function} thepad 	this function sets a new randomNr if game isStarted and then gets the randomNr and set it to the button synced with the randomNr.
 *  god this was hard to explain anyway its something like that.
 * @param {Function} CheckPress	this event function check if the player pressed the right button. else its getting a penelty. 
 * usually i would prefer to have this in a model or help class and not in the view. seens the view IMO should only handle the users input and then let the model
 *  handle what the view should present next any how in backbone the model seems to only be used to store values soim getting abit confused.
 * @return returns a new instance of gameAreaView.
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'views/popupView'
], function($, _, Backbone, Mustache, PopupView){

  var GameAreaView = Backbone.View.extend({
	template: Mustache.compile($('#game-template').html()),
  	initialize: function()
  	{
	  	//_.bindAll(this)
	    this.model.on('change:IsStarted', this.render, this);
	    this.model.set('CorrectPresses', '0');
	    
	},
	  
  	render:function()
  	{
  		if(!this.model.IsFinished())
  		{
  		this.$el.html(this.template(this));
  		}
  		else
  		{
  			this.model.set('gameIsFinsihed', true);
  			var m = this.model.get('m');
  			var s = this.model.get('s');
  			var ms = this.model.get('ms');
  			var popupView = new PopupView({min:m,sec:s,milli:ms,collection: this.collection});
  			this.$('#popUpholder').append(popupView.render().el);
  			
  		}
  		
  	},
  	
  	thepad:function()
  	{
  		var arr = this.model.Buttons();
  		var random = this.model.NewRandomNumber();
  		this.model.set('activeRandomNr', random);
  		var val = [];
  		if(this.model.get('IsStarted') === true)
  		{
	  		for(var i = 0; i < arr.length; i++)
	  		{
	  			if(i == random)
	  			{
	  				val.push("<button id='button_"+i+"' class='gamebutton_active'></button>");
	  			}
	  			else
	  			{
	  				val.push("<button id='button_"+i+"' class='gamebutton'></button>");
	  			}
	  		}
  		}
  		else
  		{
  			for(var i = 0; i < arr.length; i++)
	  		{
	  			val.push("<button id='button_"+i+"' class='gamebutton'></button>");
	  		}
  		}
  		return val;
  	},
  	events:
  	{
  		"click": "CheckPressed" 
  	},
  	CheckPressed:function(e)
  	{
  		var targetElement = e.srcElement.id;
  		var arr =targetElement.split("_");
  		if(arr[1] == this.model.get('activeRandomNr'))
  		{
  			var correct = this.model.get('CorrectPresses');
  			correct++;
  			this.model.set('CorrectPresses', correct);
  			this.render();
  		}
  		else
  		{
  			var sec = this.model.get('s');
  			sec++;
  			this.model.set('s', sec);	
  		}
  	},
  	count:function(){
  		return this.model.get('NumberOfPressesLeft');
  	}
  
   
  });

  return GameAreaView;
  
});