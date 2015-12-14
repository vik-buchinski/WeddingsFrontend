define(['constants', 'server', 'local-storage'], function (constants, server, localStorage) {
    return {
        init: function() {
            if (!window.app.views.AdminContacts) {
                window.app.views.AdminContacts = Backbone.View.extend({
                    initialize: function (options) {
                        this.title = options.title;
                        this.data = options.data;
                    },
                    
                    render: function() {
                        document.title = this.title;
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            album_types: constants.ALBUM_TYPES,
                            selected_page: this.album_type
                        }));
                        $(this.$el).find(".main").html(this.template({ data: this.data }));
                        $(this.$el).find("textarea#description").ckeditor({ language: constants.APP_LANGUAGE });
                        return this;
                    },
                    
                    events: {
                        "click #update-btn": "updateDescription"
                    },
                    
                    updateDescription: function () {
                        server.editAdminContactsDescription(localStorage.getSession().session.token, $("#description").val(), function () {
                            alert($.i18n.t("updated-message"));
                        });
                    }
                });
            }
        }
    };
});
