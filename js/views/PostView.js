/**
 * View for a single Post Model
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
    "use strict";

   	var template = require( "text!templates/post.html");

    var PostView = Backbone.View.extend({
    	template: template,
    	tagName:  "li", //overriden when el selector is passed to constructor
    	className: "post",
    	events: {
    		"click .pager li": "paginatePost"
    	},
    	initialize: function (options) {
    		var summaryView = this.hasOwnProperty("collection");
    		this.model.set("summaryView", summaryView);

    		// in the context of a collection we won't want to re-render the post the
    		//  postListView render is incharge of that so this if will be skipped
    		// summaryView - is when the post is as part of a list, rendering it differently
    		if(!summaryView){
	    		this.listenTo( this.model, "sync", this.render);
	    		this.model.fetch({reset: true, error: function(e){
	    			//handle net::ERR_INTERNET_DISCONNECTED
	    			$("#main .col-lg-8").html("<h1>Failed fetching post<br>try later</h1>");
	    		}}); 
    		}
    	},
    	render: function() {
    		var rendered = Mustache.to_html(this.template, this.model.toJSON()); 
			this.$el.html(rendered); //detached DOM element
			return this;
		},
		// Handlers
		paginatePost: function (e) {
			e.preventDefault();
			this.remove();

			var newer = $(e.currentTarget).index() === 1;
			this.trigger("postPagination", this.model.id, newer);
		}

    });
   
    return PostView; 
});