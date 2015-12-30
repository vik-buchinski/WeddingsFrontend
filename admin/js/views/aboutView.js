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
                            album_types: constants.ALBUM_TYPES,
                            selected_page: constants.LEFT_PANELS.about
                        }));
                        $(this.$el).find(".main").html(this.template({
                            save_url: constants.BASE_API_URL + constants.API_METHODS.admin.about.url,
                            data: this.about_data
                        }));
                        $(this.$el).find("textarea#description").ckeditor({ language: constants.APP_LANGUAGE });
                        return this;
                    },
                    events: {
                        "click #submit-btn": "aboutFormSubmit",
                        "change #content_image_input": "aboutFileChanged",
                        "click #save_title_image_btn": "titleImageSubmit",
                        "change #title_image_input": "titleImageChanged",
                        "click #delete_title_image_btn": "deleteTitleEvent"
                    },
                    deleteTitleEvent: function () {
                        if (this.about_data.title_image_url) {
                            server.deleteAdminAboutTitleImage(localStorage.getSession().session.token, function(response) {
                                alert($.i18n.t("deleted-message"));
                                window.location.reload();
                            });
                        } else {
                            alert($.i18n.t("no-image-message"));
                        }
                        return false;
                    },
                    titleImageChanged: function() {
                        var file = $("#title_image_input")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = $("#title_image_input")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#title_image_input").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                            } else {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    $("#title_image")
                                        .attr('src', e.target.result);
                                };

                                reader.readAsDataURL($("#title_image_input")[0].files[0]);
                            }
                        } else {
                            $("#title_image_input").val('');
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                        }
                    },
                    titleImageSubmit: function () {
                        var file = $("#title_image_input")[0].files[0];
                        if (file) {
                            if (!common.isImage(file)) {
                                alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                                return false;
                            }
                            var fileSize = $("#title_image_input")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#title_image_input").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                                return false;
                            }

                            var data = new FormData();
                            data.append('image', $("#title_image_input")[0].files[0]);
                            data.append("Session-Token", localStorage.getSession().session.token);

                            server.submitAdminAboutTitleImage(data, function(response) {
                                alert($.i18n.t("saved-message"));
                                window.location.reload();
                            });
                        } else {
                            alert($.i18n.t("select-image-message"));
                        }
                        return false;
                    },
                    aboutFormSubmit: function() {
                        var data = new FormData();
                        data.append('content_image', $("#content_image_input")[0].files[0]);
                        data.append("description", $("#description").val());
                        data.append("Session-Token", localStorage.getSession().session.token);

                        server.submitAdminAbout(data, function(response) {
                            alert($.i18n.t("saved-message"));
                        });
                        return false;
                    },
                    aboutFileChanged: function() {
                        var file = $("#content_image_input")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = $("#content_image_input")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#content_image_input").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                            } else {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    $("#content_image")
                                        .attr('src', e.target.result);
                                };

                                reader.readAsDataURL($("#content_image_input")[0].files[0]);
                            }
                        } else {
                            $("#content_image_input").val('');
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                        }
                    }
                });
            }
        }
    };
});
