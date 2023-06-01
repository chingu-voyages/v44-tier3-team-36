"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

var fs = require("fs");
function parseTextFile(filePath) {
    if (!fs.existsSync(filePath)) {
        console.error("File ".concat(filePath, " does not exist."));
        return;
    }
    var fileContent = fs.readFileSync(filePath, 'utf-8');
    var lines = fileContent.split('\n');
    lines.shift();
    var locations = [];
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        var columns = line.split(',');
        if (columns.length >= 6) {
            var latitude = parseFloat(columns[4].trim());
            var longitude = parseFloat(columns[5].trim());
            locations.push({ latitude: latitude, longitude: longitude });
        }
    }
    var json = JSON.stringify(locations, null, 2);
    fs.writeFileSync('output.json', json);
    console.log('JSON file created: output.json');
}
var filePath = 'stops.csv';
parseTextFile(filePath);
