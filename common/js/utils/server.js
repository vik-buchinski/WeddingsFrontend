define(['constants'], function(constants) {

    var requestsLaunched = 0;

    function commonServerRequest(url, method, params, successCallback, sessionToken, errorCallback) {
        if (!params) {
            params = "";
        }
        $.ajax({
            type: method,
            url: constants.BASE_API_URL + url,
            beforeSend: function (request) {
                if (sessionToken) {
                    request.setRequestHeader("Session-Token", sessionToken);
                }
                requestsLaunched++;
                $("#spinner").show();
            },
            complete: function () {
                requestsLaunched--;
                if (requestsLaunched === 0) {
                    $("#spinner").hide();
                }
            },
            crossDomain: true,
            data: $.param(params),
            dataType: 'json'
        })
            .success(function(data) {
                console.log('Success!' + '. URL: ' + url + ' METHOD: ' + method);
                successCallback(data);
            })
            .fail(function (jqXhr) {
                if (jqXhr.status == constants.UNAUTHORIZED_REQUEST_CODE) {
                    window.app.router.navigate("signIn", true);
                } else if (jqXhr.status == constants.NOT_FOUND_REQUEST_CODE) {
                    window.app.router.navigate('/notFound', { trigger: true, replace: true });
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                } else if (jqXhr.status == constants.INTERNAL_ERROR_REQUEST_CODE) {
                    window.app.router.navigate('/serverError', { trigger: true });
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                } else {
                    var errCode = "";
                    if (0 != jqXhr.status) {
                        errCode = "\nCode:" + jqXhr.status;
                    }
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                    console.log(errCode);
                }
                if (errorCallback) {
                    errorCallback();
                }
                console.log('Failed!!' + '. URL: ' + url + ' METHOD: ' + method);
            });
    }

    function commonFileSubmitUrl(url, method, params, successCallback) {
        $.ajax({
            url: constants.BASE_API_URL + url,
            beforeSend: function() {
                requestsLaunched++;
                $("#spinner").show();
            },
            complete: function() {
                requestsLaunched--;
                if (requestsLaunched === 0) {
                    $("#spinner").hide();
                }
            },
            crossDomain: true,
            type: method,
            data: params,
            //mimeType: "multipart/form-data",
            contentType: false,
            cache: false,
            processData: false
        })
            .success(function(data) {
                console.log('Success!' + '. URL: ' + url + ' METHOD: ' + method);
                successCallback(data);
            })
            .fail(function (jqXhr) {
                if (jqXhr.status == constants.UNAUTHORIZED_REQUEST_CODE) {
                    window.app.router.navigate("signIn", true);
                } else if (jqXhr.status == constants.NOT_FOUND_REQUEST_CODE) {
                    window.app.router.navigate('/notFound', { trigger: true, replace: true });
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                } else if (jqXhr.status == constants.INTERNAL_ERROR_REQUEST_CODE) {
                    window.app.router.navigate('/serverError', { trigger: true });
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                } else {
                    var errCode = "";
                    if (0 != jqXhr.status) {
                        errCode = "\nCode:" + jqXhr.status;
                    }
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                    console.log(errCode);
                }
                console.log('Failed!!' + '. URL: ' + url + ' METHOD: ' + method);
            });
    }

    var serverRequests = {
        login: function(email, password, successCallback) {
            var params = {
                'email': email,
                'password': password
            };
            commonServerRequest(constants.API_METHODS.admin.login.url, constants.API_METHODS.admin.login.type, params, successCallback);
        },

        submitAdminAbout: function(params, successCallback) {
            commonFileSubmitUrl(constants.API_METHODS.admin.about.save.url, constants.API_METHODS.admin.about.save.type, params, successCallback);
        },

        submitAdminAboutTitleImage: function (params, successCallback) {
            commonFileSubmitUrl(constants.API_METHODS.admin.about.save_title_image.url, constants.API_METHODS.admin.about.save_title_image.type, params, successCallback);
        },

        deleteAdminAboutTitleImage: function (token, successCallback) {
            commonServerRequest(
                constants.API_METHODS.admin.about.delete_title_image.url,
                constants.API_METHODS.admin.about.delete_title_image.type,
                null,
                successCallback,
                token);
        },

        addAdminAlbumImage: function(token, image, desc, albumId, successCallback) {
            var params = new FormData();
            params.append('image', image);
            params.append("description", desc);
            params.append("Session-Token", token);
            commonFileSubmitUrl(
                constants.API_METHODS.admin.album.add_image.url + albumId + constants.API_METHODS.admin.album.add_image.url_2,
                constants.API_METHODS.admin.album.add_image.type,
                params,
                successCallback);
        },

        editAdminAlbumImage: function(token, image, desc, imageId, albumId, successCallback) {
            var params = new FormData();
            params.append('image', image);
            params.append("description", desc);
            params.append("Session-Token", token);
            commonFileSubmitUrl(
                constants.API_METHODS.admin.album.edit_image.url + albumId + constants.API_METHODS.admin.album.edit_image.url_2 + imageId,
                constants.API_METHODS.admin.album.edit_image.type,
                params,
                successCallback);
        },

        editAdminAlbum: function(token, image, desc, name, albumId, isVisible, successCallback) {
            var params = new FormData();
            if (image) {
                params.append('image', image);
            }
            params.append("album_description", desc);
            params.append("album_name", name);
            params.append("is_visible", isVisible);
            params.append("Session-Token", token);
            commonFileSubmitUrl(constants.API_METHODS.admin.album.edit.url + albumId, constants.API_METHODS.admin.album.edit.type, params, successCallback);
        },

        addAdminAlbum: function(token, image, desc, name, albumType, successCallback) {
            var params = new FormData();
            if (image) {
                params.append('image', image);
            }

            params.append("album_description", desc);
            params.append("album_name", name);
            params.append("album_type", albumType);
            params.append("Session-Token", token);
            commonFileSubmitUrl(constants.API_METHODS.admin.albums_list.add.url, constants.API_METHODS.admin.albums_list.add.type, params, successCallback);
        },

        deleteAdminAlbum: function(token, albumId, successCallback) {
            commonServerRequest(
                constants.API_METHODS.admin.albums_list.delete.url + albumId,
                constants.API_METHODS.admin.albums_list.delete.type,
                null,
                successCallback,
                token);
        },

        editAdminContactsDescription: function (token, description, successCallback) {
            var params = {
                'description': description
            };
            commonServerRequest(
                constants.API_METHODS.admin.contacts_description.edit.url,
                constants.API_METHODS.admin.contacts_description.edit.type,
                params,
                successCallback,
                token);
        },

        getAdminBouquetsImages: function(token, successCallback) {
            commonServerRequest(constants.API_METHODS.admin.bouquets.getAll.url, constants.API_METHODS.admin.bouquets.getAll.type, null, successCallback, token);
        },

        deleteAdminAlbumImage: function(token, imageId, albumId, successCallback) {
            commonServerRequest(
                constants.API_METHODS.admin.album.delete_image.url + albumId + constants.API_METHODS.admin.album.delete_image.url_2 + imageId,
                constants.API_METHODS.admin.album.delete_image.type,
                null,
                successCallback,
                token);
        },

        getAdminAlbumsList: function(sessionToken, albumType, successCallback) {
            commonServerRequest(constants.API_METHODS.admin.albums_list.get.url + albumType, constants.API_METHODS.admin.albums_list.get.type, null, successCallback, sessionToken);
        },

        getAdminAbout: function(sessionToken, successCallback) {
            commonServerRequest(constants.API_METHODS.admin.about.get.url, constants.API_METHODS.admin.about.get.type, null, successCallback, sessionToken);
        },

        getAdminAlbumById: function(token, albumId, successCallback) {
            commonServerRequest(
                constants.API_METHODS.admin.album.get.url + albumId,
                constants.API_METHODS.admin.album.get.type,
                null,
                successCallback,
                token);
        },

        getUserAbout: function(successCallback) {
            commonServerRequest(constants.API_METHODS.user.about.url, constants.API_METHODS.user.about.type, null, successCallback);
        },

        getBouquetsAlbum: function(successCallback) {
            commonServerRequest(
                constants.API_METHODS.user.bouquets.url,
                constants.API_METHODS.user.bouquets.type,
                null,
                successCallback);
        },

        getAlbumById: function(albumId, successCallback) {
            commonServerRequest(
                constants.API_METHODS.user.album.url + albumId,
                constants.API_METHODS.user.album.type,
                null,
                successCallback);
        },

        getAlbumByType: function(albumType, successCallback) {
            commonServerRequest(
                constants.API_METHODS.user.albums.url + albumType,
                constants.API_METHODS.user.albums.type,
                null,
                successCallback);
        },

        sendMessage: function(name, phone, email, message, successCallback, errorCallback) {
            var params = {
                'name': name,
                'phone': phone,
                'email': email,
                'message': message
            };
            commonServerRequest(constants.API_METHODS.user.message.url, constants.API_METHODS.user.message.type, params, successCallback, null, errorCallback);
        },

        getContactsDescription: function(successCallback, errorCallback) {
            commonServerRequest(
                constants.API_METHODS.user.contacts_description.url,
                constants.API_METHODS.user.contacts_description.type,
                null,
                successCallback,
                null,
                errorCallback);
        }
    };

    return serverRequests;
});
