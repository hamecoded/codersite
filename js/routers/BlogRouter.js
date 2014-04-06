/**
 * App Router
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(["require", 
	"models/PostModel", "views/PostView", "text!templates/post.dust", 
	"collections/PostsCollection", "views/PostsListView", "text!templates/posts.dust"], 
	function (require, 
		PostModel, PostView, postTmpl, 
		PostsCollection,  PostsListView, postsTmpl) {
   
	//preload post related templates 
	var compiled = dust.compile(postTmpl, "post");
	dust.loadSource(compiled);
			
	compiled = dust.compile(postsTmpl, "posts");
	dust.loadSource(compiled);

    var BlogRouter = Backbone.Router.extend({
    	routes: {
    		"": "home",
    		"posts(/)": "showPostsList",
    		"posts/:id": "showPost"
    	},
		initialize: function(options){

		},
		execute: function(callback, args) {
		 	Backbone.Router.prototype.execute.call(this,callback, args);
		},
		// Handlers
		home: function(){
			this.navigate("/posts", {trigger: true});
		},
    	showPostsList: function () {
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