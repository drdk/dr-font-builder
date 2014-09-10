var fs = require("fs");
var path = require("path");

var allowedFormats = ["svg", "ttf", "woff", "eot"];

if (require.main === module) {
	var optimist = require("optimist")
		.usage("Build fonts from SVG glyphs.\nUsage: font-builder -i [file] -f [string]")
		//.alias('c', 'config')
		.alias('i', 'input')
		//.alias('o', 'output')
		.alias('f', 'formats')
		.check(function(argv){
			if (!argv.input) {
				throw "Input param missing!";
			}
		});
	var argv = optimist.argv;
	var formats;
	if (argv.formats) {
		formats = argv.formats.split(",").filter(function (format) {
			return (allowedFormats.indexOf(format) > -1);
		});
	}
	build(argv.input, formats);
}

function build (source, formats) {

	var filename = source.replace(/\.(svg|ttf|woff|eot)$/, "");

	formats = formats || allowedFormats;

<<<<<<< HEAD
	if (formats.indexOf("ttf") > -1 || (formats.indexOf("woff") > -1 || formats.indexOf("eot") > -1)) {

		var svg = fs.readFileSync(source, {encoding: "utf8"});
		
		var svg2ttf = require("svg2ttf");
		var ttf = svg2ttf(svg);

		if (formats.indexOf("ttf") > -1) {
			fs.writeFileSync(filename + ".ttf", new Buffer(ttf.buffer));
		}
=======
	
	var svgFile = filename + ".svg";
	
	var execPath = path.resolve(process.cwd(), "./node_modules/svg-font-create/svg-font-create.js");
	var args = ["-c", config, "-i", sourceDir, "-o", svgFile];

	execFile(
		execPath,
		args,
		function (err) {

			if (err) {
				throw(err);
			}

			if (formats.indexOf("ttf") > -1 || formats.indexOf("woff") > -1 || formats.indexOf("eot") > -1) {


				fs.readFile(svgFile, {encoding: "utf8"}, function (err, svg) {

					if (err) {
						throw(err);
					}

					var svg2ttf = require("svg2ttf");
					var ttf = svg2ttf(svg);

					if (formats.indexOf("ttf") > -1) {
						var ttfFile = filename + ".ttf";
						fs.writeFile(ttfFile, new Buffer(ttf.buffer), function (err) {
							if (err) {
								throw(err);
							}
							console.log("Built:", ttfFile);
						});
					}

					if (formats.indexOf("woff") > -1) {
						var ttf2woff = require("ttf2woff");
						var woffFile = filename + ".woff";
						var woff = ttf2woff(new Uint8Array(ttf.buffer));
						fs.writeFile(woffFile, new Buffer(woff.buffer), function (err) {
							if (err) {
								throw(err);
							}
							console.log("Built:", woffFile);
						});
					}

					if (formats.indexOf("eot") > -1) {
						var ttf2eot = require("ttf2eot");
						var eotFile = filename + ".eot";
						var eot = ttf2eot(new Uint8Array(ttf.buffer));
						fs.writeFile(eotFile, new Buffer(eot.buffer), function (err) {
							if (err) {
								throw(err);
							}
							console.log("Built:", eotFile);
						});
					}
>>>>>>> a752fdd209d1f2f719e20990efaf0521ce31dbbb

		if (formats.indexOf("woff") > -1) {
			var ttf2woff = require("ttf2woff");
			var woff = ttf2woff(ttf.buffer);
			fs.writeFileSync(filename + ".woff", new Buffer(woff.buffer));
		}

		if (formats.indexOf("eot") > -1) {
			var ttf2eot = require("ttf2eot");
			var eot = ttf2eot(ttf.buffer);
			fs.writeFileSync(filename + ".eot", new Buffer(eot.buffer));
		}

	}

	if (formats.indexOf("svg") === -1) {
		// clean up
	}

}

module.exports = build;