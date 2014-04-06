require(["/js/config.js"], function (baseConfig) {
    "use strict";

    // Set the require base configurations
    requirejs.config(baseConfig);


    //common requires to be loaded now that the require paths have been set
    require(["marionette","bootstrap"], function(){

    	//handle ajax loading genericly
	    $(document).ajaxSend(function(event, request, settings) {
		    $('#loading-indicator').show();
		});

		$(document).ajaxComplete(function(event, request, settings) {
		    $('#loading-indicator').hide();
		});

    	//app specific require
		require(["routers/BlogRouter"], function (BlogRouter) {
			new BlogRouter;
			Backbone.history.start({pushState: false});
		});
    });
});