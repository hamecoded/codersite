/**
 * App Router
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(["require", 
	"models/PostModel", "views/PostView", 
	"collections/PostsCollection", "views/PostsListView"], 
	function (require, 
		PostModel, PostView, 
		PostsCollection,  PostsListView ) {
   
	
    var BlogRouter = Backbone.Router.extend({
    	routes: {
    		"": "home",
    		"posts(/)": "showPostsList",
    		"posts/:id": "showPost"
    	},
		// Handlers
		home: function(){
			this.navigate("/posts", {trigger: true, replace: true});
		},
    	showPostsList: function () {
    		console.log("routed to posts list");
			//Set Data       			
			var posts= new PostsCollection();

			//Set View
			var postList= new PostsListView({
				el: ".container .row .col-lg-8",
				collection: posts
			});
    	},
    	showPost: function (id) {
    		console.log("routed to post with id " + id);

    		var postModel = new PostModel({id: id});

    		var postView = new PostView({
				el: ".container .row .col-lg-8",
    			model: postModel
    		}); 
    	}

    });
			
   
    return BlogRouter; 
});