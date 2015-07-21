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

                        $(this.$el).find("img.lazy").lazyload();
                        
                        var tempImage1 = new Image();
tempImage1.src = "http://lorempixel.com/530/800/animals/";
tempImage1.onload = function() {
    debugger;
    console.log(tempImage1.width, tempImage1.height);
}
                        return this;
                    },
                    events: {

                    }
                });
            }
        }
    };
});
