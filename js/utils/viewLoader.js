define([], function () {
    var load = function(view, callback) {
        if (window.app.views[view.view_name]) {
            window.app.views[view.view_name].prototype.template = JST['pages/' + (view.path || "") + view.template_name + '.html'];
            if (view.admin_templates) {
                //window.app.views[view.view_name].prototype.headerTemplate = JST['pages/' + (view.admin_templates.path || "") + view.admin_templates.header_name + '.html'];
                window.app.views[view.view_name].prototype.MainContainerTemplate = JST['pages/' + (view.admin_templates.path || "") + view.admin_templates.main_container + '.html'];
            }
        } else {
            alert(view.view_name + " not found");
        }
        callback();
    };

    return load;
});
