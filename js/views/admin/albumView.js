define(['server', 'local-storage', 'constants', 'common'], function(server, localStorage, constants, common) {
    return {
        init: function() {
            if (!window.app.views.AdminAlbum) {
                window.app.views.AdminAlbum = Backbone.View.extend({
                    initialize: function(options) {
                        this.album_data = options.album_data;
                        this.title = options.title;
                        this.selected_page = options.selected_page;
                    },
                    render: function() {
                        document.title = this.title;
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            album_types: constants.ALBUM_TYPES,
                            selected_page: this.selected_page
                        }));
                        $(this.$el).find(".main").html(this.template({
                            data: this.album_data
                        }));
                        $(this.$el).find("textarea#album-description").ckeditor({ language: constants.CKEDITOR_LANGUAGE });
                        return this;
                    },
                    events: {
                        "click #delete-btn": "deletePhoto",
                        "click #edit-btn": "editPhoto",
                        "click #submit-btn": "addImageSubmit",
                        "change #adding-image": "addFileChanged",
                        "change #album-image": "albumImageChanged",
                        "change #edit-avatar-image": "editFileChanged",
                        "click #save-album-btn": "updateAlbumData"
                    },
                    updateAlbumData: function() {
                        var file = null;
                        if (!this.album_data.is_expaned) {
                            file = $("#album-image")[0].files[0];
                            if (file) {
                                if (!common.isImage(file)) {
                                    alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                                    return false;
                                }
                                var fileSize = $("#album-image")[0].files[0].size;
                                if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                    $("#album-image").val('');
                                    alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                                    return false;
                                }
                            }
                        }
                        var isVisible = false;
                        if ($("#is-album-visible").is(':checked')) {
                            isVisible = true;
                        } else {
                            isVisible = false;
                        }
                        server.editAdminAlbum(
                            localStorage.getSession().session.token,
                            file,
                            $("#album-description").val(),
                            $("#album-name").val(),
                            this.album_data.id,
                            isVisible,
                            function(response) {
                                alert($.i18n.t("saved-message"));
                                window.location.reload();
                            });
                        return false;
                    },

                    albumImageChanged: function() {
                        var file = $("#album-image")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = $("#album-image")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#album-image").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                                return false;
                            } else {
                                var reader = new FileReader();

                                reader.onload = function(e) {
                                    $("#album-image-preview")
                                        .attr('src', e.target.result);
                                };

                                reader.readAsDataURL($("#album-image")[0].files[0]);
                            }
                        } else {
                            $("#album-image").val('');
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                        }
                    },

                    addFileChanged: function() {
                        var file = $("#adding-image")[0].files[0];
                        if (common.isImage(file)) {
                            var fileSize = $("#adding-image")[0].files[0].size;
                            if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                                $("#adding-image").val('');
                                alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                                return false;
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
                                return false;
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
                            return false;
                        }

                        server.addAdminAlbumImage(
                            localStorage.getSession().session.token,
                            file,
                            $("#image-description").val(),
                            this.album_data.id,
                            function(response) {
                                alert($.i18n.t("image-added-message"));
                                window.location.reload();
                            });
                        return false;
                    },
                    deletePhoto: function(ev) {
                        var self = this;
                        $('#confirm-modal').unbind().modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#confirm-delete-btn', function(e) {
                                server.deleteAdminAlbumImage(
                                    localStorage.getSession().session.token,
                                    $(ev.currentTarget).data('photo-number'),
                                    self.album_data.id,
                                    function() {
                                        $('#confirm-modal').modal('hide');
                                        window.location.reload();
                                    });
                            });
                    },
                    editPhoto: function(ev) {
                        var file = $("#edit-avatar-image")[0].files[0];
                        if (!file) {
                            alert($.i18n.t("select-image-message"));
                            return false;
                        }
                        if (!common.isImage(file)) {
                            alert($.i18n.t("supported-format-message") + constants.SUPPORTED_IMAGES_FORMAT);
                            return false;
                        }
                        var fileSize = $("#edit-avatar-image")[0].files[0].size;
                        if (fileSize > constants.MAX_UPLOADS_FILE_SIZE) {
                            $("#edit-avatar-image").val('');
                            alert($.i18n.t("max-file-size-message") + (constants.MAX_UPLOADS_FILE_SIZE / 1024 / 1024) + $.i18n.t("mb-prefix"));
                            return false;
                        }

                        var self = this;
                        var photoId = $(ev.currentTarget).data('photo-number');
                        var photo = _.find(this.album_data.images, function(image) {
                            return image.id == photoId;
                        });
                        $("#edit-image").attr("src", photo.image_url);
                        $("#edit-image-description").val(photo.description);
                        $('#edit-photo-modal').unbind().modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#save-changes-btn', function(e) {
                                server.editAdminAlbumImage(
                                    localStorage.getSession().session.token,
                                    $("#edit-avatar-image")[0].files[0],
                                    $('#edit-image-description').val(),
                                    photoId,
                                    self.album_data.id,
                                    function() {
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
