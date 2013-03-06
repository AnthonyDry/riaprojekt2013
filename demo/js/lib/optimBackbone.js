/**
 * @author Anthony Dry
 */

define(["backbonePure","backbone.localstorage"],function(BB){
	console.log(".....serving up backbone");
	Backbone.noConflict(); // remove the global backbone left by purebackbone, just to be nice :)
	return BB; //.noConflict();
});
