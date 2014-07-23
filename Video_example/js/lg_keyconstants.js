// using smarttv_getplatform.js
var myplatform = smarttv_getPlatform();

var userAgent = navigator.userAgent;
if (userAgent.search(/NetCast.TV/i) > -1)
{
  var VK_ENTER    =  13; 
  var VK_PAUSE    =  19; 
  var VK_LEFT     =  37; 
  var VK_UP       =  38; 
  var VK_RIGHT    =  39; 
  var VK_DOWN     =  40; 
  var VK_0        =  48; 
  var VK_1        =  49; 
  var VK_2        =  50; 
  var VK_3        =  51; 
  var VK_4        =  52; 
  var VK_5        =  53; 
  var VK_6        =  54; 
  var VK_7        =  55; 
  var VK_8        =  56; 
  var VK_9        =  57; 
  var VK_RED      = 403; 
  var VK_GREEN    = 404; 
  var VK_YELLOW   = 405; 
  var VK_BLUE     = 406; 
  var VK_REWIND   = 412; 
  var VK_STOP     = 413; 
  var VK_PLAY     = 415; 
  var VK_FAST_FWD = 417; 
  var VK_BACK     = 461;
}