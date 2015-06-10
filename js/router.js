﻿define(['user-header', 'user-about', 'admin-header', 'server', 'admin-about', 'local-storage', 'sign-in-view', 'view-loader', 'constants', 'backbone'], function (userHeader, userAbout, adminHeader, server, adminAbouView, localStorage, signInView, viewLoader, constants) {
    var router = Backbone.Router.extend({
        routes: {
            "": "home",
            "home": "home",
            "about": "userAbout",
            "admin": "adminHome",
            "admin/signIn": "signIn"
        },

        home: function() {
            this.userAbout();
        },
        adminHome: function() {
            this.adminAbout();
        },
        adminAbout: function() {
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
        },
        userAbout: function() {
            server.getUserAbout(function(data) {
                userHeader.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.USER.HEADER, function() {
                    $('#pages-container').html(new app.views.UserHeader({ page_name: $.i18n.t("user.about.title"), tab_name: constants.USER_TABS.about }).render().$el.i18n());
                    userAbout.init();
                    viewLoader(constants.PAGE_TEMPLATES_DATA.USER.ABOUT, function() {
                        $('section.page .container').html(new app.views.UserAbout({ data: data }).render().$el.i18n());
                    });
                });
            });
        }
    });

    return router;
});
