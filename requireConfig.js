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

        'user-title': "./views/user_part/common/titleView",
        'user-header': "./views/user_part/common/headerView",
        'sub-menu': "./views/user_part/common/subMenuView",
        'user-about': "./views/user_part/userAboutView",
        'user-bouquets': "./views/user_part/userBouquetsView",
        'admin-header': "./views/admin/headerView",
        'admin-about': "./views/admin/aboutView",
        'admin-bouquets': "./views/admin/bouquetsView",
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
        }
    },
    waitSeconds: 0
});

require(['app', 'i18n', 'JST', 'jquery.form', 'bootstrap'], function(app) {
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
