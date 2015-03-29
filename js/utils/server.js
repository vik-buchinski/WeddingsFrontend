define(['constants'], function(constants) {

    function commonServerRequest(url, method, params, successCallback) {
        $.ajax({
                type: method,
                url: constants.BASE_API_URL + url,
                beforeSend: function() {
                    //TODO: show loader
                },
                complete: function() {
                    //TODO: hide loader
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
                if (null != jqXhr.responseText && jqXhr.responseText !== "") {
                    alert(JSON.parse(jqXhr.responseText).message);
                }
                console.log('Failed!!' + '. URL: ' + url + ' METHOD: ' + method);
            });
    }

    var serverRequests = {
        login: function(email, password, successCallback) {
            var deviceId;
            if (window.device && window.device.uuid) {
                deviceId = window.device.uuid;
            } else {
                deviceId = constants.DEFAULT_DEVICE_ID;
            }
            var params = {
                'email': email,
                'password': password,
                'device_id': deviceId
            };
            commonServerRequest('/device/admin_users/sign_in', 'POST', params, successCallback);
        }
    };

    return serverRequests;
});
