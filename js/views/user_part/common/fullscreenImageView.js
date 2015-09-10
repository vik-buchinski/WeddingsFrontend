define(['raphael', 'backbone'], function(Raphael) {
    return {
        init: function() {
            if (!window.app.views.FullscreenImageView) {
                window.app.views.FullscreenImageView = Backbone.View.extend({
                    nextImageId: null,
                    prevImageId: null,
                    isAnimationTriggering: false,
                    
                    initialize: function () {
                        this.listenTo(window.Vent, "setFullscreenImages", this.setImages);
                        this.listenTo(window.Vent, "openFSImage", this.openFSImage);
                    },
                    
                    setImages: function (data) {
                        this.images = data.images;
                    },
                    
                    events: {
                        "click .fsbox-close": "closeBox",
                        "click a.fsbox-prev": "showPrev",
                        "click a.fsbox-next": "showNext"
                    },

                    openFSImage: function (data) {
                        this.displayImage(data.image_id);
                        $(".fsbox").fadeIn(200);
                        if (!$("body").hasClass("fsbox-active")) {
                            $("body").addClass("fsbox-active");
                        }
                    },

                    closeBox: function () {
                        $(".fsbox").show();
                        $(".fsbox").fadeOut(200);
                        $(".fsbox .slides img").attr("src", "");
                        $("body").removeClass("fsbox-active");
                    },
                    
                    showNext: function () {
                        this.displayImage(this.nextImageId);
                    },
                    
                    showPrev: function () {
                        this.displayImage(this.prevImageId);
                    },
                    
                    displayImage: function (imageId) {
                        if (!this.isAnimationTriggering) {
                            var imageObj = null;
                            for (var i = 0; i < this.images.length; i++) {
                                if (this.images[i].id == imageId) {
                                    imageObj = this.images[i];

                                    if (i == 0) {
                                        if (!$(".fsbox-prev").hasClass("disabled")) {
                                            $(".fsbox-prev").addClass("disabled");
                                        }
                                    } else {
                                        if ($(".fsbox-prev").hasClass("disabled")) {
                                            $(".fsbox-prev").removeClass("disabled");
                                        }
                                        this.prevImageId = this.images[i - 1].id;
                                    }

                                    if (i == this.images.length - 1) {
                                        if (!$(".fsbox-next").hasClass("disabled")) {
                                            $(".fsbox-next").addClass("disabled");
                                        }
                                    } else {
                                        if ($(".fsbox-next").hasClass("disabled")) {
                                            $(".fsbox-next").removeClass("disabled");
                                        }
                                        this.nextImageId = this.images[i + 1].id;
                                    }
                                    break;
                                }
                            }

                            if (!imageObj) {
                                alert($.i18n.t("image-not-found-error"));
                                return;
                            }
                            var self = this;
                            this.isAnimationTriggering = true;
                            $(".fsbox .slides img").fadeOut(100, function() {
                                $(".fsbox .slides img").attr("src", imageObj.image_url);
                                var altText = "";
                                if (imageObj.description) {
                                    altText = imageObj.description;
                                }
                                $(".fsbox .slides img").attr("alt", altText);

                                var real_width = imageObj.image_width;
                                var real_height = imageObj.image_height;
                                var parentwidth = $(".fsbox .slides").width();
                                var parentheight = $(".fsbox .slides").height();

                                var ratioParent = parentwidth / parentheight;
                                var ratio = real_width / real_height;
                                if (ratioParent < ratio) {
                                    $(".fsbox .slides img").css({ width: "100%", height: 'auto' });
                                } else {
                                    $(".fsbox .slides img").css({ width: "auto", height: '100%' });
                                }

                                $(".fsbox .slides img").fadeIn(100);
                                self.isAnimationTriggering = false;
                            });
                        }
                    },

                    box: '',

                    renderArrow: function(selector, direction) {
                        var paper = Raphael($(selector)[0], 16, 26);
                        if (direction == 'right')
                            var el = paper.path("M 2 2 L 14 13 L 2 24").attr({ fill: 'none', 'stroke-width': 3 });
                        else
                            var el = paper.path("M 15 2 L 2 13 L 15 24").attr({ fill: 'none', 'stroke-width': 3 });
                    },

                    renderCross: function (selector) {
                        var cross = Raphael($(selector)[0], 16, 16);
                        var el = cross.path("M 1 1 L 15 15 "
                                           + "M 15 1 L 1 15").attr({ fill: 'none', 'stroke-width': 3 });
                    },

                    render: function() {
                        var self = this;

                        this.renderArrow('.fsbox-prev');
                        this.renderArrow('.fsbox-next', 'right');
                        this.renderCross('.fsbox-close');
                        /*
                        Spinner.create($('#fsbox .spinner'), {
                            radius: 7,
                            height: 10,
                            width: 1.5,
                            dashes: 20,
                            opacity: 0.85,
                            rotation: 800,
                            color: '#000000'
                        }).center().play();*/


                        //var images = $('#fsbox .slides > img');
                        //var storage = $('#fsbox').data('storage');
                        //var indexes = $.parseJSON($.trim($('#photos-indexes').html()));
                        // Size for slides area
                        var width = $(window).width() - 152;
                        var height = $(window).height() - 152;

                        // Set correct filename for image
                        /*$(images).each(function() {
                            var file = '2000-';
                            var size = $(this).data('size');
                            if (size) {
                                for (i in indexes) {
                                    if (size[indexes[i]] && (size[indexes[i]].w >= width && size[indexes[i]].h >= height)) {
                                        file = indexes[i] + '-';
                                        break;
                                    }
                                }
                            }
                            $(this).data('fsbox-src', storage + file + $(this).data('file'));
                        });*/

                        /*
                        this.box = new Fsbox({
                            el: $('#fsbox')
                        }).render();*/

                        /*
                        if ('ontouchstart' in document.documentElement) {
                            self.box.$el.find('.slides').swipe({
                                triggerOnTouchEnd: true,
                                swipeStatus: function swipeStatus(event, phase, direction, distance) {
                                    if (phase == "end") {
                                        if (direction == "right") {
                                            self.box.prev();
                                        } else if (direction == "left") {
                                            self.box.next();
                                        }
                                    }
                                },
                                allowPageScroll: "vertical",
                                threshold: 75
                            });
                        }*/
                        /*
                        // IE и те кто не поддерживает HistoryApi идут лесом
                        if ($('body').is('.notHistoryApi') == false) {
                            this.box.$el.on('change:finish', function() {
                                document.location.hash = '#' + self.box.getSlideNumber();
            
                                // Init social sharing icons
                                var pinteres = self.box.$el.find('.pinterest');
                                var vk = self.box.$el.find('.vk');
            
                                if (pinteres.length > 0 || vk.length > 0) {
                                    var img = self.box.$el.find('.slides > *').eq(self.box.getSlideNumber() - 1);
                                    img = (img.is('img')) ? img.attr('data-fsbox-src') : '';
                                    if (pinteres.length > 0) {
                                        $(pinteres[0]).attr('data-image', img);
                                    }
                                    if (vk.length > 0) {
                                        $(vk[0]).attr('data-image', img);
                                    }
                                }
                                // Render icons
                                share.render();
                            });
            
                            this.box.$el.on('close.fsbox', function() {
                                document.location.hash = '';
                            });
            
                            if (document.location.hash) {
                                var hash = parseInt(document.location.hash.replace('#', ''));
                                if (hash >= 1 && hash <= this.box.slides.length) {
                                    self.box.open(hash - 1);
                                }
                            }
                        }
                        else {
                            this.box.$el.on('change:finish', function() {
                                // Init social sharing icons
                                var pinteres = self.box.$el.find('.pinterest');
                                var vk = self.box.$el.find('.vk');
            
                                if (pinteres.length > 0 || vk.length > 0) {
                                    var img = self.box.$el.find('.slides > *').eq(self.box.getSlideNumber() - 1);
                                    img = (img.is('img')) ? img.attr('data-fsbox-src') : '';
                                    if (pinteres.length > 0) {
                                        $(pinteres[0]).attr('data-image', img);
                                    }
                                    if (vk.length > 0) {
                                        $(vk[0]).attr('data-image', img);
                                    }
                                }
                                // Render icons
                                share.render();
                            });
                        }*/

                        return this;
                    }
                });
            }
        }
    };
});
