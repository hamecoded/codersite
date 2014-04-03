/**
 * App Router
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
   
    var BlogRouter = Backbone.Router.extend({
    	routes: {
    		"": "showPostsList",
    		"posts": "showPostsList",
    		"posts/:id": "showPost"
    	},
		initialize: function(options){

		},
		execute: function(callback, args) {
		 	Backbone.Router.prototype.execute.call(this,callback, args);
		},
		// Handlers
    	showPostsList: function () {
    		require([
				"collections/PostsCollection", "models/PostModel",
				"views/PostsListView", "text!templates/post.dust", "text!templates/posts.dust"
			], function (PostsCollection, PostModel, PostsListView, postTmpl, postsTmpl) {
				//preload post related templates 
				var compiled = dust.compile(postTmpl, "post");
				dust.loadSource(compiled);
						
				compiled = dust.compile(postsTmpl, "posts");
				dust.loadSource(compiled);
						
				//Set Data       			
				var posts= new PostsCollection();

				//Set View
				var postList= new PostsListView({
					el: ".container .row .col-lg-8",
					collection: posts
				});
       		});
    	},
    	showPost: function (id) {
    		console.log("routed to post with id " + id);

    	}

    });
   
    return BlogRouter; 
});