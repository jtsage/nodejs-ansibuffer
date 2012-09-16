var ansi = require('../ansibuffer.js');

var outBuff = new ansi.ANSIBuffer();
var c = ansi.ANSIChars;

var timer = setInterval(function () { 
	var tmp = outBuff.bite();
	if ( tmp !== false ) {
		process.stdout.write(tmp);
	}
}, 5);

outBuff.center("`%Color Options:\r\n");
outBuff.queue("`1"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Red              ");
outBuff.queue("`9"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright Red\r\n");
outBuff.queue("`2"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Greeen           ");
outBuff.queue("`0"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright Green\r\n");
outBuff.queue("`3"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Yellow           ");
outBuff.queue("`!"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright Yellow\r\n");

outBuff.queue("`4"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Blue             ");
outBuff.queue("`@"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright Blue\r\n");
outBuff.queue("`5"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Magenta          ");
outBuff.queue("`#"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright Magenta\r\n");
outBuff.queue("`6"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Cyan             ");
outBuff.queue("`$"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright Cyan\r\n");

outBuff.queue("`7"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Light Grey            ");
outBuff.queue("`8"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Dark Grey\r\n");
outBuff.queue("`%"+c.A176+c.A177+c.A178+c.A177+c.A176+ " : Bright White\r\n");

var ender = setTimeout(function() { process.exit(); }, 4000);

