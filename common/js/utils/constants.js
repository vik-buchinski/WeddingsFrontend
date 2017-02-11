define({
	//production site url
    BASE_API_URL: "http://designforlifeapi.azurewebsites.net/api/",
    // BASE_API_URL: "http://localhost:47503/api/",

    UNAUTHORIZED_REQUEST_CODE: 401,
    NOT_FOUND_REQUEST_CODE: 404,
    INTERNAL_ERROR_REQUEST_CODE: 503,

    MAX_UPLOADS_FILE_SIZE: 10485760,
    SUPPORTED_IMAGES_FORMAT: ".gif .png .jpg .tif .jpeg",

    APP_LANGUAGE: "pl",

    ALBUM_TYPES: {
        bouquets: "bouquets",
        decorations: "decorations",
        invitations: "invitations",
        graphic: "graphic"
    },

    LEFT_PANELS: {
        about: "about",
        bouquets: "bouquets",
        decorations: "decorations",
        invitations: "invitations",
        graphic: "graphic",
        contacts: "contacts"
    },

    USER_TABS: {
        about: "about",
        bouquets: "bouquets",
        decorations: "decorations",
        invitations: "invitations",
        graphic: "graphic",
        contacts: "contacts"
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
                },
                save_title_image: {
                    url: "admin/about/title_image",
                    type: "POST"
                },
                delete_title_image: {
                    url: "admin/about/title_image",
                    type: "DELETE"
                }
            },
            bouquets: {
                getAll: {
                    url: "admin/bouquets",
                    type: "GET"
                }
            },
            album: {
                edit: {
                    url: "admin/albums/",
                    type: "PUT"
                },
                add_image: {
                    url: "admin/album/",
                    url_2: "/image",
                    type: "POST"
                },
                delete_image: {
                    url: "admin/album/",
                    url_2: "/image/",
                    type: "DELETE"
                },
                edit_image: {
                    url: "admin/album/",
                    url_2: "/image/",
                    type: "PUT"
                },
                get: {
                    url: "admin/album/",
                    type: "GET"
                }
            },
            albums_list: {
                get: {
                    url: "admin/albums/",
                    type: "GET"
                },
                add: {
                    url: "admin/albums",
                    type: "POST"
                },
                delete: {
                    url: "admin/albums/",
                    type: "DELETE"
                }
            },
            contacts_description: {
                edit: {
                    url: "admin/contacts/description",
                    type: "PUT"
                }
            }
        },
        user: {
            about: {
                url: "about",
                type: "GET"
            },
            bouquets: {
                url: "bouquets",
                type: "GET"
            },
            album: {
                //for receiveing album info: album/{type}
                url: "album/",
                type: "GET"
            },
            albums: {
                //for receiveing album info: album/{type}
                url: "albums/",
                type: "GET"
            },
            album_by_type: {
                url: "album_images/",
                type: "GET"
            },
            message: {
                url: "contacts/message",
                type: "POST"
            },
            contacts_description: {
                url: "contacts",
                type: "GET"
            }
        }
    },

    PAGE_TEMPLATES_DATA: {
        NOT_FOUND: {
            view_name: "NotFound",
            template_name: "not_found",
            path: "common/pages/"
        },
        SERVER_ERROR: {
            view_name: "ServerError",
            template_name: "server_error",
            path: "common/pages/"
        },
        ADMIN: {
            HEADER: {
                view_name: "AdminHeader",
                template_name: "header",
                path: "admin/pages/common/"
            },
            SIGN_IN: {
                view_name: "SignIn",
                template_name: "sign_in",
                path: "admin/pages/"
            },
            ABOUT: {
                view_name: "AdminAbout",
                template_name: "about",
                path: "admin/pages/",
                other_templates: {
                    path: "admin/pages/common/",
                    access_point: "MainContainerTemplate",
                    template_name: "main_container"
                }
            },
            ALBUM: {
                view_name: "AdminAlbum",
                template_name: "album",
                path: "admin/pages/",
                other_templates: {
                    path: "admin/pages/common/",
                    access_point: "MainContainerTemplate",
                    template_name: "main_container"
                }
            },
            ALBUMS_LIST: {
                view_name: "AdminAlbumsList",
                template_name: "albums_list",
                path: "admin/pages/",
                other_templates: {
                    path: "admin/pages/common/",
                    access_point: "MainContainerTemplate",
                    template_name: "main_container"
                }
            },
            CONTACTS: {
                view_name: "AdminContacts",
                template_name: "contacts",
                path: "admin/pages/",
                other_templates: {
                    path: "admin/pages/common/",
                    access_point: "MainContainerTemplate",
                    template_name: "main_container"
                }
            }
        },
        USER: {
            HEADER: {
                view_name: "UserHeader",
                template_name: "header",
                path: "user_part/pages/common/",
                other_templates: {
                    path: "user_part/pages/common/",
                    access_point: "HeaderMenu",
                    template_name: "header_menu"
                }
            },
            ABOUT: {
                view_name: "UserAbout",
                template_name: "about",
                path: "user_part/pages/"
            },
            ALBUM_IMAGES: {
                view_name: "AlbumImages",
                template_name: "album_images",
                path: "user_part/pages/"
            },
            ALBUMS_LIST: {
                view_name: "AlbumsList",
                template_name: "albums_list",
                path: "user_part/pages/"
            },
            CONTACTS: {
                view_name: "Contacts",
                template_name: "contacts",
                path: "user_part/pages/"
            }
        }
    }
});
