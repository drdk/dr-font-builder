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

	if (formats.indexOf("ttf") > -1 || (formats.indexOf("woff") > -1 || formats.indexOf("eot") > -1)) {

		var svg = fs.readFileSync(source, {encoding: "utf8"});
		
		var svg2ttf = require("svg2ttf");
		var ttf = svg2ttf(svg);

		if (formats.indexOf("ttf") > -1) {
			fs.writeFileSync(filename + ".ttf", new Buffer(ttf.buffer));
		}

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