define(
    [
        'admin-contacts', 'server-error',
        'not-found', 'admin-albums-list',
        'admin-album', 'admin-header',
        'server', 'admin-about',
        'local-storage', 'sign-in-view',
        'view-loader', 'constants',
        'backbone'
    ],
    function (
        adminContactsView, serverErrorView,
        notFoundView, adminAlbumsListView,
        adminAlbumView, adminHeader,
        server, adminAbouView,
        localStorage, signInView,
        viewLoader, constants) {
        var router = Backbone.Router.extend({
            routes: {

                "": "adminHome",
                "signIn": "signIn",
                "bouquets": "adminBouquets",
                "albums/:albumType": "adminAlbumsList",
                "album/:albumId": "adminAlbum",
                "contacts": "adminContacts",

                "serverError": "serverError",
                "*notFound": "notFound",
                "notFound": "notFound"
            },

            notFound: function () {
                notFoundView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.NOT_FOUND, function () {
                    $('#pages-container').html(new app.views.NotFound().render().$el.i18n());
                });
            },
            serverError: function () {
                serverErrorView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.SERVER_ERROR, function () {
                    $('#pages-container').html(new app.views.ServerError().render().$el.i18n());
                });
            },

            signIn: function() {
                signInView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.SIGN_IN, function() {
                    $('#pages-container').html(new app.views.SignIn().render().$el.i18n());
                });
            },
            adminHome: function() {
                this.adminAbout();
            },
            adminAbout: function() {
                var sessionModel = localStorage.getSession();
                if (null != sessionModel) {
                    var self = this;
                    server.getAdminAbout(sessionModel.session.token, function(data) {
                        self.buildView(
                            adminAbouView,
                            constants.PAGE_TEMPLATES_DATA.ADMIN.ABOUT,
                            { about_data: data });
                    });
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },
            adminBouquets: function() {
                var sessionModel = localStorage.getSession();
                if (null != sessionModel) {
                    var self = this;
                    server.getAdminBouquetsImages(sessionModel.session.token, function(data) {
                        self.buildView(
                            adminAlbumView,
                            constants.PAGE_TEMPLATES_DATA.ADMIN.ALBUM,
                            {
                                album_data: data,
                                title: $.i18n.t("admin.bouquets-page.page-title"),
                                selected_page: constants.LEFT_PANELS.bouquets
                            });
                    });
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },
            adminAlbumsList: function(albumType) {
                var sessionModel = localStorage.getSession();
                if (null != sessionModel) {
                    var self = this;

                    if (!constants.ALBUM_TYPES[albumType.toLowerCase()]) {
                        alert($.i18n.t("album-type-missing-message"));
                        return false;
                    }

                    server.getAdminAlbumsList(sessionModel.session.token, albumType, function(data) {
                        self.buildView(
                            adminAlbumsListView,
                            constants.PAGE_TEMPLATES_DATA.ADMIN.ALBUMS_LIST,
                            {
                                album_data: data,
                                title: $.i18n.t("admin." + constants.LEFT_PANELS[albumType.toLowerCase()] + ".page-title"),
                                album_type: constants.LEFT_PANELS[albumType.toLowerCase()]
                            });
                    });
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },
            adminAlbum: function(albumId) {
                var sessionModel = localStorage.getSession();
                if (null != sessionModel) {
                    var self = this;
                    server.getAdminAlbumById(sessionModel.session.token, albumId, function(data) {
                        var title = null, selectedPage = null;
                        if (data.album_type) {
                            data.album_type = data.album_type.toLowerCase();
                            title = $.i18n.t("admin." + data.album_type + ".page-title");
                            selectedPage = constants.LEFT_PANELS[data.album_type];
                        }
                        self.buildView(
                            adminAlbumView,
                            constants.PAGE_TEMPLATES_DATA.ADMIN.ALBUM,
                            {
                                album_data: data,
                                title: title,
                                selected_page: selectedPage
                            });
                    });
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },
            adminContacts: function() {
                var sessionModel = localStorage.getSession();
                if (null != sessionModel) {
                    var self = this;
                    server.getContactsDescription(function (data) {
                        self.buildView(
                            adminContactsView,
                            constants.PAGE_TEMPLATES_DATA.ADMIN.CONTACTS,
                            {
                                data: data,
                                title: $.i18n.t("admin.contacts-page.page-title"),
                                selected_page: constants.LEFT_PANELS.contacts
                            });
                    });
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },

            buildView: function(view, viewLoadData, jsonData, pageName, tabName, titleImageUrl) {
                view.init();
                viewLoader(viewLoadData, function() {
                    adminHeader.init();
                    viewLoader(constants.PAGE_TEMPLATES_DATA.ADMIN.HEADER, function() {
                        var viewObject = new app.views[viewLoadData.view_name](jsonData).render().$el.i18n();
                        viewObject.prepend(new app.views.AdminHeader().render().$el.i18n());
                        $('#pages-container').html(viewObject);
                    });
                });
            }
        });

        return router;
    });
