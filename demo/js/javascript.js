//initzlising my global object 
(function() {
  var FastFingerz = {};
  window.FastFingerz = FastFingerz;
	
	//help function for getting relative template from Mustache.
  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };


  FastFingerz.Storeage = Backbone.Collection.extend({
    localStorage: new Store("mystore")
  });

	//the worst model in the history of human kind it will change tho! :)
	FastFingerz.HelloWorld = Backbone.Model.extend({
		name: function(){ return "&nbsp;Fast Fingerz";}
	});
	
	// model for keeping track of the time.
	FastFingerz.Game = Backbone.Model.extend({
		initialize: function(){
		//_.bindAll(this, 'UpdateTimer' 'name' 'm' 's' 'ms');
		
		},
		Buttons: function(){
			return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
		},
		
		UpdateTimer: function(){
			
			setInterval(this.onTick.bind(this),10);
		},
		//this code needs to be fixed it looks terrible.
		onTick:function(){
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
		},
		NewRandomNumber:function()
		{
			
			return Math.floor((Math.random()*24)+0);
		},
		
		
		
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
  
  FastFingerz.GameAreaView = Backbone.View.extend({
  	template: template("game"),
  	initialize: function(){
	  	_.bindAll(this)
	    this.model.on('change', this.render, this);
	  },
  	render:function(){
  		this.$el.html(this.template(this));
  		return this;
  	},
  	thepad:function()
  	{
  		var arr = this.model.Buttons();
  		var random = this.model.NewRandomNumber();
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
  		return val;
  	},
  
  });
  
  FastFingerz.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
      
    },
    
    routes: {
      "": "index"
    },
    //this router instances mulitple views seens i dont want to re render the whole page just diffrent elements. and i figure out this must be one of the better ways of doing this.
    index: function() {
      var logo = new FastFingerz.Index();
      var gameModel =  new FastFingerz.Game();
      var counter = new FastFingerz.TimerView({model: gameModel});
      var gameArea = new FastFingerz.GameAreaView({model: gameModel});
      this.el.empty();
      this.el.append(logo.render().el);
      this.el.append(counter.render().el);
      this.el.append(gameArea.render().el);
    }
  });

  FastFingerz.boot = function(container) {
    container = $(container);
    var router = new FastFingerz.Router({el: container})
    Backbone.history.start();
  }
})()
