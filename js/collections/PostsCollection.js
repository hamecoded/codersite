/**
 * A Collection of Post Models
 * @param  Object require add dependencies
 * @return Object         Class Object
 */
define(function(require) {
   
   	var PostModel= require("models/PostModel");

    var PostsCollection = Backbone.Collection.extend({
    	model: PostModel,
    	//comparator: "date",  //http://backbonejs.org/#Collection-comparator
    	url: "http://blog4.apiary.io/posts"
    	

    });
   
    return PostsCollection; 
});