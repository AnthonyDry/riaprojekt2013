//initzlising my global object 
(function() {
  var FastFingerz = {};
  window.FastFingerz = FastFingerz;
	
	//help function for getting relative template from Mustache.
  var template = function(name) {
    return Mustache.compile($('#'+name+'-template').html());
  };

 /*
   FastFingerz.Recipe = Backbone.Model.extend({
  });
  FastFingerz.Storeage = Backbone.Collection.extend({
    localStorage: new Store("rmystore")
  });
*/
	//the worst model in the history of human kind it will change tho! :)
	FastFingerz.HelloWorld = Backbone.Model.extend({
		name: function(){ return "helloworld";}
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
