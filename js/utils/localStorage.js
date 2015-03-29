define([], function() {

    var USER_DATA_KEY = "USER_DATA_KEY";
    var localUserData;

    function getLocalStorage() {
        return window.localStorage;
    }

    var storageMethods = {
        saveUserData: function(data) {
            if (data === null) {
                getLocalStorage().removeItem(USER_DATA_KEY);
                localUserData = null;
            } else {
                getLocalStorage().setItem(USER_DATA_KEY, JSON.stringify(data));
                localUserData = data;
            }
        },
        getUserData: function() {
            if (localUserData === null) {
                localUserData = JSON.parse(getLocalStorage().getItem(USER_DATA_KEY));
            }
            return localUserData;
        }
    };

    return storageMethods;
});
