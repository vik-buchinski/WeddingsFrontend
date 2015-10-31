define([], function() {
    return {
        init: function() {
            if (!window.app.views.NotFound) {
                window.app.views.NotFound = Backbone.View.extend({
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
