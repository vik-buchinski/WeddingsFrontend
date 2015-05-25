define([

	'backbone'

], function(Backbone) {

    return Backbone.View.extend({

        initialize: function() {

            _.bindAll(this);

            $(window).on('resize', this.resize);
        },

        resize: function() {
            var titleWidth = this.$('span').outerWidth();
            var container = this.$el.parent().find(' > .container');
            if (container.length > 0) {
                container = container[container.length - 1];
            }
            else {
                container = this.$el.parent();
            }
            var maxTitleWidth = $(container).width();
            if (titleWidth <= maxTitleWidth) {
                var hrWidth =
					(this.$el.width() - this.$('span').outerWidth()) / 2;

                this.$('hr')
					.width(hrWidth)
					.css('top', this.$el.height() / 2);
            }
            else {
                var hrWidth =
					(this.$el.width() - maxTitleWidth) / 2;

                this.$('span')
					.width(maxTitleWidth)
					.css({
					    display: 'block',
					    padding: '0px ' + hrWidth + 'px'
					});
                this.$('hr')
					.width(hrWidth)
					.css('top', this.$el.height() / 2);
            }

        },

        render: function() {

            this.resize();

            return this;
        }
    });
});