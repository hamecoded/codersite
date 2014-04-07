/**
 * A Collection of Post Models
 * @param  Object require add dependencies
 * @return Object         Class Object
 */
define(function(require) {
   
   	var PostModel= require("models/PostModel");

    var PostsCollection = Backbone.Collection.extend({
    	model: PostModel,
    	comparator: function(p1, p2){	//[M,D,Y]
    		var y = 2, m = 0, d = 1,
    			d1 = p1.get('date').split('-'),
    			d2 = p2.get('date').split('-'),
    			date1 = new Date(+d1[y], +d1[m]-1, +d1[d]),
    		    date2 = new Date(+d2[y], +d2[m]-1, +d2[d]);
    		return date2.valueOf() > date1.valueOf();
    	},  
    	url: "http://blog4.apiary.io/posts"
    	

    });
   
    return PostsCollection; 
});