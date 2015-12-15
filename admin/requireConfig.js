require.config({
    baseUrl: './js',
    paths: {
        jquery: "../../lib/jquery-2.1.1.min",
        lodash: "../../lib/lodash.min",
        backbone: "../../lib/backbone-min",
        i18n: "../../lib/i18next.amd.withJQuery-1.8.1.min",
        JST: "../compiled-templates",
        'ckeditor': "../../lib/ckeditor/ckeditor",
        'ckjquery': "../../lib/ckeditor/adapters/jquery",
        'jquery.form': "../../lib/jquery.form",
        'bootstrap': "../../lib/bootstrap.min",
        'spinners': '../../lib/spinners.min',

        'admin-header': "./views/admin/headerView",
        'admin-about': "./views/admin/aboutView",
        'admin-album': "./views/admin/albumView",
        'admin-albums-list': "./views/admin/albumsListView",
        'admin-contacts': "./views/admin/contactsView",
        'sign-in-view': "./views/admin/signInView",
        'not-found': "../../common_js/notFoundView",
        'server-error': "../../common_js/serverErrorView",
        server: "../../common_js/utils/server",
        constants: "../../common_js/utils/constants",
        common: "../../common_js/utils/common",
        'local-storage': "../../common_js/utils/localStorage",
        app: "../../common_js/app",
        router: "./router",
        'view-loader': "../../common_js/utils/viewLoader"
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
        'spinners': {
            deps: ['jquery'],
            exports: 'Spinners'
        }
    },
    waitSeconds: 0
});

require(['constants', 'spinners', 'app', 'i18n', 'JST', 'jquery.form', 'bootstrap'], function (constants, Spinners, app) {
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
            resGetPath: '../locales/__ns__-__lng__.json',
            useCookie: false,
            getAsync: false
        });
        app.initialize();
    });
});
