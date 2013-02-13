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
	FastFingerz.Timer = Backbone.Model.extend({
		defaults:
		{
			"time": "00:00:00",
			"error":"!ERROR! "
		},
		StartTimer:function()
		{
			var milliSeconds = 0;
			var seconds = 0;
			var minutes = 0;
			var interval = setInterval(function(){
			milliSeconds++;
			if(milliSeconds >= 100)
			{
				seconds++;
				milliSeconds = 0;
				if(seconds >= 60)
				{
					seconds = 0;
					minutes++;
					if(minutes >= 100)
					{
						//TODO: implement something smart.
						minutes = 99;
					}
				}
			}
			this.set('time', minutes+':'+seconds+':'+milliseconds);	
			},10);
			
		},
		time: ""
	});
	
	//My container view i guess this view will render thruout my application and init other sub views.
  FastFingerz.Index = Backbone.View.extend({
    template: template('index'),
    model: new FastFingerz.HelloWorld(),
    
    render: function() {
      this.$el.html(this.template(this));
      var UItimer = new FastFingerz.Index.Timer();
      this.$('#time_container').append(UItimer.render().el);
      return this;
    },
    name: function() {
      return this.model.name();
    }
  });
  //View for the timer which instances a new model with keep track of the time. and render it.
  FastFingerz.Index.Timer = Backbone.View.extend({
  	template: template("timer"),
  	model: new FastFingerz.Timer(),
  	initialize: function(){
    _.bindAll(this, "render");
    this.model.bind('all', this.render, this);
    this.model.StartTimer();
  },
  	render:function(){
  		this.$el.html(this.template(this));
  		return this;
  	},
  	time:function()
  	{
  		return this.model.get('time');
  	}
  });
  
  
  FastFingerz.Router = Backbone.Router.extend({
    initialize: function(options) {
      this.el = options.el
    },
    routes: {
      "": "index"
    },
    index: function() {
      var view = new FastFingerz.Index();
      this.el.empty();
      this.el.append(view.render().el);
    }
  });

  FastFingerz.boot = function(container) {
    container = $(container);
    var router = new FastFingerz.Router({el: container})
    Backbone.history.start();
  }
})()
