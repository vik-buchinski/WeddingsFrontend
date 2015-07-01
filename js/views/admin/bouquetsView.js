define(['server', 'local-storage', 'constants', 'common'], function(server, localStorage, constants, common) {
    return {
        init: function() {
            if (!window.app.views.AdminBouquets) {
                window.app.views.AdminBouquets = Backbone.View.extend({
                    initialize: function(options) {
                        this.bouquets_data = options.bouquets_data;
                    },
                    render: function() {
                        document.title = $.i18n.t("admin.bouquets-page.page-title");
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            selected_page: constants.LEFT_PANELS.bouquets
                        }));
                        $(this.$el).find(".main").html(this.template({
                            data: this.bouquets_data

                        }));
                        return this;
                    },
                    events: {
                        "click #delete-btn": "deletePhoto",
                        "click #edit-btn": "editPhoto",
                        "click #submit-btn": "addImageSubmit",
                        "change #adding-image": "addFileChanged",
                        "change #edit-avatar-image": "editFileChanged"
                    },
                    addFileChanged: function() {
                        var file = $("#adding-image")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = $("#adding-image")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#adding-image").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                            } else {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    $("#adding-image-preview")
                                        .attr('src', e.target.result);
                                };

                                reader.readAsDataURL($("#adding-image")[0].files[0]);
                            }
                        } else {
                            $("#adding-image").val('');
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                        }
                    },
                    editFileChanged: function() {
                        var file = $("#edit-avatar-image")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = file.size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#edit-avatar-image").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                            } else {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    $("#edit-image")
                                        .attr('src', e.target.result);
                                };

                                reader.readAsDataURL($("#edit-avatar-image")[0].files[0]);
                            }
                        } else {
                            $("#edit-avatar-image").val('');
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                        }
                    },
                    addImageSubmit: function() {
                        var file = $("#adding-image")[0].files[0];
                        if (!file) {
                            alert($.i18n.t("select-image-message"));
                            return false;
                        }
                        if (!common.isImage(file)) {
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                            return false;
                        }
                        var fileSize = $("#adding-image")[0].files[0].size;
                        if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                            $("#adding-image").val('');
                            alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                        }

                        server.addBouquetsImage(localStorage.getSession().session.token, file, $("#image-description").val(), function(response) {
                            alert($.i18n.t("image-added-message"));
                            window.location.reload();
                        });
                        return false;
                    },
                    deletePhoto: function(ev) {
                        $('#confirm-modal').modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#confirm-delete-btn', function(e) {
                                server.deleteBouquetsImage(localStorage.getSession().session.token, $(ev.currentTarget).data('photo-number'), function() {
                                    $('#confirm-modal').modal('hide');
                                    window.location.reload();
                                });
                            });
                    },
                    editPhoto: function(ev) {
                        var photoId = $(ev.currentTarget).data('photo-number');
                        var photo = _.find(this.bouquets_data, function(image) {
                            return image.id == photoId;
                        });
                        $("#edit-image").attr("src", photo.image_url);
                        $("#edit-image-description").val(photo.description);
                        $('#edit-photo-modal').unbind();
                        $('#edit-photo-modal').modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#save-changes-btn', function(e) {
                                server.editBouquetsImage(localStorage.getSession().session.token, $("#edit-avatar-image")[0].files[0], $('#edit-image-description').val(), photoId, function() {
                                    $('#edit-photo-modal').modal('hide');
                                    window.location.reload();
                                });
                            });
                    }
                });
            }
        }
    };
});
