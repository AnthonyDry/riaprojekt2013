/**
 * @author Anthony Dry
 * @class my Configuration and init my application.
 * @param {string} shim Sets dependencies for my not amd libs. such ass backbone underscore ande mustache. 
 */

requirejs.config({
	paths:{
		jquery: "lib/jquery",
		underscore: "lib/underscore",
		backbonePure: "lib/backbone",
		"backbone.localstorage": "lib/backbone.localStorage-min",
		mustache : "lib/mustache",
		backbone: 'lib/optimBackbone'
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
		'backbonePure':{
			deps:['underscore', 'jquery'],
			exports:'Backbone'
		},
		'backbone.localstorage':['backbonePure', 'underscore'],
	},
});

//Loads my application to start making stuff happen.
require(['router',],function(App){
  new App;
});
