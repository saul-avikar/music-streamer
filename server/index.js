const express = require("express");
const fs = require("fs");
const musicmetadata = require("music-metadata");

const mongoose = require("mongoose");
const gridfs = require("gridfs-stream");
const formidable = require("formidable");

const app = express();

mongoose.connect("mongodb://localhost:27017/music_streamer", { useNewUrlParser: true });
gridfs.mongo = mongoose.mongo;

const connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

connection.once("open", () => {
	const gfs = gridfs(connection.db);
	console.log("Mongo connection established.");

	app.post("/upload", (req, res) => {
		var form = new formidable.IncomingForm();

		form.multiples = true;

		form.parse(req, function(err, fields, files) {
			if (err) next(err);

			// TODO: make sure my_file and project_id exist
			/*
				fs.rename(files.my_file.path, fields.project_id, function(err) {
					if (err) next(err);
					res.end();
				});
			*/
			console.log(err, fields, files);
		});
		//const writestream = gfs.createWriteStream({ filename: db_filename });
	});
});
/*
app.get("/music", (req,res) => {
	// File to be served

	const fileId = req.query.id;
	const type = req.query.type;
	const file = __dirname + "/../public/music/" + fileId;

	fs.exists(file,function(exists){
		if(exists) {
			const rstream = fs.createReadStream(file);
			switch (type) {
				case "stream":
					rstream.pipe(res);

					break;

				case "meta":
					res.setHeader("Access-Control-Allow-Origin", "*");
					res.setHeader("Content-type", "application/json");

					const parser = musicmetadata.parseStream(rstream).then( (metadata) => {
						res.send(metadata);
						res.end();
					//	rstream.close();
					}).catch(err => {
						console.error(err);
						res.send(err);
						res.end();
					});

					break;

				default:
					res.setHeader("Content-disposition", "attachment; filename=" + fileId);
					rstream.pipe(res);
			}

		} else {
			res.send("Its a 404");
			res.end();
		}

	});
});
*/

app.use(express.static(__dirname + "/../public/"));

app.listen(8000, () => console.log("App listening on port 8000!") );
