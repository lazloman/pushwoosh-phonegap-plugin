var path = require("path");
var fs = require("fs");
var utils = require("./utils");

module.exports = function(context) {
    return new Promise(function(resolve, reject) {
        var wwwpath = utils.getWwwPath(context);
       fs.readdir(wwwpath, function(err, files) {

	files.forEach(function(file) {
		var stats = fs.statSync(file);
		var isDir = stats.isDirectory(file);
		
		if (file.indexOf(".firebase") !== -1 && isDir) {
			console.log(isDir);
			console.log(file.indexOf(".firebase"));
			var configPath = path.join(wwwpath, file);
			
			try{
				fs.rmdir(configPath, { recursive: true }, (err) => {
				console.log("Removed ", configPath);
			});
			} catch(err) {
				console.log("Error deleting directory " + err);
			}
		}
		});
	})   
        
        return resolve();
    });
};
