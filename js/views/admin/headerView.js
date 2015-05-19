define(['server', 'local-storage'], function(server, localStorage) {
    return {
        init: function() {
            if (!window.app.views.AdminHeader) {
                window.app.views.AdminHeader = Backbone.View.extend({
                    render: function() {
                        this.$el.html(this.template());
                        return this;
                    },
                    events: {
                        //"submit #admin-sign-in-form": "signInSubmit"
                    }
                });
            }
        }
    };
});
