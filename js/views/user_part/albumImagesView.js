define([], function() {
    return {
        init: function() {
            if (!window.app.views.AlbumImages) {
                window.app.views.AlbumImages = Backbone.View.extend({
                    initialize: function(options) {
                        this.data = options.data;
                        window.Vent.trigger("setFullscreenImages", { images: options.data.images });
                    },

                    render: function() {
                        var self = this;
                        $(window).on('resize', function() {
                            self.buildView();
                        });

                        setTimeout(function() {
                            self.buildView();
                        }, 100);
                        $(".container").addClass("fullscreen-content");
                        return this;
                    },

                    buildView: function() {
                        this.setElement(this.template({ data: this.buildImagesGrid() }));
                        $("section.page .container").html(this.$el);
                        $(this.$el).find("img.lazy").lazyload({
                            threshold: 200
                        });
                    },

                    events: {
                        "click img.lazy": "openFSImage"
                    },
                    
                    openFSImage: function (ev) {
                        window.Vent.trigger("openFSImage", { image_id: $(ev.currentTarget).data("id") });
                    },

                    buildImagesGrid: function() {
                        var width = $(window).width();
                        var columnsCount;
                        var dividerHeight = 10;
                        var paddingRight = $("section.page .container").css('padding-right').replace("px", ""),
                            paddingLeft = $("section.page .container").css('padding-left').replace("px", "");
                        if (width < 400) {
                            columnsCount = 1;
                        } else if (width < 800) {
                            columnsCount = 2;
                        } else if (width < 1000) {
                            columnsCount = 3;
                        } else {
                            columnsCount = 4;
                        }
                        return this.buildColumns(columnsCount, width, dividerHeight, paddingRight, paddingLeft);
                    },

                    buildColumns: function(columnsCount, screenWidth, dividerHeight, paddingRight, paddingLeft) {
                        var data = {};
                        data.totalHeight = 0;
                        data.images = new Array();
                        var imageWidth = ((screenWidth - paddingRight - paddingLeft) - (dividerHeight * columnsCount - dividerHeight)) / columnsCount;
                        var number = 1;

                        var columnsHeightArr = this.createArray(columnsCount, 0);

                        _.each(this.data.images, function(image) {
                            var imgHeight = image.image_height / (image.image_width / imageWidth);
                            var imgObj = {
                                description: image.description,
                                id: image.id,
                                url: image.image_url,
                                styles: {
                                    width: imageWidth,
                                    height: imgHeight
                                }
                            };

                            imgObj.styles.top = columnsHeightArr[number - 1];
                            if (number - 1 == 0) {
                                imgObj.styles.left = 0;
                            } else {
                                imgObj.styles.left = (number - 1) * imageWidth + (dividerHeight * number - dividerHeight);
                            }
                            columnsHeightArr[number - 1] += (imgHeight + dividerHeight);

                            if (number == columnsCount) {
                                number = 1;
                            } else {
                                number++;
                            }

                            data.images.push(imgObj);
                            data.totalHeight = Math.max.apply(Math, columnsHeightArr);
                        });
                        return data;
                    },

                    createArray: function(size, defaultVal) {
                        var arr = new Array(size);
                        if (arguments.length == 2) {
                            // optional default value
                            for (var i = 0; i < size; ++i) {
                                arr[i] = defaultVal;
                            }
                        }
                        return arr;
                    }
                });
            }
        }
    };
});
