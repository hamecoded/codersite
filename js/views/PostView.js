/**
 * View for a single Post Model
 * Author: Oded Sagir
 * @param  Object require for adding dependencies
 * @return Object         Class Object
 */		
define(function(require) {
   
   	

    var PostView = Backbone.View.extend({
    	tagName:  'li',
    	className: "post",
    	events: {
    		"click *": "testDomViewWiring"
    	},
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
    		var self= this; 
			dust.render("post",this.model.toJSON(),function(err,out){
			    self.$el.html(out); //detached DOM element
			});
			return this;
		},
		testDomViewWiring: function () {
			//alert(this.model.get('title'));
		}

    });
   
    return PostView; 
});