

// Some standard "old" ANSI/High-ASCII Characters, in UNICODE.
var ANSIChars = {
  ESC: "\033[",
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
        if ( outChar === "\033" ) {
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
 
  // Intellegent queue - also fix color codes.
  ANSIBuffer.prototype.queue = function(text) {
    if ( typeof text === 'undefined' || text === '' ) { return( this ); }
    text = text.replace(/`([0-9!@#$%])/g, function(match, oper) {
      switch (oper) {
        case '1': return "\033[0m\033[31m";
        case '2': return "\033[0m\033[32m";
        case '3': return "\033[0m\033[33m";
        case '4': return "\033[0m\033[34m";
        case '5': return "\033[0m\033[35m";
        case '6': return "\033[0m\033[36m";
        case '7': return "\033[0m\033[37m";
        case '8': return "\033[0m\033[1;30m";
        case '9': return "\033[0m\033[1;31m";
        case '0': return "\033[0m\033[1;32m";
        case '!': return "\033[0m\033[1;33m";
        case '@': return "\033[0m\033[1;34m";
        case '#': return "\033[0m\033[1;35m";
        case '$': return "\033[0m\033[1;36m";
        case '%': return "\033[0m\033[1;37m";
        case '.': return "";
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
exports.ANSIChars = ANSIChars;
