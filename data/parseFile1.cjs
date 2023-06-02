var fs = require("fs");

function parseTextFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error("File " + filePath + " does not exist.");
    return;
  }

  var fileContent = fs.readFileSync(filePath, "utf-8");
  var lines = fileContent.split("\n");
  lines.shift();
  var shapes = {};

  for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
    var line = lines_1[_i];
    var columns = line.split(",");
    if (columns.length >= 4) {
      var shape_id = columns[0].trim().charAt(0);
      var latitude = parseFloat(columns[1].trim());
      var longitude = parseFloat(columns[2].trim());

      if (!shapes.hasOwnProperty(shape_id)) {
        shapes[shape_id] = {
          shape_id: shape_id,
          coordinates: [],
        };
      }

      var shape = shapes[shape_id];
      var coordinate = { latitude: latitude, longitude: longitude };

      if (!coordinateExists(shape.coordinates, coordinate)) {
        shape.coordinates.push(coordinate);
      }
    }
  }

  var shapePairs = Object.values(shapes);

  var json = JSON.stringify(shapePairs, null, 2);
  fs.writeFileSync("output.json", json);
  console.log("JSON file created: output.json");
}

function coordinateExists(coordinates, coordinate) {
  return coordinates.some(function (c) {
    return c.latitude === coordinate.latitude && c.longitude === coordinate.longitude;
  });
}

var filePath = "shapes.csv";
parseTextFile(filePath);