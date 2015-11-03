define(
    [
        'admin-contacts',
        'server-error', 'user-contacts',
        'not-found', 'admin-albums-list',
        'user-albums-list', 'fullscreenImageView',
        'user-title', 'user-album-images',
        'admin-album', 'user-header',
        'user-about', 'admin-header',
        'server', 'admin-about',
        'local-storage', 'sign-in-view',
        'view-loader', 'constants',
        'backbone'
    ],
    function(
        adminContactsView,
        serverErrorView, userContactsView,
        notFoundView, adminAlbumsListView,
        albumsListView, fullscreenImageView,
        Title, albumImagesView,
        adminAlbumView, userHeader,
        userAbout, adminHeader,
        server, adminAbouView,
        localStorage, signInView,
        viewLoader, constants) {
        var router = Backbone.Router.extend({
            routes: {
                "": "userHome",
                "home": "userHome",
                "about": "userAbout",
                "bouquets": "userBouquets",
                "albums/:albumType": "userAlbumsList",
                "album/:albumId": "userAlbum",
                "contacts": "userContacts",

                "admin": "adminHome",
                "admin/signIn": "signIn",
                "admin/bouquets": "adminBouquets",
                "admin/albums/:albumType": "adminAlbumsList",
                "admin/album/:albumId": "adminAlbum",
                "admin/contacts": "adminContacts",
                
                "serverError": "serverError",
                "*notFound": "notFound",
                "notFound": "notFound"
            },
            
            notFound: function () {
                window.isAdminPart = false;
                window.isUserPart = false;
                notFoundView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.NOT_FOUND, function () {
                    $('#pages-container').html(new app.views.NotFound().render().$el.i18n());
                });
            },
            serverError: function () {
                window.isAdminPart = false;
                window.isUserPart = false;
                serverErrorView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.SERVER_ERROR, function () {
                    $('#pages-container').html(new app.views.ServerError().render().$el.i18n());
                });
            },
            
            userHome: function() {
                this.userAbout();
            },
            userAbout: function() {
                var self = this;
                server.getUserAbout(function(data) {
                    self.buildView(
                        userAbout,
                        constants.PAGE_TEMPLATES_DATA.USER.ABOUT,
                        { data: data },
                        true,
                        false,
                        $.i18n.t("user.about.title"),
                        constants.USER_TABS.about);
                });
            },
            userBouquets: function() {
                var self = this;
                server.getBouquetsAlbum(function(data) {
                    self.buildView(
                        albumImagesView,
                        constants.PAGE_TEMPLATES_DATA.USER.ALBUM_IMAGES,
                        { data: data },
                        true,
                        false,
                        $.i18n.t("user.bouquets.title"),
                        constants.USER_TABS.bouquets);
                });
            },
            userAlbum: function(albumId) {
                var self = this;
                server.getAlbumById(albumId, function(data) {
                    self.buildView(
                        albumImagesView,
                        constants.PAGE_TEMPLATES_DATA.USER.ALBUM_IMAGES,
                        { data: data },
                        true,
                        false,
                        $.i18n.t("user." + constants.USER_TABS[data.album_type.toLowerCase()] + ".title"),
                        constants.USER_TABS[data.album_type.toLowerCase()]);
                });
            },
            userAlbumsList: function(albumType) {
                if (!constants.ALBUM_TYPES[albumType.toLowerCase()]) {
                    alert($.i18n.t("album-type-missing-message"));
                    return false;
                }

                var self = this;
                server.getAlbumByType(albumType, function(data) {
                    self.buildView(
                        albumsListView,
                        constants.PAGE_TEMPLATES_DATA.USER.ALBUMS_LIST,
                        { data: data },
                        true,
                        false,
                        $.i18n.t("user." + constants.USER_TABS[albumType.toLowerCase()] + ".title"),
                        constants.USER_TABS[albumType.toLowerCase()]);
                });
            },
            
            userContacts: function() {
                var self = this;
                //server.getAlbumByType(albumType, function (data) {
                    self.buildView(
                        userContactsView,
                        constants.PAGE_TEMPLATES_DATA.USER.CONTACTS,
                        { data: null },
                        true,
                        false,
                        $.i18n.t("user.contacts.title"),
                        constants.USER_TABS.CONTACTS);
                //});
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
                            { about_data: data },
                            false,
                            true);
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
                            },
                            false,
                            true);
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
                            },
                            false,
                            true);
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
                            },
                            false,
                            true);
                    });
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },
            adminContacts: function() {
                var sessionModel = localStorage.getSession();
                if (null != sessionModel) {
                    var self = this;
                    //server.getAdminBouquetsImages(sessionModel.session.token, function(data) {
                        self.buildView(
                            adminContactsView,
                            constants.PAGE_TEMPLATES_DATA.ADMIN.CONTACTS,
                            {
                                contacts_data: null,
                                title: $.i18n.t("admin.contacts-page.page-title"),
                                selected_page: constants.LEFT_PANELS.contacts
                            },
                            false,
                            true);
                    //});
                } else {
                    window.app.router.navigate("admin/signIn", true);
                }
            },

            buildView: function(view, viewLoadData, jsonData, isUserPart, isAdminPart, pageName, tabName) {

                if (window.isUserPart != isUserPart && isUserPart) {
                    userHeader.init();
                    viewLoader(constants.PAGE_TEMPLATES_DATA.USER.HEADER, function() {
                        $('#pages-container').html(new app.views.UserHeader({ page_name: pageName, tab_name: tabName }).render().$el.i18n());
                        if ($('section.page h1.title').length) {
                            var t = new Title({
                                el: $('section.page h1.title')
                            });
                            t.render(false);
                        }

                        fullscreenImageView.init();
                        new app.views.FullscreenImageView({
                            el: $('.fsbox')
                        }).render();

                        //setTimeout(function() {
                            view.init();
                            viewLoader(viewLoadData, function() {
                                $('section.page .container').html(new app.views[viewLoadData.view_name](jsonData).render().$el.i18n());
                            });
                        //}, 100);
                    });
                } else if (window.isUserPart == isUserPart && isUserPart) {
                    $(".fsbox").hide();
                    if ($("body").hasClass("fsbox-active")) {
                        $("body").removeClass("fsbox-active");
                    }
                    
                    //TODO: call this function only when back button clicked!
                    window.Vent.trigger("changeHeaderActiveTab", { tab_name: tabName });

                    view.init();
                    viewLoader(viewLoadData, function() {
                        $('section.page h1.title span').html(pageName);
                        if ($('section.page h1.title').length) {
                            var t = new Title({
                                el: $('section.page h1.title')
                            });
                            t.render(true);
                        }
                        $('section.page .container').html(new app.views[viewLoadData.view_name](jsonData).render().$el.i18n());
                    });
                }


                if (isAdminPart) {
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
                window.isAdminPart = isAdminPart;
                window.isUserPart = isUserPart;
            }
        });

        return router;
    });
