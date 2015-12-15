define(['router', 'backbone'], function (router) {

    return {
        initialize: function() {
            window.app = {
                views: {},
                models: {},
                routers: {},
                utils: {},
                adapters: {}
            };
            document.title = $.i18n.t("default-title");

            window.Vent = _.extend({}, Backbone.Events);
            window.app.router = new router();
            Backbone.history.start();
        }
    };
});
