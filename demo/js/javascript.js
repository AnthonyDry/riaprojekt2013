/**
 * @author Anthony Dry
 * @class This is a working example without require.js all the functions are packed in to one file thats been namespaced. hopefully i wount have to use this file anymore.
 */

//initzlising my global object 
(function() {
  var FastFingerz = {};
  window.FastFingerz = FastFingerz;
	
	//help function for getting relative template from Mustache.
  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };
	FastFingerz.highscoreModel = Backbone.Model.extend({
		name: function(){
			return this.get('name');
		},
		highscore:function(){
			return this.get('highscore');
		}
	});
  
	
	
  	FastFingerz.Storeage = Backbone.Collection.extend({
  		model: FastFingerz.highscoreModel,
    	localStorage: new Store("Fastfingerz-highscores")
  	});

	//the worst model in the history of human kind it will change tho! :)
	FastFingerz.HelloWorld = Backbone.Model.extend({
		name: function(){ return "&nbsp;Fast Fingerz";}
	});
	
	// model for keeping track of the time.
	FastFingerz.Game = Backbone.Model.extend({
		Buttons: function(){
			return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
		},
		
		UpdateTimer: function(){
			
				setInterval(this.onTick.bind(this),10);
			
		},
		//this code needs to be fixed it looks terrible.
		onTick:function()
		{
			if(!this.get('gameIsFinsihed'))
			{
				var s = this.get('s');
				var m = this.get('m');
				var ms = this.get('ms');
				ms++;
				if(ms>99){ms = 00; s++;}
				if(s>59){s = 00; m++;}
				if(m>99){//TODO: something better than this.
					m = 99;
				}
				this.set('ms', ms);
				this.set('s', s);
				this.set('m', m);
				if(ms<10){ms = "0"+ms;}
				if(s<10){s = "0"+s;}
				if(m<10){m = "0"+m;}
				this.set('name', m+':'+s+':'+ms);
			}
			else{clearInterval(this);}	
		},
		
		NewRandomNumber:function()
		{
			return Math.floor((Math.random()*24)+0);
		},
		IsFinished:function()
		{
			var NUMBER_FOR_FINISH = 3
			//this is pretty ugly but the best i could think of atm. getting a bit stressed.
			this.set('NumberOfPressesLeft',NUMBER_FOR_FINISH - this.get('CorrectPresses'));
			if(this.get('CorrectPresses') >= NUMBER_FOR_FINISH)
			{
				return true;
			}
			return false;
		}
	});
	
	//My container view i guess this view will render thruout my application and init other sub views.
  FastFingerz.Index = Backbone.View.extend({
    template: template('index'),
    model: new FastFingerz.HelloWorld(),
    
    render: function() {
      this.$el.html(this.template(this));
      return this;
    },
    name: function() {
      return this.model.name();
    }
  });
  //View for the timer which instances a new model with keep track of the time. and render it.
  FastFingerz.TimerView = Backbone.View.extend({
  	template: template("timer"),
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
  		return this;
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
  //my over complected GameAreaView.
  FastFingerz.GameAreaView = Backbone.View.extend({
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
  
  });
  //My popupview this is for saving records etc.
  FastFingerz.PopUpView = Backbone.View.extend({
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
  FastFingerz.highscoresView = Backbone.View.extend({
  	className: 'highscoreList',
  	initialize:function(){
  		this.collect = this.options.collection;
  		this.collect.on('add', this.render, this);
  		this.collect.fetch();
  	},
  	render: function() {
  		//TODO: Get the Highscores in the right orderer havent figured it out yet.
  		
     	this.collect.each(function(highscore)
    	{
    		var item = new FastFingerz.highscoresView.item({model: highscore});
    		this.$el.append(item.render().el);
    	},this)
    	
    	
     	return this;
    }
  });
  //SUBVIEW RENDERS INDIVIDUAL HIGHSCORES.
  FastFingerz.highscoresView.item = Backbone.View.extend({
  	template: template('highscores'),
  	className: 'highscoreItem',
  	render: function(){
  		 this.$el.html(this.template(this));
      return this;
  	},
  	name: function(){
  		return this.model.name();
  	},
  	score: function(){
  		return this.model.highscore();
  	}
  	
  	
  });
  
  //Router
  FastFingerz.Router = Backbone.Router.extend({
    initialize: function(options) 
    {
      this.el = options.el 
    },
    routes: 
    {
      "": "index"
    },
    //this router instances mulitple views seens i dont want to re render the whole page just diffrent elements. 
    //and i figure out this must be one of the better ways of doing this.
    index: function() {
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
      this.el.append(highscoresView.render().el);
    }
  });
  //My booter starts up my application.
  FastFingerz.boot = function(container) 
  {
    container = $(container);
    var router = new FastFingerz.Router({el: container})
    Backbone.history.start();
  }
})()
