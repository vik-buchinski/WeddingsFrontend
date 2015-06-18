define(['server', 'local-storage', 'constants'], function(server, localStorage, constants) {
    return {
        init: function() {
            if (!window.app.views.AdminBouquets) {
                window.app.views.AdminBouquets = Backbone.View.extend({
                    initialize: function(options) {
                        //this.bouquets_data = options.bouquets_data;
                    },
                    render: function() {
                        document.title = $.i18n.t("admin.bouquets-page.page-title");
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            selected_page: constants.LEFT_PANELS.bouquets
                        }));
                        //this.$el.prepend(this.headerTemplate());
                        $(this.$el).find(".main").html(this.template({
                            //save_url: constants.BASE_API_URL + constants.API_METHODS.admin.about.url,
                            //data: this.bouquets_data
                        }));
                        //$(this.$el).find("textarea#description").ckeditor({ language: constants.CKEDITOR_LANGUAGE });
                        return this;
                    }/*,
                    events: {
                        "click #submit-btn": "formSubmit",
                        "change #avatar-image": "fileChanged"
                    }*/
                });
            }
        }
    };
});
