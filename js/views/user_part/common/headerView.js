define(['sub-menu', 'constants'], function (SubMenu, constants) {
    return {
        init: function() {
            if (!window.app.views.UserHeader) {
                window.app.views.UserHeader = Backbone.View.extend({
                    sub: null,

                    initialize: function(options) {
                        this.page_name = options.page_name;
                        this.tab_name = options.tab_name;
                        this.listenTo(window.Vent, "changeHeaderActiveTab", this.renderMenu);
                        _.bindAll(this);
                    },

                    render: function() {
                        var data = {
                            page_name: this.page_name
                        };
                        this.setElement(this.template(data));
                        this.renderMenu();
                        return this;
                    },

                    events: {
                        'mouseover .menu-item': 'open',
                        'click ul > .menu-item > a': 'click'
                    },
                    
                    renderMenu: function (data) {
                        if (!data) {
                            data = {};
                        }
                        var self = this;
                        $(this.$el).find("nav.menu").html(self.HeaderMenu({
                            tab_name: data.tab_name || self.tab_name,
                            all_tabs: constants.USER_TABS
                        }));
                    },

                    click: function(e) {
                        var item = $(e.currentTarget);

                        if (item.parents('.menu-item').find('.sub-menu').length) {
                            e.preventDefault();
                        } else {
                            _.each($("header li.menu-item"), function(el) {
                                if ($(el).hasClass("active")) {
                                    $(el).removeClass("active");
                                }
                            });
                            item.parent().addClass("active");
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
                    }

                });
            }
        }
    };
});
