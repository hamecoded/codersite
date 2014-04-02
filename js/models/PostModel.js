define(function(require) {
   
    var PostModel = Backbone.Model.extend({
    	defaults: {
    		title: "no title",
    		author: "anonymous",
    		thmbnail: "http://placehold.it/900x300",
    		category: "",
    		date: "30-12-2014",
    		preview: "no preview",
    		content: null
    	}

    });
   
    return PostModel; 
});