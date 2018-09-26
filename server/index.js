const fs = require("fs");
const musicmetadata = require("music-metadata");
const formidable = require("formidable");

// Mongoose
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/music_streamer", { useNewUrlParser: true });
const connection = mongoose.connection;

// Express
const express = require("express");
const app = express();

// Gridfs
const gridfs = require("gridfs-stream");
gridfs.mongo = mongoose.mongo;

// Mongoose connection error check
connection.on("error", console.error.bind(console, "connection error:"));

// Mongoose connection
connection.once("open", () => {
	// Setup gridfs
	const gfs = gridfs(connection.db);

	console.log("Mongo connection established.");

	// Handle file uploads
	app.post("/upload", (req, res) => {
		var form = new formidable.IncomingForm();

		form.multiples = true;

		form.parse(req, function(err, fields, files) {
			if (err) next(err);
		});

		form.onPart = function(part) {
			const writestream = gfs.createWriteStream({ filename: part.filename });

			part.pipe(writestream);

			writestream.on("close", function (file) {
				res.send("File Created : " + file.filename);
			});
		};
	});

	// Handle file streaming
	app.get("/music", (req,res) => {
		const filename = req.query.id;
		const reqType = req.query.type;

		gfs.exist({ filename }, function (err, file) {
			if (err || !file) {
				res.send("File Not Found");
			} else {
				const rstream = gfs.createReadStream({ filename: filename });

				switch (reqType) {
					case "stream":
						rstream.pipe(res);

						break;

					case "meta":
						res.setHeader("Access-Control-Allow-Origin", "*");
						res.setHeader("Content-type", "application/json");

						const parser = musicmetadata.parseStream(rstream).then( metadata => {
							res.send(metadata);
							res.end();
						}).catch(err => {
							console.error(err);
							res.send(err);
							res.end();
						});

						break;

					default:
						res.setHeader("Content-disposition", "attachment; filename=" + filename);
						rstream.pipe(res);
				}
			}
		});
	});
});

app.use(express.static(__dirname + "/../public/"));

app.listen(8000, () => console.log("App listening on port 8000!") );
