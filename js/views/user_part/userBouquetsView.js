define([], function() {
    return {
        init: function() {
            if (!window.app.views.UserBouquets) {
                window.app.views.UserBouquets = Backbone.View.extend({
                    initialize: function(options) {
                        this.images = options.data;
                    },

                    render: function() {
                        this.setElement(this.template({ data: this.buildImagesGrid() }));

                        $(".container").addClass("fullscreen-content");

                        $(this.$el).find("img").lazyload();

                        return this;
                    },

                    events: {
                        
                    },

                    buildImagesGrid: function() {
                        var width = $(window).width();
                        var columnsCount;
                        var dividerHeight = 10;
                        var paddingRight = 80,
                            paddingLeft = 80;
                        if (width < 400) {
                            columnsCount = 1;
                            paddingRight = 30,
                            paddingLeft = 30;
                        } else if (width < 800) {
                            paddingRight = 30,
                            paddingLeft = 30;
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

                        _.each(this.images, function(image) {
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
