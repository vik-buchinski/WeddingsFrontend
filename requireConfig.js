require.config({
    baseUrl: './js',
    paths: {
        jquery: "../lib/jquery-2.1.1.min",
        lodash: "../lib/lodash.min",
        backbone: "../lib/backbone-min",
        i18n: "../lib/i18next.amd.withJQuery-1.8.1.min",
        JST: "../compiled-templates",
        'ckeditor': "../lib/ckeditor/ckeditor",
        'ckjquery': "../lib/ckeditor/adapters/jquery",
        'jquery.form': "../lib/jquery.form",
        'bootstrap': "../lib/bootstrap.min",
        'lazy-load': "../lib/jquery.lazyload",
        'raphael': "../lib/raphael-min",
        'spinners': '../lib/spinners.min',

        'fullscreenImageView': './views/user_part/common/fullscreenImageView',
        'user-header': "./views/user_part/common/headerView",
        'sub-menu': "./views/user_part/common/subMenuView",
        'user-about': "./views/user_part/userAboutView",
        'user-album-images': "./views/user_part/albumImagesView",
        'user-albums-list': "./views/user_part/albumsListView",
        'user-contacts': "./views/user_part/contactsView",
        'admin-header': "./views/admin/headerView",
        'admin-about': "./views/admin/aboutView",
        'admin-album': "./views/admin/albumView",
        'admin-albums-list': "./views/admin/albumsListView",
        'admin-contacts': "./views/admin/contactsView",
        'sign-in-view': "./views/admin/signInView",
        'not-found': "./views/notFoundView",
        'server-error': "./views/serverErrorView",
        server: "./utils/server",
        constants: "./utils/constants",
        common: "./utils/common",
        'local-storage': "./utils/localStorage",
        app: "./app",
        router: "./router",
        'view-loader': "./utils/viewLoader"
    },
    map: {
        "*": {
            "underscore": "lodash"
        }
    },
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'ckjquery': {
            deps: ['jquery', 'ckeditor']
        },
        'bootstrap': {
            'deps': ['jquery']
        },
        'lazy-load': {
            'deps': ['jquery']
        },
        'spinners': {
            deps: ['jquery'],
            exports: 'Spinners'
        }
    },
    waitSeconds: 0
});

require(['constants', 'spinners', 'app', 'i18n', 'JST', 'jquery.form', 'bootstrap', 'lazy-load'], function (constants, Spinners, app) {
	var spinner = Spinners.create($('div.spinner'), {
        radius: 7,
        height: 10,
        width: 1.5,
        dashes: 20,
        opacity: 0.85,
        rotation: 800,
        color: '#000000'
    });

    spinner.center().play();

    $(function () {
        $.i18n.init({
            detectFromHeaders: false,
            lng: constants.APP_LANGUAGE,
            debug: false,
            fallbackLng: false,
            load: 'unspecific',
            ns: 'translation',
            resGetPath: './locales/__ns__-__lng__.json',
            useCookie: false,
            getAsync: false
        });
        app.initialize();
    });
});
