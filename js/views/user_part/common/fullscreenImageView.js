define(['raphael', 'backbone'], function(Raphael) {
    return {
        init: function() {
            if (!window.app.views.FullscreenImageView) {
                window.app.views.FullscreenImageView = Backbone.View.extend({

                    box: '',

                    renderArrow: function(id, direction) {
                        var paper = Raphael(id, 16, 26);
                        if (direction == 'right')
                            var el = paper.path("M 2 2 L 14 13 L 2 24").attr({ fill: 'none', 'stroke-width': 3 });
                        else
                            var el = paper.path("M 15 2 L 2 13 L 15 24").attr({ fill: 'none', 'stroke-width': 3 });
                    },

                    renderCross: function(id) {
                        var cross = Raphael(id, 16, 16);
                        var el = cross.path("M 1 1 L 15 15 "
                                           + "M 15 1 L 1 15").attr({ fill: 'none', 'stroke-width': 3 });
                    },

                    render: function() {
                        var self = this;

                        this.renderArrow('fsbox-prev');
                        this.renderArrow('fsbox-next', 'right');
                        this.renderCross('fsbox-close');
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


                        $('#fsbox-prev').click(function() {
                            //self.box.prev();
                            return false;
                        });

                        $('#fsbox-next').click(function() {
                            //self.box.next();
                            return false;
                        });
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
