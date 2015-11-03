define(['constants'], function (constants) {
    return {
        init: function() {
            if (!window.app.views.AdminContacts) {
                window.app.views.AdminContacts = Backbone.View.extend({
                    initialize: function (options) {
                        this.title = options.title;
                    },
                    render: function() {
                        document.title = this.title;
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            album_types: constants.ALBUM_TYPES,
                            selected_page: this.album_type
                        }));
                        $(this.$el).find(".main").html(this.template());
                        $(this.$el).find("textarea#contacts-text").ckeditor({ language: constants.CKEDITOR_LANGUAGE });
                        return this;
                    },
                    events: {
                    }
                });
            }
        }
    };
});
