/**
 * @author Anthony Dry
 */

requirejs.config({
	paths:{
		"jquery": "lib/jquery",
		"backbone": "lib/backbone",
		"localstorage": "lib/backbone-localstorage",
		"underscore": "lib/underscore",
		"mustache" : "lib/mustache"	
	},
	shim:{
		
		'mustache':{
			deps:[],
			exports: 'Mustache'
		},
		'underscore':{
			deps: [],
			exports: '_'
		},
		'backbone':{
			deps:['underscore', 'jquery'],
			exports:'Backbone'
		},
		'localstorage':{
			deps:['backbone'],
			exports:'Backbone'
		}
	},
});

//Loads my application to start making stuff happen.
require(['app',],function(App){
  App.initialize();
});
