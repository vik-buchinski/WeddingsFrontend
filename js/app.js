define(['router', 'backbone'], function (router) {

    return {
        initialize: function() {
            window.app = {
                views: {},
                models: {},
                routers: {},
                utils: {},
                adapters: {}
            };
            document.title = $.i18n.t("default-title");

            window.app.router = new router();
            Backbone.history.start();

            var initSectionPadding = function() {
                if (window.ifpluso) {
                    var sec = 0;
                    var inteval = setInterval(function() {
                        $('.page > section').css({ 'padding-bottom': $('footer').outerHeight() + 50 });

                        if (++sec >= 30) clearInterval(inteval);
                    }, 1000);
                } else {
                    $('.page > section').css({ 'padding-bottom': $('footer').outerHeight() + 50 });
                }

                $(window).on('resize', function() {
                    $('.page > section').css({ 'padding-bottom': $('footer').outerHeight() + 50 });
                });
            }

            // update padding of the section
            initSectionPadding();
        }
    };
});
