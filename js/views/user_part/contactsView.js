define([], function () {
    return {
        init: function () {
            if (!window.app.views.Contacts) {
                window.app.views.Contacts = Backbone.View.extend({
                    render: function() {
                        this.setElement(this.template());
                        return this;
                    },
                    events: {
                        "click #send-message": "submit"
                    },
                    
                    validate: function() {

                        var errors = new Array();

                        var name = $("#input-name");

                        if (name.val() == '') {
                            errors.push($.i18n.t("user.contacts.no_name"));
                        }

                        var email = $("#input-email");
                        var emailrule = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9._-]+$');

                        if (email.val() == '') {
                            errors.push($.i18n.t("user.contacts.no_email"));

                        } else if (!emailrule.test(email.val())) {
                            errors.push($.i18n.t("user.contacts.wrong_email"));
                        }

                        var message = $("#input-message");

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

                        var errors = this.validate();

                        if (errors) {

                            self.$el.find('.message')
                                .html('<span class="failure">' + errors + '</span>')
                                .show();

                            return false;
                        }

                        this.$el.addClass('loading');
                        this.$el.find('.message').hide();
                        alert("send message");
                        
                            self.$el.find('.message')
                                .html('<span class="success">' + $.i18n.t("user.contacts.mesage_sent") + '</span>')
                                .show();
                        /*
                        } else {

                            self.$el.find('.message')
                                .html('<span class="failure">' + json.error + '</span>')
                                .show();

                        }*/

                        self.reset();
                    },

                    reset: function() {

                        $("#input-name").val('').focus();
                        $("#input-phone").val('').focus();
                        $("#input-email").val('').focus();
                        $("#input-message").val('').focus();

                        /* Fix: We have to make focus for each element on 
                         * the form to fix default value plugin*/
                        this.field('message').blur();
                    }
                });
            }
        }
    };
});
