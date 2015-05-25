define(['sub-menu'], function(SubMenu) {
    return {
        init: function() {
            if (!window.app.views.UserHeader) {
                window.app.views.UserHeader = Backbone.View.extend({
                    sub: null,

                    initialize: function() {
                        _.bindAll(this);
                    },

                    render: function() {
                        this.$el.html(this.template());
                        this.initSectionPadding();
                        return this;
                    },

                    events: {
                        'mouseover .menu-item': 'open',
                        'click > ul > .menu-item > a': 'click'
                    },

                    click: function(e) {

                        var item = $(e.currentTarget);

                        if (item.parents('.menu-item').find('.sub-menu').length) {
                            e.preventDefault();
                        }
                    },

                    open: function(e) {

                        var item = $(e.currentTarget);

                        var subEl = item.find('.sub-menu');

                        if (this.sub && !this.sub.$el.eq(subEl)) {
                            this.sub.hide();
                            this.sub.unbind();
                        }

                        this.sub = new SubMenu({
                            el: subEl
                        });

                        this.sub.show();
                    },

                    initSectionPadding: function() {
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
                        })
                    }
                });
            }
        }
    };
});
