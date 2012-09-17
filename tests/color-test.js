var ansi = require('../ansibuffer.js');

var outBuff = new ansi.ANSIBuffer();
var c = ansi.ANSIChars;
var padright = ansi.ANSIRightAlign;

var timer = setInterval(function () { 
	var tmp = outBuff.bite();
	if ( tmp !== false ) {
		process.stdout.write(tmp);
	}
}, 5);

outBuff.center("`%Right-Align Options:\r\n",65);
outBuff.queue('`4123456789-123456789-123456789-123456789-123456789-'+ "\r\n");
outBuff.queue('`7Pad:`%' + padright('padto40abs',40) + "\r\n");
outBuff.queue('`4XXXX123456789-123456789-123456789-123456789-123456789-'+ "\r\n");
outBuff.queue('`7Pad:`%' + padright('padto40rel',40,false) + "\r\n\r\n");

outBuff.center("`%Color Options:\r\n",65);
outBuff.queue("`1"+c.A176+c.A177+c.A178+" 1"+c.A178+c.A177+c.A176+ " : Dark Red");
outBuff.queue(padright("`9Bright Red "+c.A176+c.A177+c.A178+" 9"+c.A178+c.A177+c.A176, 65) + "\r\n");

outBuff.queue("`2"+c.A176+c.A177+c.A178+" 2"+c.A178+c.A177+c.A176+ " : Dark Green");
outBuff.queue(padright("`0Bright Green "+c.A176+c.A177+c.A178+" 0"+c.A178+c.A177+c.A176, 65) + "\r\n");

outBuff.queue("`3"+c.A176+c.A177+c.A178+" 3"+c.A178+c.A177+c.A176+ " : Dark Yellow");
outBuff.queue(padright("`!Bright Yellow "+c.A176+c.A177+c.A178+" !"+c.A178+c.A177+c.A176, 65) + "\r\n");

outBuff.queue("`4"+c.A176+c.A177+c.A178+" 4"+c.A178+c.A177+c.A176+ " : Dark Blue");
outBuff.queue(padright("`@Bright Blue "+c.A176+c.A177+c.A178+" @"+c.A178+c.A177+c.A176, 65) + "\r\n");


outBuff.queue("`5"+c.A176+c.A177+c.A178+" 5"+c.A178+c.A177+c.A176+ " : Dark Magenta");
outBuff.queue(padright("`#Bright Magenta "+c.A176+c.A177+c.A178+" #"+c.A178+c.A177+c.A176, 65) + "\r\n");

outBuff.queue("`6"+c.A176+c.A177+c.A178+" 6"+c.A178+c.A177+c.A176+ " : Dark Cyan");
outBuff.queue(padright("`$Bright Cyan "+c.A176+c.A177+c.A178+" $"+c.A178+c.A177+c.A176, 65) + "\r\n");

outBuff.queue("`8"+c.A176+c.A177+c.A178+" 8"+c.A178+c.A177+c.A176+ " : Dark Grey");
outBuff.queue(padright("`7Bright Grey "+c.A176+c.A177+c.A178+" 7"+c.A178+c.A177+c.A176, 65) + "\r\n");

outBuff.queue(padright("`%"+c.A176+c.A177+c.A178+" %"+c.A178+c.A177+c.A176+ " : Bright White\r\n",46));


var ender = setTimeout(function() { process.exit(); }, 4000);

