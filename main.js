#!/usr/bin/env node

var fs = require("fs");
var path = require("path");

var supportedFormats = ["svg", "ttf", "woff", "eot"];

if (require.main === module) {
	var optimist = require("optimist")
		.usage("Build fonts from SVG glyphs.\nUsage: $0 [file] -f [string]")
		//.alias('c', 'config')
		.alias('d', 'dest')
		.alias('f', 'formats')
		.check(function(argv){
			if (argv._.length === 0) {
				throw "Input file missing!";
			}
		});
	var argv = optimist.argv;
	var formats = supportedFormats;
	if (argv.formats) {
		formats = argv.formats.split(",").filter(function (format) {
			return (supportedFormats.indexOf(format) > -1);
		});
	}
	build(argv._[0], argv.dest, formats);
}

function build (source, dest, formats) {

	var filename = path.basename(source, path.extname(source));

	if (Array.isArray(dest)) {
		formats = dest;
		dest = null;
	}

	if (typeof dest !== "string") {
		dest = path.dirname(source);
	}

	if (!fs.existsSync(dest)) {
		var mkdirp = require("mkdirp");
		mkdirp.sync(dest);
	}

	formats = formats || supportedFormats;

	if (formats.indexOf("ttf") > -1 || (formats.indexOf("woff") > -1 || formats.indexOf("eot") > -1)) {

		var svg = fs.readFileSync(source, {encoding: "utf8"});
		
		var svg2ttf = require("svg2ttf");
		var ttf = svg2ttf(svg);

		if (formats.indexOf("ttf") > -1) {
			fs.writeFileSync(path.join(dest, filename + ".ttf"), new Buffer(ttf.buffer));
		}

		if (formats.indexOf("woff") > -1) {
			var ttf2woff = require("ttf2woff");
			var woff = ttf2woff(ttf.buffer);
			fs.writeFileSync(path.join(dest, filename + ".woff"), new Buffer(woff.buffer));
		}

		if (formats.indexOf("eot") > -1) {
			var ttf2eot = require("ttf2eot");
			var eot = ttf2eot(ttf.buffer);
			fs.writeFileSync(path.join(dest, filename + ".eot"), new Buffer(eot.buffer));
		}

	}

	if (formats.indexOf("svg") === -1) {
		// clean up
	}

}

module.exports = build;