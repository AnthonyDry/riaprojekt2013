/**
 * @author Anthony Dry
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'views/popupView'
], function($, _, Backbone, Mustache, PopupView){

  var GameAreaView = Backbone.View.extend({
    el: $("#board"),
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
  			var popupView = new PopupView({min:m,sec:s,milli:ms,collection: this.options.collection});
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


/*
 *  FastFingerz.GameAreaView = Backbone.View.extend({
  	template: template("game"),
  	initialize: function()
  	{
	  	_.bindAll(this)
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
  			var PopUpView = new FastFingerz.PopUpView({min:m,sec:s,milli:ms,collection: this.options.collection});
  			this.$('#popUpholder').append(PopUpView.render().el);
  		}
  		return this;
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
  
 */