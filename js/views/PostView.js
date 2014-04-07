/**
 * View for a single Post Model
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
   
   	var template = require( "text!templates/post.html");

    var PostView = Backbone.View.extend({
    	template: template,
    	tagName:  'li',
    	className: "post",
    	initialize: function (options) {
    		var summaryView = this.hasOwnProperty("collection");
    		this.model.set("summaryView", summaryView);

    		// in the context of a collection we won't want to re-render the post the postListView has already done so
    		if(!summaryView){
	    		this.listenTo( this.model, "sync", this.render);
	    		this.model.fetch({reset: true});
    		}
    	},
    	render: function() {
    		var rendered = Mustache.to_html(this.template, this.model.toJSON()); 
			this.$el.html(rendered); //detached DOM element
			return this;
		}

    });
   
    return PostView; 
});