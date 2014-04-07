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
			window.router = new BlogRouter;
			Backbone.history.start({pushState: true});

			/**
			 * incase the Browser supports pushState then disable anchors-inks default browser server-calls
			 * so they'll be handled on the client side only.
			 * http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
			 * https://gist.github.com/tbranyen/1142129
			 * @param  {[type]} evt [description]
			 * @return {[type]}     [description]
			 */
			if (Backbone.history && Backbone.history._hasPushState) {
				$(document).on('click', 'a:not([data-bypass])', function (evt) {
					var href = $(this).attr('href');
					var protocol = this.protocol + '//';
					//TODO: replace hash calls with absolute path
					if (href.slice(protocol.length) !== protocol) {
					  evt.preventDefault();
					  router.navigate(href, true);
					}
				});
			}    

		});
    	
    });
});