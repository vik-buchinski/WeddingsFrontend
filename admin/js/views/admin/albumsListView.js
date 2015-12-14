define(['server', 'local-storage', 'constants', 'common'], function(server, localStorage, constants, common) {
    return {
        init: function() {
            if (!window.app.views.AdminAlbumsList) {
                window.app.views.AdminAlbumsList = Backbone.View.extend({
                    initialize: function(options) {
                        this.album_data = options.album_data;
                        this.title = options.title;
                        this.album_type = options.album_type;
                    },
                    render: function() {
                        document.title = this.title;
                        this.$el.html(this.MainContainerTemplate({
                            all_pages: constants.LEFT_PANELS,
                            album_types: constants.ALBUM_TYPES,
                            selected_page: this.album_type
                        }));
                        $(this.$el).find(".main").html(this.template({
                            albums: this.album_data,
                            album_type: this.album_type
                        }));
                        $(this.$el).find("textarea#album-description").ckeditor({ language: constants.APP_LANGUAGE });
                        return this;
                    },
                    events: {
                        "click #delete-btn": "deleteAlbum",
                        "change #album-image": "albumImageChanged",
                        "click #save-album-btn": "addAlbum"
                    },
                    addAlbum: function() {
                        var file = null;
                        file = $("#album-image")[0].files[0];
                        if (!file) {
                            alert($.i18n.t("select-album-image-message"));
                            return false;
                        }
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
                        var albumName = $("#album-name").val();

                        if (!albumName) {
                            alert($.i18n.t("album-name-missing-message"));
                            return false;
                        }

                        server.addAdminAlbum(
                            localStorage.getSession().session.token,
                            file,
                            $("#album-description").val(),
                            albumName,
                            this.album_type,
                            function(response) {
                                alert($.i18n.t("added-message"));
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
                    deleteAlbum: function(ev) {
                        $('#confirm-modal').unbind().modal({ backdrop: 'static', keyboard: false })
                            .one('click', '#confirm-delete-btn', function(e) {
                                server.deleteAdminAlbum(
                                    localStorage.getSession().session.token,
                                    $(ev.currentTarget).data('album-number'),
                                    function() {
                                        $('#confirm-modal').modal('hide');
                                        window.location.reload();
                                    });
                            });
                    }
                });
            }
        }
    };
});
