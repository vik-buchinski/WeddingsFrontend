define([], function() {
    return {
        init: function() {
            if (!window.app.views.AlbumsList) {
                window.app.views.AlbumsList = Backbone.View.extend({
                    initialize: function(options) {
                        this.data = options.data;
                    },

                    render: function() {
                        this.setElement(this.template({ albums: this.data }));
                        $(this.$el).find("img.lazy").lazyload({
                            threshold: 200
                        });
                        $(".container").addClass("fullscreen-content");
                        return this;
                    },

                    events: {
                        //"click img.lazy": "openFSImage"
                    }
                });
            }
        }
    };
});
