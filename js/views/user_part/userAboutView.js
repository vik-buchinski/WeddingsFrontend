define([], function() {
    return {
        init: function() {
            if (!window.app.views.UserAbout) {
                window.app.views.UserAbout = Backbone.View.extend({
                    render: function() {
                        this.$el.html(this.template());
                        return this;
                    },
                    events: {
                    },
                });
            }
        }
    };
});
