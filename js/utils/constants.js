define({
    BASE_API_URL: "http://localhost:47503/api/",
    
    UNAUTHORIZED_REQUEST_CODE: 401,

    MAX_UPLOADS_FILE_SIZE: 10485760,
    SUPPORTED_IMAGES_FORMAT: ".gif .png .jpg .tif .jpeg",

    API_METHODS: {
        admin: {
            login: {
                url: "auth/login",
                type: "POST"
            },
            about: {
                save: {
                    url: "admin/about/save",
                    type: "POST"
                },
                get: {
                    url: "admin/about/get",
                    type: "GET"
                }
            }
        },
        user: {
            about: {
                url: "about",
                type: "GET"
            }
        }
    },

    CKEDITOR_LANGUAGE: "ru",
    
    USER_TABS: {
        about: "about"
    },

    LEFT_PANELS: {
        about: "about"
    },

    PAGE_TEMPLATES_DATA: {
        ADMIN: {
            HEADER: {
                view_name: "AdminHeader",
                template_name: "header",
                path: "admin/common/"
            },
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
                    //header_name: "header",
                    main_container: "main_container"
                }
            }
        },
        USER: {
            HEADER: {
                view_name: "UserHeader",
                template_name: "header",
                path: "user_part/common/"
            },
            ABOUT: {
                view_name: "UserAbout",
                template_name: "about",
                path: "user_part/"
            }
        }
    }
});
