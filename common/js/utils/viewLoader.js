define([], function () {
    var load = function(view, callback) {
        if (window.app.views[view.view_name]) {
            window.app.views[view.view_name].prototype.template = JST[(view.path || "") + view.template_name + '.html'];
            if (view.other_templates) {
                window.app.views[view.view_name].prototype[view.other_templates.access_point]
                    = JST[(view.other_templates.path || "") + view.other_templates.template_name + '.html'];
            }
        } else {
            alert(view.view_name + " not found");
        }
        callback();
    };

    return load;
});
