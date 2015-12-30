define(['server'], function (server) {
    return {
        init: function () {
            if (!window.app.views.Contacts) {
                window.app.views.Contacts = Backbone.View.extend({
                    initialize: function (options) {
                        this.data = options.data;
                    },

                    render: function() {
                        this.setElement(this.template({ data: this.data }));
                        if ($(".container").hasClass("fullscreen-content")) {
                            $(".container").removeClass("fullscreen-content");
                        }
                        return this;
                    },
                    events: {
                        "click #send-message": "submit"
                    },

                    validate: function(name, email, message) {

                        var errors = new Array();

                        if (name.val() == '') {
                            errors.push($.i18n.t("user.contacts.no_name"));
                        }

                        var emailrule = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9._-]+$');

                        if (email.val() == '') {
                            errors.push($.i18n.t("user.contacts.no_email"));

                        } else if (!emailrule.test(email.val())) {
                            errors.push($.i18n.t("user.contacts.wrong_email"));
                        }

                        if (message.val() == '') {
                            errors.push($.i18n.t("user.contacts.no_message"));
                        }

                        if (errors.length) {
                            errors = errors.join(', ');
                            errors = errors.toLowerCase();
                            errors = errors.charAt(0).toUpperCase() + errors.slice(1) + '.';
                        } else {
                            errors = null;
                        }

                        return errors;
                    },

                    submit: function(e) {
                        var self = this;

                        e.preventDefault();

                        if (this.$el.hasClass('loading'))
                            return false;
                        var name = $("#input-name"),
                            email = $("#input-email"),
                            message = $("#input-message"),
                            phone = $("#input-phone");
                        var errors = this.validate(name, email, message);

                        if (errors) {

                            self.$el.find('.message')
                                .html('<span class="failure">' + errors + '</span>')
                                .show();

                            return false;
                        }

                        this.$el.addClass('loading');
                        this.$el.find('.message').hide();
                        server.sendMessage(name.val(), phone.val(), email.val(), message.val(), function() {
                            self.$el.find('.message')
                                .html('<span class="success">' + $.i18n.t("user.contacts.mesage_sent") + '</span>')
                                .show();
                            self.reset();
                        }, function() {
                            self.$el.removeClass('loading');
                        });
                    },

                    reset: function() {
                        $("#input-name").val('');
                        $("#input-phone").val('');
                        $("#input-email").val('');
                        $("#input-message").val('');
                        this.$el.removeClass('loading');
                    }
                });
            }
        }
    };
});
