define([], function() {
    return {
        init: function() {
            if (!window.app.views.AlbumsList) {
                window.app.views.AlbumsList = Backbone.View.extend({
                    initialize: function(options) {
                        this.data = options.data;
                        this.setElement(this.template({ albums: this.data }));
                    },

                    render: function() {
                        $(".container").addClass("fullscreen-content");
                        var self = this;
                        setTimeout(function() {
                            $(self.$el).find("img.lazy").lazyload({
                                threshold: 50
                            });
                        }, 100);

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
