define({
    BASE_API_URL: "http://localhost:47503/api/",

    LEFT_PANELS: {
        about: "about"
    },

    PAGE_TEMPLATES_DATA: {
        ADMIN: {
            SIGN_IN: {
                view_name: "SignIn",
                template_name: "sign_in",
                path: "admin/"
            },
            ABOUT: {
                view_name: "AdminAbout",
                template_name: "about",
                path: "admin/",
                admin_templates: {
                    path: "admin/common/",
                    header_name: "header",
                    main_container: "main_container"
                }
            }
        }
    }
});