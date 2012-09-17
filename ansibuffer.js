"use strict";

// Some standard "old" ANSI/High-ASCII Characters, in UNICODE.
var ANSIChars = {
  ESC: "\x1b[",
  A176: "\u2591",
  A177: "\u2592",
  A178: "\u2593",
  A219: "\u2588",
  A220: "\u2584",
  A221: "\u258c",
  A222: "\u2590",
  A223: "\u2580",
  A254: "\u25aa"
};
exports.ANSIChars = ANSIChars;

var ANSIRightAlign = function(text, endcol, absolute) {
  if ( typeof absolute !== 'boolean' ) { absolute = true; }
  
  var cleantext = text.replace(/`([0-9!@#$%])/g, '').replace(/\x1b\[[0-9;]+m/g, '').replace(/\r|\n/g, '');
  
  if ( absolute === true ) {
    return ( 
      "\x1b[" +  endcol + "G" + 
      "\x1b[" + cleantext.toString().length + "D" + 
      text
    );
  } else {
    return (
      "\x1b[" + endcol + "C" +
      "\x1b[" + cleantext.toString().length + "D" + 
      text
    );
  }
}
exports.ANSIRightAlign = ANSIRightAlign;

var ANSICenter = function(text,width) {
  if ( typeof text === 'undefined' || text === '' ) { return ( '' ); }
  if ( typeof width === 'undefined' ) { width = 80; }
  var centercol = (width / 2) - 1;
  var cleantext = text.replace(/`([0-9!@#$%])/g, '').replace(/\x1b\[[0-9;]+m/g, '').replace(/\r|\n/g, '');
  var paddy = '';
  for ( var i = 0; i < (centercol - (cleantext.length / 2)); i++ ) {
    paddy = paddy + ' ';
  }
  return (paddy + text);
}
exports.ANSICenter = ANSICenter;

// Make an ANIS Output buffer - that respects escape sequences.
var ANSIBuffer = (function(){
  function ANSIBuffer() {
    var ansibuffer = Object.create( Array.prototype );
    ansibuffer = (Array.apply( ansibuffer, arguments ) || ansibuffer);
 
    ANSIBuffer.injectClassMethods( ansibuffer );

    return( ansibuffer );
  }
 
  // Inject the methods needed
  ANSIBuffer.injectClassMethods = function( ansibuffer ){
    for (var method in ANSIBuffer.prototype){
      if (ANSIBuffer.prototype.hasOwnProperty( method )){
        ansibuffer[ method ] = ANSIBuffer.prototype[ method ]; 
      }
    }
    return( ansibuffer );
  };
  
  // Get all output - no chunks, all at once. (quick mode)
  ANSIBuffer.prototype.dump = function() {
    var retty = this.join('');
    this.length = 0;
    return retty;
  }
  
  // Chunked output method - keep escape sequences semi-intact.
  ANSIBuffer.prototype.bite = function() {
    var self = this;
    if ( self.length === 0 ) { return false; }
    if ( self.length > 4 ) {
      var escseq = false;
      var i = 0;
      var outString = '';
      while ( i < 5 ) {
        var outChar = self.shift(); i++;
        if ( outChar === "\x1b" ) {
          var string = "\x1b"; escseq = true;
          while (escseq === true ) {
            outChar = self.shift(); i++;
            var code = outChar.charCodeAt(0);
            string = string + outChar;
            if ( ! ( code === 91 || code === 59 || ( code > 47 && code < 58 ) ) ) { 
              escseq = false; outString = outString + string;
            }
          }
        } else {
          outString = outString + outChar;
        }
      }
      return outString;
    } else {
      var ret = self.shift(); 
      return( ret );
    }
  }
 
  ANSIBuffer.prototype.center = function(text,width) {
    this.queue(ANSICenter(text,width));
  }

  // Intellegent queue - also fix color codes.
  ANSIBuffer.prototype.queue = function(text) {
    if ( typeof text === 'undefined' || text === '' ) { return( this ); }
    text = text.replace(/`([0-9!@#$%.])/g, function(match, oper) {
      switch (oper) {
        case '1': return "\x1b[0m\x1b[31m";
        case '2': return "\x1b[0m\x1b[32m";
        case '3': return "\x1b[0m\x1b[33m";
        case '4': return "\x1b[0m\x1b[34m";
        case '5': return "\x1b[0m\x1b[35m";
        case '6': return "\x1b[0m\x1b[36m";
        case '7': return "\x1b[0m\x1b[37m";
        case '8': return "\x1b[0m\x1b[1;30m";
        case '9': return "\x1b[0m\x1b[1;31m";
        case '0': return "\x1b[0m\x1b[1;32m";
        case '!': return "\x1b[0m\x1b[1;33m";
        case '@': return "\x1b[0m\x1b[1;34m";
        case '#': return "\x1b[0m\x1b[1;35m";
        case '$': return "\x1b[0m\x1b[1;36m";
        case '%': return "\x1b[0m\x1b[1;37m";
        case '.': return "\x1b[0m";
        default: return '`' + oper;
      }
    });
    var textarray = text.split('');
    for ( var i = 0; i < textarray.length; i++ ) {
      Array.prototype.push.call( this, textarray[i] );
    }
    return( this );
  }
  
  // Clear the buffer.
  ANSIBuffer.prototype.clear = function() {
    this.length = 0;
    return( this );
  }
  
  return( ANSIBuffer );
}).call( {} );

exports.ANSIBuffer = ANSIBuffer;
