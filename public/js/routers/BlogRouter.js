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
    "use strict";
	
    var BlogRouter = Backbone.Router.extend({
    	// reuse postlist collection and view while navigating
    	// unlike removing a single post view when paginating
    	posts: null, //PostsCollection
    	postsList: null, //PostsListView
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
    	showPostsList: function () {
    		console.log("routed to posts list");
			//Set Data   
			if (!this.posts) {
				this.posts= new PostsCollection();
			}    			

			//Set View
   			$("#main .col-lg-8").html("<div class='postsList'></div>");
			if (!this.postsList) {
				this.postsList= new PostsListView({
					el: "#main .col-lg-8 .postsList",
					collection: this.posts
				});				
			}else{
				// before rerendering the PostsListView we need first to reassociate
				// it with an existing DOM element
				this.postsList
					.setElement("#main .col-lg-8 .postsList")
					.render();
			}
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
    		this.listenToOnce(postView, "postPagination", this._postPagination);
    	},
    	/**
    	 * will be called upon paginating to a newer or older post
    	 * the function will perform navigation to the next post url (be it newer or older)
    	 * @param  {string} postId currently displayed post id
    	 * @param  {boolean} newer  whether to display an older or newer post
    	 */
    	_postPagination: function (postId, newer) {
    		var self = this;
    		if (this.posts){
    			this._navigateToNextPost(postId, newer);
    		}else{
	    		// load post collection if we haven't done so, so we'll no the date-order of ids to be able to paginate between posts
	    		this.posts = new PostsCollection();
	    		this.posts.once('sync', function(e){
	    			self._navigateToNextPost(postId, newer);
	    		});
	    		this.posts.fetch();    			
    		}
    	},
    	/**
    	 * plucks the sorted collection for ids only and find the next post id and trigger navigation
    	 * @param  {[type]} postId [description]
    	 * @param  {[type]} newer  [description]
    	 * @return {[type]}        [description]
    	 */
    	_navigateToNextPost: function (postId, newer){
			var arrOfIds = this.posts.pluck('id'),
				nextPostIdIndex= (newer ? -1 : 1) + _.indexOf(arrOfIds, postId),
				nextPostId = arrOfIds[nextPostIdIndex];
			this.navigate("/posts/" + (nextPostId || ""), {trigger: true, replace: false});
    	}

    });
			
   
    return BlogRouter; 
});