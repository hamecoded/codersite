require(["js/config"], function (baseConfig) {
    "use strict";

    // Set the require base configurations
    requirejs.config(baseConfig);

    //common requires to be loaded now that the require paths have been set
    require(["marionette","bootstrap"], function(){
    	//app specific require
		require([
			"collections/PostsCollection", "models/PostModel",
			"views/PostsListView"
			], function (PostsCollection, PostModel, PostsListView) {
       		
       		require(["text!templates/post.dust", "text!templates/posts.dust"], function(postTmpl, postsTmpl){
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


		   
		});
    });
});