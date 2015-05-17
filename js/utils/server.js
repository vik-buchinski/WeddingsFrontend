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
            .fail(function (jqXhr) {
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
            beforeSend: function(request) {
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
        
        getAdminAbout: function (sessionToken, successCallback) {
            commonServerRequest(constants.API_METHODS.admin.about.get.url, constants.API_METHODS.admin.about.get.type, null, successCallback, sessionToken);
        }
    };

    return serverRequests;
});
