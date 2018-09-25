const express = require("express");
const fs = require("fs");
const app = express();

/** Implementing Simple Music Server using Express JS **/
app.get("/music", (req,res) => {
	// File to be served

	const fileId = req.query.id;
	const file = __dirname + "/../public/music/" + fileId;

	fs.exists(file,function(exists){
		if(exists) {
			const rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else {
			res.send("Its a 404");
			res.end();
		}

	});

});

app.get("/download", (req,res) => {
	const fileId = req.query.id;
	const file = __dirname + "/../public/music/" + fileId;

	fs.exists(file,function(exists){
		if(exists) {
			res.setHeader("Content-disposition", "attachment; filename=" + fileId);
			const rstream = fs.createReadStream(file);
			rstream.pipe(res);
		}
		else {
			res.send("Its a 404");
			res.end();
		}
	});


});

app.use(express.static(__dirname + "/../public/"));

app.listen(8000, () => console.log("App listening on port 8000!") );
