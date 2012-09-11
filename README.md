ANSIBuffer
==========

Purpose
-------
nodejs-ANSIBuffer is a chunked, escape code aware input/output buffer for use in
BBS-like telnet programs.  It's *primary* use it to provide a factory to mimic the
delay that we were all used to in the old BBS days.

TOC
---
* [Usage](#usage)
* [ASNIBuffer API](#api)
* [ANSIChars](#chars)
* [Backtick Color](#backtick)
* [Status](#status)
* [Contributors](#contrib)
* [Compatibility](#compat)
* [Licence](#lic)

<a name="usage"></a>Usage
-----
	var net = require('net');
	var ansi = require('nodejs-ansibuffer');

	var server = net.createServer(function(c) { //'connection' listener
		console.log('server connected');
  
		var outputBuffer = new ansi.ANSIBuffer();
		var delayedWriter = setInterval(
			function() { 
				var tmp = outputBuffer.bite();
				if ( tmp !== false ) { c.write(tmp); } 
			}, 15);
			
		// Set character mode (client side - do not wait for CR-LF)
		c.write(String.fromCharCode(255) + String.fromCharCode(253) + String.fromCharCode(34),'ascii');
		// No local (client-side) echo
		c.write(String.fromCharCode(255) + String.fromCharCode(251) + String.fromCharCode(1),'ascii');
  
		outputBuffer.queue(" `9W`1elcome `9T`1o `9ANSIB`1uffer `2!!");
	});
	server.listen(8124, function() { //'listening' listener
		console.log('server bound');
	});


    
<a name="api"></a>ANSIBuffer() API
----------------

To create a new buffer, import the module, and create a new ANSIBuffer() object.

	var ansi = require('nodejs-ansibuffer');
	var buffer = new ansi.ANSIBuffer();

#### ANSIBuffer.dump()
Returns the full contents of the buffer, while emptying it.

#### ANSIBuffer.bite()
Returns an inteligent "chunk" of the buffer, of variable length.  Great pains are
taken to never "break" an ANSI control sequence - odd things happen when there is
a manufactured delay in these - well, sometimes anyway.

#### ANSIBuffer.clear()
Empty the buffer, drop all the contents.

#### ANSIBuffer.queue(<text>)
Queue text for display.  This can be plain text, a string containing full escape
codes, or a string containing "Legend of the Red Dragon" backtick codes. (see below)


## <a name="chars"></a>ANSIChars
This is an object that contains some well-used high-ASCII characters, reimagined
in unicode.

 * A176 - &#x2591; - Light Shade
 * A177 - &#x2592; - Medium Shade
 * A178 - &#x2593; - Dark Shade
 * A219 - &#x2588; - Full Fill
 * A220 - &#x2584; - Bottom Half Box
 * A221 - &#x258c; - Left Half Box
 * A222 - &#x2590; - Right Half Box
 * A223 - &#x2580; - Top Half Box
 * A254 - &#x25aa; - Center Square
 * ESC - Escape Sequence Start "{ESC}["

<a name="backtick"></a>Backtick Color
-----------------
These are the backtick color codes based on how the [Legend of the Red Dragon](http://en.wikipedia.org/wiki/Legend_of_the_Red_Dragon) did things.

 * <span style="background-color: black; color: rgb(170,0,0)">`1 : Dark Red</span>
 * <span style="background-color: black; color: rgb(0,170,0)">`2 : Dark Green</span>
 * <span style="background-color: black; color: rgb(170,85,0)">`3 : Dark Yellow or Brown</span> (depends on terminal)
 * <span style="background-color: black; color: rgb(0,0,170)">`4 : Dark Blue</span>
 * <span style="background-color: black; color: rgb(170,0,170)">`5 : Dark Magenta or Purple</span> (depends on terminal)
 * <span style="background-color: black; color: rgb(0,170,170)">`6 : Dark Cyan</span>
 * <span style="background-color: black; color: rgb(170,170,170)">`7 : Light Grey (a.k.a. Dark White) (a.k.a. Normal)</span>
 * <span style="background-color: black; color: rgb(85,85,85)">`8 : Dark Grey (a.k.a. Light Black)</span>
 * <span style="background-color: black; color: rgb(255,85,85)">`9 : Bright Red</span>
 * <span style="background-color: black; color: rgb(85,255,85)">`0 : Bright Green</span>
 * <span style="background-color: black; color: rgb(255,255,85)">`! : Bright Yellow</span>
 * <span style="background-color: black; color: rgb(85,85,255)">`@ : Bright Blue</span>
 * <span style="background-color: black; color: rgb(255,85,255)">`# : Bright Magenta</span>
 * <span style="background-color: black; color: rgb(85,255,255)">`$ : Bright Cyan</span>
 * <span style="background-color: black; color: rgb(255,255,255)">`% : Bright White</span>

### Mac Defaults:
Note the lack of dark grey.  This is an issue with the default colors on the mac
terminal. (taken from iTerm - terminal.app is even worse)

![Mac Color Options](https://raw.github.com/jtsage/nodejs-ansibuffer/master/screens/color-test-mac.png)

## <a name="status"></a>Current status
This module is in a development stage. It's probably broken horribly in places - not sure.


## <a name="contrib"></a>Contributors
* [J.T. Sage](https://github.com/jtsgae/)

## <a name="compat"></a>Compatibility
This module was only tested using node >= 0.8.8.  There is no reason it shouldn't
run under earlier versions though.

## <a name="lic"></a>Licence
node-ansibuffer is licensed under the MIT license. Or the BSD license.  Or no license if 
that's more convient for you.

