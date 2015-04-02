define(['sign-in-view', 'home-controller', 'view-loader', 'constants', 'backbone'], function (signInView, homeController, viewLoader, constants) {
    var router = Backbone.Router.extend({

        routes: {
            "": "home",
            "admin":"signIn",
            "admin/signIn":"signIn"
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
        },
        signIn: function () {
            signInView.init();
            viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.SIGN_IN, function () {
                $('#pages-container').html(new app.views.SignIn().render().$el.i18n());
            });
        }

    });

    return router;
});