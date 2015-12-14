define(['local-storage'], function(localStorage) {
    return {
        init: function() {
            if (!window.app.views.AdminHeader) {
                window.app.views.AdminHeader = Backbone.View.extend({
                    render: function() {
                        this.$el.html(this.template());
                        return this;
                    },
                    events: {
                        "click #log-out": "logOut"
                    },
                    logOut: function() {
                        localStorage.saveSession(null);
                        window.app.router.navigate("admin/signIn", true);
                    }
                });
            }
        }
    };
});
