define(['admin-header', 'server', 'admin-about', 'local-storage', 'sign-in-view', 'home-controller', 'view-loader', 'constants', 'backbone'], function (adminHeader, server, adminAbouView, localStorage, signInView, homeController, viewLoader, constants) {
    var router = Backbone.Router.extend({
        routes: {
            "": "home",
            "admin": "adminHome",
            "admin/signIn": "signIn"
        },

        home: function() {
            homeController.init();
            var template = {
                view_name: "Home",
                template_name: "home",
                path: ""
            };
            viewLoader(template, function() {
                $('#pages-container').html(new app.views.Home().render().$el.i18n());
            });
        },
        adminHome: function() {
            this.adminAbout();
        },
        adminAbout: function () {
            var sessionModel = localStorage.getSession();
            if (null != sessionModel) {
                server.getAdminAbout(sessionModel.session.token, function(data) {
                    adminAbouView.init();
                    viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.ABOUT, function() {
                        adminHeader.init();
                        viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.HEADER, function() {
                            var content = new app.views.AdminAbout({ about_data: data }).render().$el.i18n();
                            content.prepend(new app.views.AdminHeader().render().$el.i18n());
                            $('#pages-container').html(content);
                        });
                    });
                });
            } else {
                window.app.router.navigate("admin/signIn", true);
            }
        },
        signIn: function() {
            signInView.init();
            viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.SIGN_IN, function() {
                $('#pages-container').html(new app.views.SignIn().render().$el.i18n());
            });
        }
    });

    return router;
});