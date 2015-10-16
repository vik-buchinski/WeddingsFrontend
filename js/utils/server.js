define(['constants'], function(constants) {

    var requestsLaunched = 0;
    
    function commonServerRequest(url, method, params, successCallback, sessionToken) {
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
                $("#loader").show();
            },
            complete: function () {
                requestsLaunched--;
                if (requestsLaunched === 0) {
                    $("#loader").hide();
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
            .fail(function(jqXhr) {
                if (jqXhr.status == constants.UNAUTHORIZED_REQUEST_CODE) {
                    window.app.router.navigate("admin/signIn", true);
                } else {
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
                }
                console.log('Failed!!' + '. URL: ' + url + ' METHOD: ' + method);
            });
    }

    function commonFileSubmitUrl(url, method, params, successCallback) {
        $.ajax({
            url: constants.BASE_API_URL + url,
            beforeSend: function() {
                requestsLaunched++;
                $("#loader").show();
            },
            complete: function() {
                requestsLaunched--;
                if (requestsLaunched === 0) {
                    $("#loader").hide();
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
            .fail(function(jqXhr) {
                if (jqXhr.status == constants.UNAUTHORIZED_REQUEST_CODE) {
                    window.app.router.navigate("admin/signIn", true);
                } else {
                    if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                        alert(JSON.parse(jqXhr.responseText).Message);
                    } else {
                        alert($.i18n.t("server-error-message"));
                    }
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

        editAdminAlbum: function(token, image, desc, name, albumId, successCallback) {
            var params = new FormData();
            if (image) {
                params.append('image', image);
            }
            params.append("album_description", desc);
            params.append("album_name", name);
            //TODO: change it is to real value
            //params.append("is_visible", true);
            params.append("Session-Token", token);
            commonFileSubmitUrl(constants.API_METHODS.admin.album.edit.url + albumId, constants.API_METHODS.admin.album.edit.type, params, successCallback);
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
        
        getAdminAbout: function (sessionToken, successCallback) {
            commonServerRequest(constants.API_METHODS.admin.about.get.url, constants.API_METHODS.admin.about.get.type, null, successCallback, sessionToken);
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

        getAlbumImagesById: function (successCallback, albumId) {
            commonServerRequest(
                constants.API_METHODS.user.album.url + albumId + constants.API_METHODS.user.album.images.url,
                constants.API_METHODS.user.album.images.type,
                null,
                successCallback);
        }
    };

    return serverRequests;
});
