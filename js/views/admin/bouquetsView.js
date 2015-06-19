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
                    },
                    events: {
                        "click #delete-btn": "deletePhoto",
                        "click #edit-btn": "editPhoto"
                    },
                    deletePhoto: function(ev) {
                        $('#confirm-modal').modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#confirm-delete-btn', function(e) {
                                $('#confirm-modal').modal('hide');
                                alert($(ev.currentTarget).data('photo-number'));
                                //TODO: send request to delete photo
                            });
                    },
                    editPhoto: function(ev) {
                        $('#edit-photo-modal').unbind();
                        $('#edit-photo-modal').modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#save-changes-btn', function(e) {
                                $('#edit-photo-modal').modal('hide');
                                alert($(ev.currentTarget).data('photo-number'));
                                //TODO: validate form and submit changes it to server
                            });
                    }
                });
            }
        }
    };
});
