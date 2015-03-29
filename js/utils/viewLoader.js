define([], function () {

    var load = function (view, callback) {
        if (window.app.views[view.view_name]) {
            window.app.views[view.view_name].prototype.template = JST['pages/' + (view.path || "") + view.template_name + '.html'];
        } else {
            alert(view.view_name + " not found");
        }
        callback();
    };

    return load;
});
