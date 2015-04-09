define(['admin-about', 'local-storage', 'sign-in-view', 'home-controller', 'view-loader', 'constants', 'backbone'], function (adminAbouView, localStorage, signInView, homeController, viewLoader, constants) {
    var router = Backbone.Router.extend({

        routes: {
            "": "home",
            "admin": "adminHome",
            "admin/signIn": "signIn"
        },

        home: function () {
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
        adminHome: function () {
            //if (null != localStorage.getSession()) {
                adminAbouView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.ABOUT, function () {
                    $('#pages-container').html(new app.views.AdminAbout().render().$el.i18n());
                });
            /*} else {
                window.app.router.navigate("admin/signIn", true);
            }*/
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