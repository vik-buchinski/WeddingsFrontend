define(['server', 'local-storage'], function (server, localStorage) {
    return {
        init: function() {
            if (!window.app.views.SignIn) {
                window.app.views.SignIn = Backbone.View.extend({
                    render: function() {
                        this.$el.html(this.template());
                        return this;
                    },
                    events: {
                        "submit #admin-sign-in-form": "signInSubmit"
                    },
                    signInSubmit: function () {
                        server.login($("#input-email").val(), $("#input-password").val(), function (data) {
                            localStorage.saveSession(data);
                            var sessiondata = localStorage.getSession();
                            debugger;
                            alert(JSON.stringify(sessiondata));
                        });
                    }
                });
            }
        }
    };
});
