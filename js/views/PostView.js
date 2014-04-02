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
    	render: function() {
    		var $el= this.$el; //detached DOM element
			dust.render("post",this.model.toJSON(),function(err,out){
			    $el.html(out);
			});
			return this;
		},
		testDomViewWiring: function () {
			alert(this.model.get('title'));
		}

    });
   
    return PostView; 
});