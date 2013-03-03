/**
 * @author Anthony Dry
 * @class my Configuration and init my application.
 * @param {string} shim Sets dependencies for my not amd libs. such ass backbone underscore ande mustache. 
 */

requirejs.config({
	paths:{
		"jquery": "lib/jquery",
		"backbone": "lib/backbone",
		"backbone.localstorage": "lib/backbone-localstorage",
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
		'backbone.localstorage':{
			deps:['backbone'],
			exports:'Backbone'
		}
	},
});

//Loads my application to start making stuff happen.
require(['app',],function(App){
  App.initialize();
});
