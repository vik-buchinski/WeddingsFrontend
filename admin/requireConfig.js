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

        'admin-header': "./views/headerView",
        'admin-about': "./views/aboutView",
        'admin-album': "./views/albumView",
        'admin-albums-list': "./views/albumsListView",
        'admin-contacts': "./views/contactsView",
        'sign-in-view': "./views/signInView",
        'not-found': "../../common/js/notFoundView",
        'server-error': "../../common/js/serverErrorView",
        server: "../../common/js/utils/server",
        constants: "../../common/js/utils/constants",
        common: "../../common/js/utils/common",
        'local-storage': "../../common/js/utils/localStorage",
        app: "../../common/js/app",
        router: "./router",
        'view-loader': "../../common/js/utils/viewLoader"
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
