define(['user-title'], function(Title) {
    return {
        init: function() {
            if (!window.app.views.UserBouquets) {
                window.app.views.UserBouquets = Backbone.View.extend({
                    initialize: function(options) {
                        this.data = options.data;
                    },
                    render: function() {
                        this.$el.html(this.template({ data: this.data }));
                        if ($('section.page h1.title').length) {
                            var t = new Title({
                                el: $('section.page h1.title')
                            });
                            t.render();
                        }

                        $(".container").addClass("fullscreen-content");

                        return this;
                    },
                    events: {

                    }
                });
            }
        }
    };
});
