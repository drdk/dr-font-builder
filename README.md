dr-font-builder
===============

Convert SVG fonts to Truetype, WOFF or EOT formats.

(Basically just a thin wrapper around the brilliant [svg2tff](https://github.com/fontello/svg2ttf), [ttf2woff](https://github.com/fontello/ttf2woff) and [ttf2eot](https://github.com/fontello/ttf2eot) [Fontello](https://github.com/fontello) libraries.)

## Usage

### CLI

```
font-builder <file> [options] 
```

#### Options

* `-f, --formats [string]` - A comma separated list of formats to convert the source file too. Supported formats: `ttf`, `woff` and `eot`. Default is to export all supported formats.
* `-d, --dest [string]` - Destination path of the converted files. Default destination is the directory of the source file.

#### Example

```
font-builder ./my-font.svg -f ttf,woff -o ./dist
```


### Node

```
var builder = require("dr-font-builder");

builder("my-font.svg", ["ttf", "woff"]);
```