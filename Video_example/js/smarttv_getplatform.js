// parameters: none
// returns: associative array
// smarttv_platform["manufacturer"] = manufacturer name - for STA 2.5+ platforms, this variable is set to Smart TV Alliance
// smarttv_platform["type"] = type name (e.g. NetCast.TV-2013 - for STA 2.5+ platforms, this variable is filled with the full UA string)
// smarttv_platform["ua"] = full user agent string 
// smarttv_platform["version"] = smart tv specification version (e.g. 2.0) - for STA 2.5+ platforms, this variable is equal to the version number part of the "SmartTvA/X.Y.Z" string (e.g. 2.5.0)
function smarttv_getPlatform ()
{
  /*jshint sub: true */
  var userAgent = navigator.userAgent;
  var smarttv_platform = [];
  smarttv_platform["ua"] = userAgent;
  smarttv_platform["manufacturer"] = "unknown";
  smarttv_platform["type"] = "unknown";
  smarttv_platform["version"] = "unknown";
  var substr_pos;
   
  // check if this is a Smart TV Alliance 2.5+ compliant platform
  substr_pos=userAgent.search(/SmartTvA/i);
  if (substr_pos > -1)
  {
    // this is a Smart TV Alliance 2.5+ compliant platform with a new UA identification
    smarttv_platform["type"]=userAgent;
    smarttv_platform["manufacturer"]="Smart TV Alliance";
    smarttv_platform["version"]=userAgent.substr(substr_pos+9,5);
    return smarttv_platform;
  }

  // for STA Specification 2.0 (or older) devices, the older identification method is used as shown below (this example is not exhaustive for all STA manufacturers): 

  // check if this is the Smart TV Alliance SDK
  substr_pos=userAgent.search(/Chromium\/18/i);
  if (substr_pos > -1)
  {
    substr_pos=userAgent.search(/Linux i686/i);
    if (substr_pos > -1)
    {
      smarttv_platform["type"]=userAgent;
      smarttv_platform["manufacturer"]="Smart TV Alliance SDK";
      smarttv_platform["version"]="2.0";
    }
  }
  
  // check for specific manufacturers (overriding STA SDK option)
  substr_pos=userAgent.search(/NetCast.TV-2013/i);
  if (substr_pos > -1)
  {
    smarttv_platform["type"]=userAgent.substr(substr_pos, 15);
    smarttv_platform["manufacturer"]="LG";
    smarttv_platform["version"]="2.0";
  }
  substr_pos=userAgent.search(/NetCast.TV-2012/i);
  if (substr_pos > -1)
  {
    smarttv_platform["type"]=userAgent.substr(substr_pos, 15);
    smarttv_platform["manufacturer"]="LG";
    smarttv_platform["version"]="1.0";
  }
  else
  {
    substr_pos=userAgent.search(/NetCast.Media/i);
    if (substr_pos > -1)
    {
      smarttv_platform["type"]=userAgent.substr(substr_pos, 18);
      smarttv_platform["manufacturer"]="LG";
    }
    else
    {
      substr_pos=userAgent.search(/NetCast/i);
      if (substr_pos > -1)
      {
       smarttv_platform["type"]=userAgent.substr(substr_pos, 12);
       smarttv_platform["manufacturer"]="LG";
      }
    }
  }
  substr_pos=userAgent.search(/NETTV\/4/i);
  if (substr_pos > -1)
  {
    smarttv_platform["type"]=userAgent.substr(substr_pos, 11);
    smarttv_platform["manufacturer"]="PHILIPS";
    smarttv_platform["version"]="1.0";
  }
  substr_pos=userAgent.search(/NETTV\/4.2/i);
  if (substr_pos > -1)
  {
    smarttv_platform["type"]=userAgent.substr(substr_pos, 11);
    smarttv_platform["manufacturer"]="PHILIPS";
    smarttv_platform["version"]="2.0";
  }
  else
  {
    substr_pos=userAgent.search(/NETTV/i);
    if (substr_pos > -1)
    {
      smarttv_platform["type"]=userAgent.substr(substr_pos, 11);
      smarttv_platform["manufacturer"]="PHILIPS";
    }
  }  
  substr_pos=userAgent.search(/TOSHIBA-DTV/i);
  if (substr_pos > -1)
  {
    smarttv_platform["type"]=userAgent.substr(substr_pos, 11);
    smarttv_platform["manufacturer"]="TOSHIBA";
    smarttv_platform["version"]="2.0";
  }
  return smarttv_platform;
}
