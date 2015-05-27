define(['user-title'], function(Title) {
    return {
        init: function() {
            if (!window.app.views.UserAbout) {
                window.app.views.UserAbout = Backbone.View.extend({
                    initialize: function(options) {
                        this.data = options.data;
                    },
                    render: function() {
                        this.$el.html(this.template({data: this.data}));
                        if ($('section.page h1.title').length) {
                            var t = new Title({
                                el: $('section.page h1.title')
                            });
                            t.render();
                        }
                        return this;
                    },
                    events: {
                    },
                });
            }
        }
    };
});
