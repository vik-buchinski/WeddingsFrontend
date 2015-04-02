define(['constants'], function(constants) {
    function commonServerRequest(url, method, params, successCallback) {
        $.ajax({
                type: method,
                url: constants.BASE_API_URL + url,
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
                    alert(JSON.parse(jqXhr.responseText).Message);
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
            commonServerRequest('auth/login', 'POST', params, successCallback);
        }
    };

    return serverRequests;
});
