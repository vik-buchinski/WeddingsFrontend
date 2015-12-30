define(
    [
        'server-error', 'user-contacts',
        'not-found',
        'user-albums-list', 'fullscreenImageView',
        'user-album-images',
        'user-header',
        'user-about',
        'server',
        'view-loader', 'constants',
        'backbone'
    ],
    function(
        serverErrorView, userContactsView,
        notFoundView,
        albumsListView, fullscreenImageView,
        albumImagesView,
        userHeader,
        userAbout,
        server,
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

                "serverError": "serverError",
                "*notFound": "notFound",
                "notFound": "notFound"
            },

            notFound: function () {
                window.isContainerLoaded = false;
                notFoundView.init();
                viewLoader(constants.PAGE_TEMPLATES_DATA.NOT_FOUND, function () {
                    $('#pages-container').html(new app.views.NotFound().render().$el.i18n());
                });
            },
            serverError: function () {
                window.isContainerLoaded = false;
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
                        $.i18n.t("user.about.title"),
                        constants.USER_TABS.about,
                        data.title_image_url);
                });
            },
            userBouquets: function() {
                var self = this;
                server.getBouquetsAlbum(function(data) {
                    self.buildView(
                        albumImagesView,
                        constants.PAGE_TEMPLATES_DATA.USER.ALBUM_IMAGES,
                        { data: data },
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
                        $.i18n.t("user." + constants.USER_TABS[albumType.toLowerCase()] + ".title"),
                        constants.USER_TABS[albumType.toLowerCase()]);
                });
            },

            userContacts: function() {
                var self = this;
                var callback = function(data) {
                    self.buildView(
                        userContactsView,
                        constants.PAGE_TEMPLATES_DATA.USER.CONTACTS,
                        { data: data },
                        $.i18n.t("user.contacts.title"),
                        constants.USER_TABS.contacts);
                };
                server.getContactsDescription(callback, callback);
            },

            buildView: function(view, viewLoadData, jsonData, pageName, tabName, titleImageUrl) {

                if (!window.isContainerLoaded) {
                    userHeader.init();
                    viewLoader(constants.PAGE_TEMPLATES_DATA.USER.HEADER, function() {
                        $('#pages-container').html(new app.views.UserHeader({ page_name: pageName, tab_name: tabName, title_img_url: titleImageUrl }).render().$el.i18n());

                        fullscreenImageView.init();
                        new app.views.FullscreenImageView({
                            el: $('.fsbox')
                        }).render();
                        window.isContainerLoaded = true;

                        view.init();
                        viewLoader(viewLoadData, function() {
                            $('section.page .container').html(new app.views[viewLoadData.view_name](jsonData).render().$el.i18n());
                        });
                    });
                } else {
                    $(".fsbox").hide();
                    if ($("body").hasClass("fsbox-active")) {
                        $("body").removeClass("fsbox-active");
                    }

                    //TODO: call this function only when back button clicked!
                    window.Vent.trigger("changeHeaderActiveTab", { tab_name: tabName });

                    if (titleImageUrl) {
                        $("div.parallax-banner").show();
                        $("div.parallax-banner").css("background-image", "url(" + titleImageUrl + ")");
                    } else {
                        $("div.parallax-banner").hide();
                    }

                    view.init();
                    viewLoader(viewLoadData, function() {
                        $('section.page h1.title span').html(pageName);
                        $('section.page .container').html(new app.views[viewLoadData.view_name](jsonData).render().$el.i18n());
                    });
                }

            }
        });

        return router;
    });
