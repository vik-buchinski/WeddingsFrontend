define([], function () {
    return {
        init: function () {
            if (!window.app.views.ServerError) {
                window.app.views.ServerError = Backbone.View.extend({
                    render: function () {
                        this.setElement(this.template());
                        $("#spinner").hide();
                        return this;
                    }
                });
            }
        }
    };
});
