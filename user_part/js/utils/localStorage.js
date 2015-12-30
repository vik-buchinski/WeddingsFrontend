define([], function() {

    var SESSION_KEY = "SESSION_KEY";
    var localSessionData;

    function getLocalStorage() {
        return window.localStorage;
    }

    var storageMethods = {
        saveSession: function (session) {
            if (!session) {
                getLocalStorage().removeItem(SESSION_KEY);
                localSessionData = null;
            } else {
                getLocalStorage().setItem(SESSION_KEY, JSON.stringify(session));
                localSessionData = session;
            }
        },
        getSession: function() {
            if (!localSessionData) {
                localSessionData = JSON.parse(getLocalStorage().getItem(SESSION_KEY));
            }
            return localSessionData;
        }
    };

    return storageMethods;
});
