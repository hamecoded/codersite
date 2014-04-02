/**
 * The view for a Collection of Posts
 * contains a pager at the bottom of the list
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {

	var PostView= require("views/PostView");
   
    var PostsListView = Backbone.View.extend({
    	initialize: function (options) {
    		this.listenTo( this.collection, "reset", this.render);
    		this.collection.fetch({reset: true});
    	},
    	/**
    	 * subsequently aim for this function to rebuild and override the entire DOM content for that view.
    	 * partial renders need be considered on a case by case basis 
    	 * @return {PostsListView} [description]
    	 */
		render: function () {
			// var $el= this.$el; //starts as a detached DOM element

			/**
			 * The following solution will add each post to the DOM seperatly affecting rendering performance
			 */
			// dust.render("posts",{},function(err,out){
			//     $el.html(out);
			// });
			// this.$el.find(".posts").hide(); //save reflows and repaints
			// this.collection.forEach(this.add, this);
			// this.$el.find(".posts").show();
    		
    		/**
    		 * The following uses the templating engine to render each post as a partial and insert as one bulk to the DOM
    		 * However, no Backbone PostView is created, hence a minimal use of Backbone
    		 */
			// var self= this;
			// dust.render("posts",self.collection.toJSON(),function(err,out){
			//     self.$el.html(out);
			// });

			/**
			 * Fragment DOM insertion with Backbone View initialization
			 * But each post view is not bound to the DOM
			 */
			this.$el.find(".posts").empty();
			var fragment= $("<ul>").addClass("posts");
			this.collection.forEach( function (post, index, arr) {
				var postView = new PostView({
					model: post,
					collection : this.collection
				});
				postView.render();
				fragment.append(postView.el);
				return postView;
			}, this);

			//TODO
			// var pagingView= new PagingComponentView({

			// });
			// fragment.append(pagingView.el)
			this.$el.html(fragment); //html instead of append will switch the entire content for that view container


			return this;
		},
		/**
		 * receives a single post model; creates a view for it; renders it; and append to the DOM
		 * @param {PostModel} post 
		 * @param {number} index optional used in a forEach callback
		 * @param {Array}  arr   optional used in a forEach callback
		 */
		add: function (post, index, arr) {
			var postView = new PostView({
				model: post,
				collection : this.collection
			});
			postView.render();
			this.$el.find(".posts").append(postView.el);
			return postView;
		}

    });
   
    return PostsListView; 
});