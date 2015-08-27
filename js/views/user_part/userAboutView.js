define([], function() {
    return {
        init: function() {
            if (!window.app.views.UserAbout) {
                window.app.views.UserAbout = Backbone.View.extend({
                    initialize: function(options) {
                        this.data = options.data;
                    },
                    render: function() {
                        this.$el.html(this.template({data: this.data}));
                        return this;
                    },
                    events: {
                    },
                });
            }
        }
    };
});
