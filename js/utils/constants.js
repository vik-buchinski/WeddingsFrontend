define({
    BASE_API_URL: "http://localhost:47503/api/",
    
    UNAUTHORIZED_REQUEST_CODE: 401,

    MAX_UPLOADS_FILE_SIZE: 10485760,
    SUPPORTED_IMAGES_FORMAT: ".gif .png .jpg .tif .jpeg",

    ALBUM_TYPES: {
        bouquets: "bouquets"
    },

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
            },
            bouquets: {
                add: {
                    url: "admin/bouquets/images",
                    type: "POST"
                },
                edit: {
                    url: "admin/bouquets/images/",
                    type: "PUT"
                },
                getAll: {
                    url: "admin/bouquets/images",
                    type: "GET"
                },
                delete: {
                    url: "admin/bouquets/images/",
                    type: "DELETE"
                }
            }
        },
        user: {
            about: {
                url: "about",
                type: "GET"
            },
            album: {
                //for receiveing album info: album/{type}
                url: "album/",
                type: "GET",
                images: {
                    //for receiveing album photos: album/{type}/images
                    url: "/images",
                    type: "GET",
                }
            },
            album_by_type: {
                url: "album_images/",
                type: "GET"
            }
        }
    },

    CKEDITOR_LANGUAGE: "ru",
    
    USER_TABS: {
        about: "about",
        bouquets: "bouquets"
    },

    LEFT_PANELS: {
        about: "about",
        bouquets: "bouquets"
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
                other_templates: {
                    path: "admin/common/",
                    access_point: "MainContainerTemplate",
                    template_name: "main_container"
                }
            },
            BOUQUETS: {
                view_name: "AdminBouquets",
                template_name: "bouquets",
                path: "admin/",
                other_templates: {
                    path: "admin/common/",
                    access_point: "MainContainerTemplate",
                    template_name: "main_container"
                }
            }
        },
        USER: {
            HEADER: {
                view_name: "UserHeader",
                template_name: "header",
                path: "user_part/common/",
                other_templates: {
                    path: "user_part/common/",
                    access_point: "HeaderMenu",
                    template_name: "header_menu"
                }
            },
            ABOUT: {
                view_name: "UserAbout",
                template_name: "about",
                path: "user_part/"
            },
            ALBUM_IMAGES: {
                view_name: "AlbumImages",
                template_name: "album_images",
                path: "user_part/"
            }
        }
    }
});
