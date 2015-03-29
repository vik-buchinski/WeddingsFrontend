define(["home-controller", 'view-loader', 'backbone'], function (homeController, viewLoader) {
    var router = Backbone.Router.extend({

        routes: {
            "": "home"
        },
        
        home: function () {
            //app.slider.slidePage(new app.views.Home().render().$el);
            homeController.init();
            var template = {
                view_name: "Home",
                template_name: "home",
                path: ""
            };
            viewLoader(template, function () {
                $('#pages-container').html(new app.views.Home().render().$el.i18n());
            });
        }

    });

    return router;
});