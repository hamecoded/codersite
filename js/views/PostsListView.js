/**
 * The view for a Collection of Posts
 * contains a pager at the bottom of the list
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {

	var PostView= require("views/PostView");  //http://requirejs.org/docs/1.0/docs/api.html#modulenotes-console
    var template = require( "text!templates/posts.html");

    var PostsListView = Backbone.View.extend({
    	template: template,
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
			// DOM insert the ListView template
			var rendered = Mustache.to_html(this.template, {}); 
			this.$el.html(rendered); //detached DOM element
			
			// DOM insert each post item
			this.$el.find(".posts").hide(); //save reflows and repaints
			this.collection.forEach(this.add, this);
			this.$el.find(".posts").show();

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