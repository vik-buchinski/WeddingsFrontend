define(['user-title'], function(Title) {
    return {
        init: function() {
            if (!window.app.views.UserBouquets) {
                window.app.views.UserBouquets = Backbone.View.extend({
                    initialize: function(options) {
                        this.images = options.data;
                    },
                    
                    render: function() {
                        this.setElement(this.template({ data: this.buildImagesGrid() }));
                        if ($('section.page h1.title').length) {
                            var t = new Title({
                                el: $('section.page h1.title')
                            });
                            t.render();
                        }

                        $(".container").addClass("fullscreen-content");

                        $(this.$el).find("img").lazyload();

                        return this;
                    },
                    
                    events: {
                        
                    },
                    
                    buildImagesGrid: function () {
                        var width = $(window).width();
                        var columnsCount;
                        var dividerHeight = 10;
                        var paddingRight = 80,
                            paddingLeft = 80;
                        /*if (width < 400) {
                            columnsCount = 1;
                            paddingRight = 30,
                            paddingLeft = 30;*/
                        return this.buildOneColumn(width, dividerHeight, paddingRight, paddingLeft);
                        /*} else if (width < 800) {
                            paddingRight = 30,
                            paddingLeft = 30;
                            columnsCount = 2;
                        } else if (width < 1000) {
                            columnsCount = 3;
                        } else {
                            columnsCount = 4;
                        }*/
                    },
                    
                    buildTwoColumn: function (screenWidth, dividerHeight, paddingRight, paddingLeft) {
                        var data = {};
                        data.totalHeight = 0;
                        data.images = new Array();
                        var imageWidth = (screenWidth - paddingRight - paddingLeft) / 2 - dividerHeight;
                        var number = 0;
                        _.each(this.images, function (image) {
                            var imgHeight = image.image_height / (image.image_width / imageWidth);
                            data.images.push({
                                description: image.description,
                                id: image.id,
                                url: image.image_url,
                                styles: {
                                    width: imageWidth,
                                    height: imgHeight,
                                    left: 0 * imageWidth + dividerHeight,
                                    top: data.totalHeight
                                }
                                //tut perepisat vsu logiku
                            });
                            if (number == 1) {
                                number = 0;
                            } else {
                                number++;
                            }
                            data.totalHeight += (imgHeight + dividerHeight);
                        });
                        return data;
                    },
                    
                    buildOneColumn: function (screenWidth, dividerHeight, paddingRight, paddingLeft) {
                        var data = {};
                        data.totalHeight = 0;
                        data.images = new Array();
                        var imageWidth = screenWidth - paddingRight - paddingLeft;
                        _.each(this.images, function (image) {
                            var imgHeight = image.image_height / (image.image_width / imageWidth);
                            data.images.push({
                                description: image.description,
                                id: image.id,
                                url: image.image_url,
                                styles: {
                                    width: imageWidth,
                                    height: imgHeight,
                                    left: 0,
                                    top: data.totalHeight
                                }
                            });
                            data.totalHeight += (imgHeight + dividerHeight);
                        });
                        return data;
                    }
                });
            }
        }
    };
});
