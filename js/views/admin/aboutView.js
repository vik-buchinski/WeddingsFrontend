define(['server', 'local-storage', 'constants'], function (server, localStorage, constants) {
    return {
        init: function () {
            if (!window.app.views.AdminAbout) {
                window.app.views.AdminAbout = Backbone.View.extend({
                    render: function () {
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            selected_page: constants.LEFT_PANELS.about
                        }));
                        this.$el.prepend(this.headerTemplate());
                        $(this.$el).find(".main").html(this.template({
                             save_url: constants.BASE_API_URL + constants.API_METHODS.admin.about.url
                        }));
                        $(this.$el).find("textarea#description").ckeditor({ language: constants.CKEDITOR_LANGUAGE });
                        return this;
                    },
                    events: {
                    },
                });
            }
        }
    };
});
