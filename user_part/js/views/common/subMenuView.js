define(['backbone'], function(Backbone) {

    return Backbone.View.extend({
        options: {
            speed: 300,
            autohide: 300
        },

        initialize: function() {
            _.bindAll(this);

            var self = this;

            this.$el.add(this.$el.parent())
                .bind('mouseout.menu', function() {
                    self.hide(self.options.autohide);
                })
                .bind('mouseover.menu', function() {
                    if (self.timer) {
                        window.clearTimeout(self.timer);
                    }
                });
        },

        unbind: function() {

            this.undelegateEvents();

            this.$el.add(this.$el.parent())
                .unbind('mouseout.menu')
                .unbind('mouseover.menu');
        },

        show: function() {

            if (!this.$el.is(':visible')) {
                this.$el.slideDown(this.options.speed);
            }
        },

        hide: function(after) {
            var self = this;

            if (self.timer) {
                window.clearTimeout(self.timer);
            }

            self.timer = window.setTimeout(function() {
                self.$el.slideUp(self.options.speed);
            }, after || 0);
        },

        render: function() {
            return this;
        }
    });
});
