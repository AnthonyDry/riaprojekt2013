/**
 * @author Anthony Dry
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
], function($, _, Backbone, Mustache, PopupView){

  var PopupView = Backbone.View.extend({
	template: Mustache.compile($('#popup-template').html()),
  	initialize:function()
  	{
  		
  		this.min = this.options.min;
  		this.sec = this.options.sec;
  		this.milli = this.options.milli;
  		this.store = this.options.collection;
  		if(this.milli < 10)
    	{
    		this.milli = '0'+this.milli;
    	}
    	if(this.sec < 10)
    	{
    		this.sec = '0'+this.sec;
    	}
    	if(this.min < 10)
    	{
    		this.min = '0'+this.min;
    	}
  	},
  	render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    a_min:function()
    {
    	return this.min;
    },
     a_sec:function()
    {
    	return this.sec;
    },
     a_milli:function()
    {
    	return this.milli;
    },
    events:
    {
    	"submit": "submit"
    },
    submit:function(e)
    {
    	if(this.$('#highscoreName').val() == '')
    	{
    		//TODO: Do a check if user really dont want to save it's highscore.
    	}
    	else
    	{
    		this.store.create({
    			name: this.$('#highscoreName').val(),
    			highscore: this.min+':'+this.sec+':'+this.milli,
    		});	
    	}
    } 
	});
  return PopupView;
  
});


/*
 * FastFingerz.PopUpView = Backbone.View.extend({
  	template: template("popup"),
  	initialize:function()
  	{
  		//re:do init. basically add the if statements here instead.
  		this.min = this.options.min;
  		this.sec = this.options.sec;
  		this.milli = this.options.milli;
  		this.store = this.options.collection;
  		if(this.milli < 10)
    	{
    		this.milli = '0'+this.milli;
    	}
    	if(this.sec < 10)
    	{
    		this.sec = '0'+this.sec;
    	}
    	if(this.min < 10)
    	{
    		this.min = '0'+this.min;
    	}
  	},
  	render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    a_min:function()
    {
    	return this.min;
    },
     a_sec:function()
    {
    	return this.sec;
    },
     a_milli:function()
    {
    	return this.milli;
    },
    events:
    {
    	"submit": "submit"
    },
    submit:function(e)
    {
    	if(this.$('#highscoreName').val() == '')
    	{
    		//TODO: Do a check if user really dont want to save it's highscore.
    	}
    	else
    	{
    		this.store.create({
    			name: this.$('#highscoreName').val(),
    			highscore: this.min+':'+this.sec+':'+this.milli,
    		});	
    	}
    } 
  });
 */
