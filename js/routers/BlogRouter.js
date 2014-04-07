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
    	initialize: function(){

    	},
		// Handlers
		home: function(){
			this.navigate("/posts", {trigger: true, replace: true});
		},
		// TODO: remove listview when navigating or reuse
    	showPostsList: function () {
    		console.log("routed to posts list");
			//Set Data       			
			var posts= new PostsCollection();

			//Set View
   			$("#main .col-lg-8").html("<div class='postsList'></div>");
			var postList= new PostsListView({
				el: "#main .col-lg-8 .postsList",
				collection: posts
			});
    	},
    	showPost: function (id) {
    		console.log("routed to post with id " + id);

    		var postModel = new PostModel({id: id});

   			$("#main .col-lg-8").html("<div class='post'></div>");
    		var postView = new PostView({
				el: "#main .col-lg-8 .post",
    			model: postModel
    		}); 

    		// we'll only listen once because we'll navigate elsewhere
    		this.listenToOnce(postView, "postPagination", this.postPagination);
    	},
    	postPagination: function (postId, newer) {
    		// load post collection if we haven't done so, so we'll no the date-order of ids 
    		var self = this;
    		if (this.posts){
    			var arrId = this.posts.pluck('id'),
    				nextPostIdIndex= (newer ? -1 : 1) + _.indexOf(arrId, postId),
    				nextPostId = arrId[nextPostIdIndex];
				self.navigate("/posts/" + (nextPostId || ""), {trigger: true, replace: false});
    		}else{
	    		this.posts = new PostsCollection();
	    		this.posts.once('sync', function(e){
	    			var arrId = this.pluck('id'),
	    				nextPostIdIndex= (newer ? -1 : 1) + _.indexOf(arrId, postId),
	    				nextPostId = arrId[nextPostIdIndex];
					self.navigate("/posts/" + (nextPostId || ""), {trigger: true, replace: false});
	    		});
	    		this.posts.fetch();    			
    		}
    	}

    });
			
   
    return BlogRouter; 
});