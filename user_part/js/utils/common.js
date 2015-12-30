define(['constants'], function(constants) {
    return {
        isImage: function(file) {
            var splittedFile = file.name.split('.');
            if (splittedFile.length > 0) {
                var fileExt = splittedFile[splittedFile.length - 1].toLowerCase();
                if (constants.SUPPORTED_IMAGES_FORMAT.indexOf(fileExt) > -1) {
                    return true;
                }
            }
            return false;
        }
    };
});
