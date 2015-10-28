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
        'lazy-load': "../node_modules/jquery-lazyload/jquery.lazyload",
        'raphael': "../lib/raphael-min",
        'spinners': '../lib/spinners.min',

        'fullscreenImageView': './views/user_part/common/fullscreenImageView',
        'user-title': "./views/user_part/common/titleView",
        'user-header': "./views/user_part/common/headerView",
        'sub-menu': "./views/user_part/common/subMenuView",
        'user-about': "./views/user_part/userAboutView",
        'user-album-images': "./views/user_part/albumImagesView",
        'user-albums-list': "./views/user_part/albumsListView",
        'admin-header': "./views/admin/headerView",
        'admin-about': "./views/admin/aboutView",
        'admin-album': "./views/admin/albumView",
        'admin-albums-list': "./views/admin/albumsListView",
        'sign-in-view': "./views/admin/signInView",
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

require(['spinners', 'app', 'i18n', 'JST', 'jquery.form', 'bootstrap', 'lazy-load'], function(Spinners, app) {
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
            lng: 'ru',
            debug: false,
            fallbackLng: false,
            load: 'unspecific',
            ns: 'translation',
            resGetPath: 'locales/__ns__-__lng__.json',
            useCookie: false,
            getAsync: false
        });
        app.initialize();
    });
});
