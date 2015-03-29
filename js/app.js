define(['router', 'backbone'], function (router) {

    return {
        initialize: function () {
            window.app = {
                views: {},
                models: {},
                routers: {},
                utils: {},
                adapters: {}
            };

            window.app.router = new router();
            Backbone.history.start();
        }
    };
});
