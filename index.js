var path = require("path"),
    fs = require("fs"),
    parse = require('xml-parser'),
    walk = require("walk");

module.exports = function(cb, dir, throwOnIssue) {

    var dirname = path.resolve(process.cwd(), (dir || "test-reports"));

    console.log("start", arguments, dirname);
    var walker = walk.walk(dirname),
        failures = 0;

    walker.on("file", function(root, fileStat, next) {
        //console.log(arguments);
        if (fileStat.name.match(/TEST-.*\.xml/) != null) {
            fs.readFile(path.resolve(root, fileStat.name), 'utf8', function (buffer, xml) {
                //console.log(arguments);
                var obj = parse(xml);
                if (obj && obj.root.attributes.failures) {
                    failures += (1 * obj.root.attributes.failures);
                    next();
                } else {
                    var issue = "Could not read xml";
                    cb(issue);
                    if (throwOnIssue) {
                        throw issue;
                    }
                }
            });
        }
    });

    walker.on("end", function() {
        //console.log("end");
       cb(null, failures);
       if (throwOnIssue) {
           throw failures + " test failures";
       }
    });
}