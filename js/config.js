define({
    paths:{
        // Libraries
        // ---------
        "vendor":"bower_components",
        "underscore":"bower_components/underscore/underscore",
        "dust":"bower_components/dustjs-linkedin/dist/dust-full",
        "jquery":"bower_components/jquery/dist/jquery",
        "backbone":"bower_components/backbone/backbone",
        "backbone.wreqr":"bower_components/backbone.wreqr/lib/backbone.wreqr",
        "backbone.babysitter":"bower_components/backbone.babysitter/lib/backbone.babysitter",
        "marionette":"bower_components/marionette/lib/backbone.marionette",
        "bootstrap":"bower_components/bootstrap/dist/js/bootstrap",

        // Require Modules to be used as pragmas
        // ---------
        "text": "bower_components/requirejs-text/text",

        // Backbone Folder Structure
        // -------------------
        "models":"js/models",
        "collections":"js/collections",
        "routers":"js/routers",
        "views":"js/views",
        "templates":"templates",
    },
    shim:{
        "dust":{
            "exports":"dust"
        },
        "underscore":{
            // Exports the global window._ object
            "exports":"_"
        },
        "jquery":{
            "exports":"$"
        },
        "backbone":{
            "exports":"Backbone",
            "deps":[
                "underscore",
                "dust"
            ]
        },
        "backbone.wreqr":{
            "deps": ["backbone"]
        },
        "backbone.babysitter":{
            "deps": ["backbone"]
        },
        "marionette":{
            "exports":"Marionette",
            "deps":[
                "backbone",
                "backbone.wreqr",
                "backbone.babysitter"
            ]
        },
        "bootstrap":{
            "deps":["jquery"]
        }

    }
});