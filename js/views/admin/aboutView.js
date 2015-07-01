define(['server', 'local-storage', 'constants', 'common', 'ckeditor', 'ckjquery'], function(server, localStorage, constants, common) {
    return {
        init: function() {
            if (!window.app.views.AdminAbout) {
                window.app.views.AdminAbout = Backbone.View.extend({
                    initialize: function(options) {
                        this.about_data = options.about_data;
                    },
                    render: function() {
                        document.title = $.i18n.t("admin.about-page.page-title");
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            selected_page: constants.LEFT_PANELS.about
                        }));
                        $(this.$el).find(".main").html(this.template({
                            save_url: constants.BASE_API_URL + constants.API_METHODS.admin.about.url,
                            data: this.about_data
                        }));
                        $(this.$el).find("textarea#description").ckeditor({ language: constants.CKEDITOR_LANGUAGE });
                        return this;
                    },
                    events: {
                        "click #submit-btn": "formSubmit",
                        "change #avatar-image": "fileChanged"
                    },
                    formSubmit: function() {
                        var data = new FormData();
                        data.append('avatar_image', $("#avatar-image")[0].files[0]);
                        data.append("description", $("#description").val());
                        data.append("Session-Token", localStorage.getSession().session.token);

                        server.submitAdminAbout(data, function(response) {
                            alert($.i18n.t("saved-message"));
                        });
                        return false;
                    },
                    fileChanged: function() {
                        var file = $("#avatar-image")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = $("#avatar-image")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#avatar-image").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                            } else {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    $("#image")
                                        .attr('src', e.target.result);
                                };

                                reader.readAsDataURL($("#avatar-image")[0].files[0]);
                            }
                        } else {
                            $("#avatar-image").val('');
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                        }
                    }
                });
            }
        }
    };
});
