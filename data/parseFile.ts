"use strict";
// import * as fs from "fs";
Object.defineProperty(exports, "__esModule", { value: true });
// interface Location {
//   latitude: string;
//   longitude: string;
// }
// function parseTextFile(filePath: string): void {
//   if (!fs.existsSync(filePath)) {
//     console.error("File ${filePath} does not exist.");
//     return;
//   }
//   const fileContent: string = fs.readFileSync(filePath, "utf-8");
//   const lines: string[] = fileContent.split("\n");
//   lines.shift();
//   const locations: Location[] = [];
//   for (const line of lines) {
//     const columns: string[] = line.split(",");
//     const latitude: string = columns[4].trim();
//     const longitude: string = columns[5].trim();
//     locations.push({ latitude, longitude });
//     console.log("Latitude:", latitude);
//     console.log("Longitude:", longitude);
//     console.log("----------------------");
//   }
//   const json = JSON.stringify(locations, null, 2);
//   console.log(json);
// }
// const filePath: string = "stops.csv";
// parseTextFile(filePath);
//-------------------------------------------------
// import * as fs from 'fs';
// // Read the text file
// const textData = fs.readFileSync('stops.txt', 'utf-8');
// // Split the text into lines
// const lines = textData.split('\n');
// // Process the lines and create an array of transit items
// const transitItems = lines.map(line => {
//   const [latitude, longitude, route] = line.split(',');
//   return {
//     latitude: parseFloat(latitude),
//     longitude: parseFloat(longitude),
//     route: route.trim(),
//   };
// });
// // Convert the transit items to JSON format
// const jsonData = JSON.stringify(transitItems, null, 2);
// // Write the JSON data to a new file
// fs.writeFileSync('stops.json', jsonData, 'utf-8');
// console.log('JSON file created successfully.');
//-----------------------------------------------
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
