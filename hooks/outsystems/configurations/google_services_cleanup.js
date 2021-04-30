var path = require("path");
var fs = require("fs");
var utils = require("./utils");

module.exports = function(context) {
    return new Promise(function(resolve, reject) {
        var wwwpath = utils.getWwwPath(context);
        fs.readdir(wwwpath, function (err, files) {
           files.forEach(file => {
                var configPath = path.join(wwwpath, ".firebase");
                console.log("Cleaning up ", configPath);
                // clean up google-services folder from source directory in project
                utils.rmNonEmptyDir(configPath);
            })
        }
        
        return resolve();
    });
};
