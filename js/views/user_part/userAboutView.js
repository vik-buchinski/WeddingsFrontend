define(['user-title'], function(Title) {
    return {
        init: function() {
            if (!window.app.views.UserAbout) {
                window.app.views.UserAbout = Backbone.View.extend({
                    render: function() {
                        this.$el.html(this.template());
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
