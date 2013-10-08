// using smarttv_getplatform.js
var myplatform = smarttv_getPlatform();                                      
                                                                             
function onload_script()                                                   
{                                                                            
  if (myplatform["manufacturer"] == "LG")                                    
  {                                                                          
    // no built-in keyboard                                                  
    // include on-screen keyboard in your app (beware of cross-domain issues)
    var lghead = document.getElementsByTagName("head")[0];
    var lgscript = document.createElement('script');
    var lgstyle= document.createElement("link");                             
    lgstyle.type = "text/css";                                               
    lgstyle.rel = "stylesheet";                             
    // the directory name must always be jslgVKeyboard                 
    lgstyle.href = "jslgVKeyboard/LgVKeyboard.css";                       
    lghead.appendChild(lgstyle);          
    var lgscript = document.createElement("script");                                                 
    lgscript.type = "text/javascript";
    // the directory name must always be jslgVKeyboard
    lgscript.src = "jslgVKeyboard/LgVKeyboard.js";     
    lgscript.id = "mainVKScript";                   
    // use the provided event handler only -> rename 'onkeydownhandler' to your keydown event handler                                   
    lgscript.onload = "lgKb.onKeyDown = onkeydownhandler";     
    lghead.appendChild(lgscript);                                            
  }                                                                          
  else                                                                       
  {                                                                          
    // you can use your own event handler - keyboard is built-in -> rename 'onkeydownhandler' to your keydown event handler             
    document.addEventListener("onkeydown", onkeydownhandler, true);          
  }                                                                          
}  

// invoke this in the <script> tag in the <head> of your page, NOT in the onload eventhandler
onload_script();      

// make sure you set the charset of your html to UTF-8 using e.g. the tag <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">                                                                    