/*
	 LCD TV LABORATORY, LG ELECTRONICS INC., SEOUL, KOREA
	 Copyright(c) 2010 by LG Electronics Inc.

	 All rights reserved. No part of this work may be reproduced, stored in a
	 retrieval system, or transmitted by any means without prior written
	 permission of LG Electronics Inc.
	 
	 Developer : Sungsik Kim (sungsik74.kim@lge.com)
	 			 Yejeong Park (yejeong.park@lge.com)
*/

(function(){

	function languageInfo(id, code, title, langJs, bSel)
	{
		this.id = id;
		this.code = code;
		this.title = title;
		this.langJs = langJs;
		this.bSel = bSel;
		this.bCandidate = false;
	}
	
	function OnWindowFocusIn(event)
	{
		lgKb.WindowFocusIn(event);
	}

	function OnWindowFocusOut(event)
	{
		lgKb.WindowFocusOut(event);
	}

	function onKbclick(event)
	{
		lgKb.kbClick(event);
	}

	function onMouseOver(event)
	{
		lgKb.keyMouseOver(event);
	}
	
	function onMouseOut(event)
	{
		lgKb.keyMouseOut(event);
	}

	function onMouseDown(event)
	{
		lgKb.keyMouseDown(event);
	}
	
	function onMouseUp(event)
	{
		lgKb.keyMouseDown(event);
	}
	
	function OnMouseOn()
	{
		lgKb.lgMouseOn(true);
	}
	
	function OnMouseOff()
	{
		lgKb.lgMouseOn(false);
	}
	
	function OnRemoteKeyDown(event)
	{
		lgKb.onRemoteKeyDown(event);
	}

	function OnRemoteKeyUp(event)
	{
		lgKb.onRemoteKeyUp(event);
	}
	
	function onPopupMouseOver(event)
	{
		lgKb.popupMouseOver(event);
	}
	
	function onPopupMouseOut(event)
	{
		lgKb.popupMouseOut(event);
	}
	
	function onPopupMouseDown(event)
	{
		lgKb.popupMouseDown(event);
	}
	
	function onPopupMouseUp(event)
	{
		lgKb.popupMouseUp(event);
	}
	
	function onClearCaretInfo()
	{
		lgKb.clearCaretInfo();
	}
	
	function initKeyboard()
	{
		try
		{
			lgKb.initKeyboard();
			
			window.addEventListener("DOMFocusIn", OnWindowFocusIn, false);
			window.addEventListener("DOMFocusOut", OnWindowFocusOut, false);
		}
		catch(err)
		{
			
		}
	}
	
	function onLoadLgVKCommonJs()
	{
		lgKb.onLoadLgVKCommonJs();
	}
	
	function initKeyboardLayout()
	{
		lgKb.initKeyboardLayout();
	}

	function cleanKeyboard(event)
	{
		lgKb.cleanKeyboard(event);
	}
		
	if(top.lgKb)
	{
		window.lgKb = top.window.lgKb; 
	}
	else
	{
		window.lgKb = {
			nUpperPos : "0px",
			nLowerPos : "408px",
			bKeyMouseOver : false,
			bShowVKeyboard : false,
			bShowPopupLangSel : false,
			bMouseOn : true,
			bCapsLock : false,
			bShift : false,
			targetElement : "",
			targetClass : "",
			targetCssText : "",
			mouseOverKeyId : "wkk_key_206", 
			popOverKeyId : "popup_item_00",
			vKeyboard : null,
			popupLangSel  : null,
			vKbJsRootPath : "",
			category : "",
			selectedLang : "",
			selectedCaps : "unshift",
			selectedChar : "",
			nextLang : "",
			nextCaps : "shift",
			nextChar : "",
			langInfoList: Array(),
			onKeyDown :				//	 user's keydown event handler
				function (event)
				{
				},
			onKeyUp :				//	 user's keyup event handler
				function (event)
				{
				},
			keyMouseOver : 
				function (event)
				{
					lgKb.bKeyMouseOver = true;
					doHighlight(event);	
				},
			keyMouseOut : 
				function (event)
				{
					lgKb.bKeyMouseOver = false;
					doHighlight(event);
				},
			keyMouseDown : 
				function (event)
				{
					//	add your codes
				},
			keyMouseUp : 
				function (event)
				{
					//	add your codes
				},
			popupMouseOver : 
				function (event)
				{
					popHighlight(event);
				},
			popupMouseOut : 
				function (event)
				{
					popHighlight(event);
				},
			popupMouseDown : 
				function (event)
				{
					popHighlight(event);
				},
			popupMouseUp : 
				function (event)
				{
					popHighlight(event);
				},
			lgMouseOn :
				function (bOn)
				{
					lgKb.bMouseOn = bOn;
					if(bOn)
					{
						if(lgKb.bShowPopupLangSel)
						{
							lgKb.fireMouseOut(lgKb.popOverKeyId);
						}
						else if(lgKb.bShowVKeyboard)
						{
							lgKb.fireMouseOut(lgKb.mouseOverKeyId);	
						}
						
					}
					else
					{
						if(lgKb.bShowPopupLangSel)
						{
							lgKb.fireMouseOver(lgKb.popOverKeyId);
						}
						else if(lgKb.bShowVKeyboard)
						{
							lgKb.fireMouseOver(lgKb.mouseOverKeyId);	
						}
						 
					}
				},
			onRemoteKeyDown :
				function (event)
				{
					remoteKeyDown(event);
				},
			onRemoteKeyUp :
				function (event)
				{
					remoteKeyUp(event);
				},
			fireMouseOver :
				function (keyId)
				{
					var event = document.createEvent("MouseEvent");
					event.initEvent("mouseover", true, true);
					document.getElementById(keyId).dispatchEvent(event);
				},
			fireMouseOut :
				function (keyId)
				{
					var event = document.createEvent("MouseEvent");
					event.initEvent("mouseout", true, true);
					document.getElementById(keyId).dispatchEvent(event);
				},
			fireMouseClick :
				function (keyId)
				{
					var event = document.createEvent("MouseEvent");
					event.initEvent("click", true, true);
					document.getElementById(keyId).dispatchEvent(event);
				},
			WindowFocusIn : 
				function (event)
				{
					if(lgKb.targetElement)
					{
						//	add your codes
					}
					else if( (event.target.tagName=="TEXTAREA")
							|| ( (event.target.tagName=="INPUT") && ( (event.target.type=="text") || (event.target.type=="password") ) ) )
					{
						lgKb.focusIn(event);
					}
				},
			WindowFocusOut :
				function (event)
				{
					if(lgKb.bShowPopupLangSel)
					{
						//	add your codes
					}
					else if(lgKb.bKeyMouseOver)
					{
						currentCaretIdx = lgKb.targetElement.selectionStart;
						lgKb.setPreviousFocus();
					}
					else
					{
						lgKb.focusOut();
					}					
				},
			kbClick :
				function (event)
				{
					keyStroke(event);
					lgKb.refreshFocus();
				},
			clearCaretInfo :
				function ()
				{
					setNewMode(0);	
					isCaretActive = false;
					
					setCaretPosition(lgKb.targetElement.selectionEnd, 0);
				},
			insertKeyFromInputDevice :
				function (keyCode)
				{
					var keyElement = getTextFromKeyCode(keyCode);
					if(keyElement)
					{
						var bKeyMouseOver = lgKb.bKeyMouseOver;
						
						lgKb.fireMouseOut(lgKb.mouseOverKeyId);
						lgKb.fireMouseOver(keyElement.id);
						lgKb.fireMouseClick(keyElement.id);
						
						lgKb.bKeyMouseOver = bKeyMouseOver;
					}
				},
			isLgBrowser :
				function ()
				{
					var userAgent = new String(navigator.userAgent);
					var nLgBrowser = userAgent.search(/LG Browser/i);
					
					if(nLgBrowser != -1)
					{
						return true;
					}
					else
					{
						return false;
					}
				},
			initKeyboard :
				function ()
				{
					if(!lgKb.isLgBrowser())
					{
//						return;		//	Virtual Keyboard works well on LG Smart TV
					}
					
					if(!lgKb.vKeyboard)
					{
						lgKb.setLangInfo();
						
						var mainVKScript = document.getElementById("mainVKScript").src;
						lgKb.vKbJsRootPath = mainVKScript.replace("LgVKeyboard.js", "");
						
						//	load keycode.js
						lgKb.loadKeycodeJs();
						
						//	load LgVKCommon.js
						lgKb.loadLgVKCommonJs();
					}
				},
			onLoadLgVKCommonJs :
				function ()
				{
					//	create keyboard layout
					var body = document.getElementsByTagName( 'BODY' )[ 0 ];
					lgKb.vKeyboard = body.appendChild( lgKb.generateMarkup() );
					lgKb.setEmptyKey();
				
					//	create Language Selection Popup layout
					lgKb.popupLangSel = body.appendChild( lgKb.generatePopup() );
					
					lgKb.setDefaultLanguage();				
				},
			loadKeycodeJs :
				function ()
				{
					var strKeycodeJs = lgKb.vKbJsRootPath + "keycode.js";
					var head = document.getElementsByTagName( 'HEAD' )[ 0 ];
					
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = strKeycodeJs;
					head.appendChild(script);
				},
			loadLgVKCommonJs :
				function ()
				{
					var strCommonJs = lgKb.vKbJsRootPath + "LgVKCommon.js";					
					var head = document.getElementsByTagName( 'HEAD' )[ 0 ];
					var script = document.createElement("script");
					script.type = "text/javascript";
					script.src = strCommonJs;
					script.onload = function() { onLoadLgVKCommonJs(); };
					head.appendChild(script);
				},
			getAbsOffsetTop :
				function (event)
				{
					var offset = event.target.offsetTop;
					var objParent = event.view;
					
					while(objParent.frameElement)
					{
						offset += objParent.frameElement.offsetTop;
						objParent = objParent.parent;
					}
					return offset;
				},
			moveKeboard :
				function (position)
				{
					if(position == "up")
					{
						lgKb.vKeyboard.style.top = lgKb.nUpperPos;
					}
					else
					{
						lgKb.vKeyboard.style.top = lgKb.nLowerPos;
					}
				},
			focusIn :
				function (event)
					{
						var absOffsetTop = lgKb.getAbsOffsetTop(event);
						
						lgKb.targetElement = event.target;
						lgKb.targetClass = event.target.className;
						lgKb.targetCssText = event.target.style.cssText;

						event.target.style.backgroundColor = "blue";
						event.target.style.color = "white";
						
						if(absOffsetTop > 360)
						{
							lgKb.moveKeboard("up");
						}
						else
						{
							lgKb.moveKeboard("down");
							
						}
						
						if(!lgKb.bMouseOn)
						{
							lgKb.fireMouseOver(lgKb.mouseOverKeyId);
						}
						
						lgKb.vKeyboard.style.display = 'block';
						lgKb.bShowVKeyboard = true;

						lgKb.targetElement.addEventListener("click", onClearCaretInfo, false);

						lgKb.clearCaretInfo();
					},
			focusOut :
				function ()
				{
					if(lgKb.targetElement)
					{
						lgKb.removeAllSelection();
						
						lgKb.fireMouseOut(lgKb.mouseOverKeyId);
						lgKb.targetElement.removeEventListener("click", onClearCaretInfo, false);
						
						lgKb.targetElement.removeAttribute("class");
						if(lgKb.targetClass != "")
						{
							lgKb.targetElement.className = lgKb.targetClass;
						}
						
						lgKb.targetElement.removeAttribute("style");
						if(lgKb.targetCssText != "")
						{
							lgKb.targetElement.style.cssText = lgKb.targetCssText;
						}
						
						lgKb.targetElement = "";
						lgKb.targetClass = "";
						lgKb.targetCssText = "";
						
						lgKb.vKeyboard.style.display = 'none';
						lgKb.bShowVKeyboard = false;
						
						if(lgKb.bShowPopupLangSel)
						{
							lgKb.showPopupLangSel(false);
						}
					}
				},
			removeAllSelection :
				function ()
				{
					var doc = lgKb.targetElement.ownerDocument;
					var win = doc.defaultView;
					var sel = win.getSelection ? win.getSelection() : doc.selection;
					if(sel)
					{
						if(sel.removeAllRanges)
						{
							sel.removeAllRanges();
						}
						else if(sel.empty)
						{
							sel.empty();
						}
					}
				},
			setEmptyKey :
				function ()
				{
//					document.getElementById('wkk_key_empty_000').firstChild.nodeValue = " ";	//	Set non-used key
				},
			generateMarkup :
				function ()
				{
					var newNode = document.createElement( 'DIV' );
					newNode.id = "VirtualKeyboard";
					newNode.onclick = function(event) { onKbclick(event); };
					newNode.onmouseover = function(event) { onMouseOver(event); };
					newNode.onmouseout = function(event) { onMouseOut(event); };
					newNode.onmousedown = function(event) { onMouseDown(event); };
					newNode.onmouseup = function(event) { onMouseUp(event); };
					newNode.className = 'keyboardArea';
					newNode.style.display = 'block';
					newNode.innerHTML = [
						'<!-- Level 1 Start -->',
						'<div class="horBtnLayer">',
							'<div id="wkk_key_kb_up" class="btnHorNormalImgMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn_KB_Up_N.png &#39;);"></div>',
							'<div id="wkk_key_001" name="keyCode_192" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_002" name="keyCode_49" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_003" name="keyCode_50" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_004" name="keyCode_51" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_005" name="keyCode_52" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_006" name="keyCode_53" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_007" name="keyCode_54" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_008" name="keyCode_55" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_009" name="keyCode_56" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_010" name="keyCode_57" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_011" name="keyCode_48" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_012" name="keyCode_189" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_013" name="keyCode_187" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_014" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_clear" class="btnHorNormalMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn3_N2.png &#39;);">Clear</div>',
						'</div>',
						'<!-- Level 1 End -->',
						'<!-- Level 2 Start -->',
						'<div class="horBtnLayer">',
							'<!-- Lang Select -->',
							'<div id="wkk_key_lang_sel" class="btnHorNormalImgMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn4_N.png &#39;);"></div>',
							'<div id="wkk_key_101" name="keyCode_81" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_102" name="keyCode_87" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_103" name="keyCode_69" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_104" name="keyCode_82" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_105" name="keyCode_84" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_106" name="keyCode_89" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_107" name="keyCode_85" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_108" name="keyCode_73" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_109" name="keyCode_79" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_110" name="keyCode_80" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_111" name="keyCode_219" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_112" name="keyCode_221" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_113" name="keyCode_220" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_114" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<!--Back space -->',
							'<div id="wkk_key_backspace" name="keyCode_8" class="btnHorNormalMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn6_N.png &#39;);"></div>',
						'</div>',
						'<!-- Level 2 End -->',

						'<!-- Level 3 Start -->',
						'<div class="horBtnLayer">',
							'<!-- Lang Toggle -->',
							'<div id="wkk_key_lang_toggle" name="keyCode_229" class="horBtnNormal"  style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn2_N.png &#39;);"></div>',
							'<!-- Shift Toggle -->',
							'<div id="wkk_key_shift_toggle" name="keyCode_20" class="horBtnNormal"  style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn13_N.png &#39;);"></div>',
							'<div id="wkk_key_201" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_202" name="keyCode_65" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_203" name="keyCode_83" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_204" name="keyCode_68" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_205" name="keyCode_70" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_206" name="keyCode_71" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_207" name="keyCode_72" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_208" name="keyCode_74" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_209" name="keyCode_75" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_210" name="keyCode_76" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_211" name="keyCode_186" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_212" name="keyCode_222" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_213" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_214" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<!-- Enter -->',
							'<div id="wkk_key_enter" name="keyCode_13" class="btnHorNormalMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn7_N.png &#39;);"></div>',
						'</div>',
						'<!-- Level 3 End -->',
						'<!-- Level 4 Start -->',
						'<div class="horBtnLayer">',
							'<!-- Char Select -->',
							'<div id="wkk_key_char_sel" class="btnHorNormalMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn3_N.png &#39;);"></div>',
							'<div id="wkk_key_301" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_302" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_303" name="keyCode_90" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_304" name="keyCode_88" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_305" name="keyCode_67" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_306" name="keyCode_86" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_307" name="keyCode_66" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_308" name="keyCode_78" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_309" name="keyCode_77" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_310" name="keyCode_188" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_311" name="keyCode_190" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_312" name="keyCode_191" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_313" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_314" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<!-- Left arrow -->',
							'<div id="wkk_key_left" name="keyCode_" class="horBtnNormal" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn8_N.png &#39;);"></div>',
							'<!-- Right arrow -->',
							'<div id="wkk_key_right" name="keyCode_" class="horBtnNormal" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn9_N.png &#39;);"></div>',
						'</div>',
						'<!-- Level 4 End -->',

						'<!-- Level 5 Start -->',
						'<div class="horBtnLayer">',
							'<div id="wkk_key_kb_down" class="btnHorNormalImgMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn_KB_Down_N.png &#39;);"></div>',
							'<div id="wkk_key_401" class="horBtnSmall">&nbsp;</div>',
							'<div id="wkk_key_402" class="horBtnSmall">&nbsp;</div>',
							'<div id="wkk_key_403" class="horBtnSmall">&nbsp;</div>',
							'<div id="wkk_key_404" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_spacebar" name="keyCode_32" class="btnHorNormalLong" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn11_N.png &#39;);">&nbsp;</div>',
							'<div id="wkk_key_411" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_412" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_413" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<div id="wkk_key_414" name="keyCode_" class="horBtnNormal">&nbsp;</div>',
							'<!-- Hidden -->',
							'<div id="wkk_key_hide" class="btnHorNormalMiddle" style = "background-image: url(&#39;', lgKb.vKbJsRootPath, 'image/Qwerty_Btn10_N.png &#39;);"></div>',
						'</div>',
						'<!-- Level 3 End -->'						
					].join( '' );
					return newNode;
				},
			generatePopup :
				function()
				{
					var popNode = document.createElement( 'DIV' );
					popNode.id = "languageSelection";
					popNode.onclick = function(event) { popupKeyStroke(event); };
					popNode.onmouseover = function(event) { onPopupMouseOver(event); };
					popNode.onmouseout = function(event) { onPopupMouseOut(event); };
					popNode.onmousedown = function(event) { onPopupMouseDown(event); };
					popNode.onmouseup = function(event) { onPopupMouseUp(event); };
					popNode.className = 'marskedPopup';
					popNode.style.display = 'block';
					popNode.innerHTML = [
						'<div id="LangPopup" class="popupLangSelection">',
						
							'<!-- Title area Start-->',
							'<div class="popupLangTitleTopLeft"></div> <div class="popupLangTitleTop"></div> <div class="popupLangTitleTopRight"></div>', 
							'<div class="popupLangTitleBodyLeft"></div>',
							'<div class="popupLangTitleBody">',
								'<div id="LangTitle" class="popupLangTitle">',
									'Language Selection',
								'</div>',
								'<div id="LangInfo" class="popupLangInfo">',
									'<!--  selected lang. Cnt -->',
									'<div id="langCnt" class="popupLangSelCount">&nbsp;</div>',
									'<!--  page Cnt -->',
									'<div id="pageCnt" class="popupLangPageCount">&nbsp;</div>',
								'</div>',
							'</div>',
							'<div class="popupLangTitleBodyRight"></div>',
							'<!-- Title area End-->',
							
							'<!-- Language Area Start -->',
							'<div class=popupLangBodyLeft></div>',
							'<div class=popupLangBodyArrowArea></div>',
							'<div class=popupLangBody>',
								'<div id="LangList" class="popupLangList">',
									'<div id="popup_item_00" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_01" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_02" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_03" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_04" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_05" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_06" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_07" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_08" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_09" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_10" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_11" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_12" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_13" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_14" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_15" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_16" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_17" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_18" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_19" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<div id="popup_item_20" class="popupLangItemNone" langId = "">&nbsp;</div>',
									'<!-- Seventh Row End -->',
								'</div>',
								'<!-- Message -->',
								'<div id="message" class="popupLangMessage">',	
									'<b>You can select no more than 3 languages.</b>',					
								'</div>',
							'</div>',
							'<div class=popupLangBodyArrowArea></div>',
							'<div class=popupLangBodyRight></div>',
							'<!-- Language Area End -->',
							
							'<!-- button Area Start -->',
							'<div class="popupLangBottomLeft"></div>',
							'<div class="popupLangBottom">',								
								'<!-- OK Button -->',
								'<div class="popupBtnDiv">',
									'<div id="popup_btn_ok" class="popupBtnNormal" style="float: right">OK</div>',
								'</div>',
								
								'<!-- Cancel Button -->',
								'<div class="popupBtnDiv">',
									'<div id="popup_btn_cancel" class="popupBtnNormal" style="float: left">CANCEL</div>',
								'</div>',
							'</div>',
							'<div class="popupLangBottomRight"></div>',
							'<!-- button Area End -->',
							
							'<!-- arrow Area Start -->',
							'<div id="arrowLeft"  class="popupLeftArrow"></div>',
							
							'<!-- right arrow -->',
							'<div id="arrowRight" class="popupRightArrow"></div>',
							'<!-- arrow Area End -->',
						
						'</div>',
	
					].join( '' );
					
					return popNode;  
				},
			showPopupLangSel :
				function (bShow)
				{
					lgKb.bShowPopupLangSel = bShow;
					if(bShow)
					{
						popupInit();
						lgKb.popupLangSel.style.display = "block";
						if(!lgKb.bMouseOn)
						{
							lgKb.fireMouseOver(lgKb.popOverKeyId);
						}
						else
						{
							lgKb.fireMouseOut(lgKb.popOverKeyId);
						}
					}
					else
					{
						lgKb.popupLangSel.style.display = "none";
						if(lgKb.targetElement)
						{
							lgKb.targetElement.focus();
						}
					}
				},
			setLangInfo :
				function ()
				{
					lgKb.langInfoList.push(new languageInfo("en", "ENG", "English", "english.js", false)); 
					lgKb.langInfoList.push(new languageInfo("ko", "KOR", "한국어", "korean.js", false));
				},
			refreshVKeyboard :
				function (bRefreshAll)
				{
					if(bRefreshAll)
					{
						lgKb.selectedLang = lgKb.getFirstLang();
						lgKb.nextLang = lgKb.getNextLangCode(lgKb.selectedLang);
						lgKb.addLangJs(lgKb.selectedLang);
					}
					else
					{
						lgKb.nextLang = lgKb.getNextLangCode(lgKb.selectedLang);
						toggleKeyChange();
					}
					
					lgKb.showPopupLangSel(false);
				},
			cleanKeyboard :
				function (event)
				{
					if((lgKb.targetElement) && (lgKb.targetElement.ownerDocument == event.target))
					{
						lgKb.focusOut();
					}
				},
			setSelLang :
				function (langId, bSel)
				{
					for(var index=0; index<lgKb.langInfoList.length; index++)
					{
						if(langId == lgKb.langInfoList[index].id)
						{
							lgKb.langInfoList[index].bSel = bSel;
							lgKb.langInfoList[index].bCandidate = bSel;
							return;
						}
					}
				},
			setLangCandidate :
				function (langId, bCandidate)
				{
					for(var index=0; index<lgKb.langInfoList.length; index++)
					{
						if(langId == lgKb.langInfoList[index].id)
						{
							lgKb.langInfoList[index].bCandidate = bCandidate;
							return;
						}
					}
				},
			getFirstLang :
				function ()
				{
					for(var index=0; index<lgKb.langInfoList.length; index++)
					{
						if(lgKb.langInfoList[index].bSel)
						{
							return lgKb.langInfoList[index].id;
						}
					}
				},
			getFirstLangCode :
				function ()
				{
					for(var index=0; index<lgKb.langInfoList.length; index++)
					{
						if(lgKb.langInfoList[index].bSel)
						{
							return lgKb.langInfoList[index].code;
						}
					}
				},
			getNextLangCode :
				function (langId)
				{
					var index;
					for(index=0; index<lgKb.langInfoList.length; index++)
					{
						if(lgKb.langInfoList[index].bSel)
						{
							if(langId == lgKb.langInfoList[index].id)
							{
								for(index++; index<lgKb.langInfoList.length; index++)
								{
									if(lgKb.langInfoList[index].bSel)
									{
										return lgKb.langInfoList[index].code;
									}
								}
								
								return lgKb.getFirstLangCode();
							}
						}
					}
				},
			getLangIdFromCode :
				function (langCode)
				{
					for(var index=0; index<lgKb.langInfoList.length; index++)
					{
						if(langCode.search(lgKb.langInfoList[index].code) >= 0)
						{
							return lgKb.langInfoList[index].id;
						}
					}
					
					return "";
				},
			setDefaultLanguage :	
				function ()
				{
					lgKb.setSelLang("en", true);
					
					lgKb.selectedLang = "en";
										
					if(lgKb.isLgBrowser())
					{
						var body = document.getElementsByTagName( 'BODY' )[ 0 ];
						
						var newNode = document.createElement( 'DIV' );
						newNode.id = "VKInfo";
						body.appendChild(newNode);
						
						var device = document.createElement('object');
						device.id = "device";
						device.type = "application/x-netcast-info";
						device.height = 0;
						device.width = 0;
						newNode.appendChild(device);
						
						if(device.tvLanguage2 != "")
						{
							lgKb.selectedLang = device.tvLanguage2;
							lgKb.setSelLang(lgKb.selectedLang, true);							
						}
						
						lgKb.bMouseOn = (window.window.NetCastGetMouseOnOff() == 'on') ? true : false;
						
					}
					
					lgKb.nextLang = lgKb.getNextLangCode(lgKb.selectedLang);
					lgKb.addLangJs(lgKb.selectedLang);
				},
			changeLangJs :
				function (strLangCode)
				{
					lgKb.category = "";
					lgKb.removeLangJs(lgKb.selectedLang);
					lgKb.selectedLang = lgKb.getLangIdFromCode(strLangCode);
					lgKb.nextLang = lgKb.getNextLangCode(lgKb.selectedLang);
					lgKb.addLangJs(lgKb.selectedLang);
				},
			addLangJs :
				function (strLang)
				{
					//	Load Keyboard Language
					var strLangJs = lgKb.vKbJsRootPath + "lang/" + lgKb.getLangJs(strLang);

					var head = document.getElementsByTagName( 'HEAD' )[ 0 ];
					
					var script = document.createElement("script");
					script.id = "lang_" + strLang;
					script.type = "text/javascript";
					script.src = strLangJs;
					script.onload = function() { initKeyboardLayout(); };
					head.appendChild(script);
				},
			removeLangJs :
				function (strLang)
				{
					if(strLang == "")
					{
						return;
					}
					
					var head = document.getElementsByTagName( 'HEAD' )[ 0 ];
					
					var script = document.getElementById("lang_" + strLang);
					head.removeChild(script);
				},
			getLangJs :
				function (strLang)
				{
					var langJs = "english.js";
						
					for(var index=0; index<lgKb.langInfoList.length; index++)
					{
						if(strLang == lgKb.langInfoList[index].id)
						{
							langJs = lgKb.langInfoList[index].langJs;
						}
					}

					return langJs;
				},
			setPreviousFocus :
				function ()
				{
					if(lgKb.targetElement)
					{
						lgKb.targetElement.focus();
					}
				},
			refreshFocus :
				function ()
				{
					if(lgKb.targetElement)
					{
						lgKb.targetElement.blur();
						lgKb.targetElement.focus();
					}
				},
			initKeyboardLayout :
				function ()
				{
					miniPopUpInfoObjects = new Array();
					
					changeKeyValue(lgKb.category);
					setNewMode(0);
					toggleKeyChange();
					setKeyName();
					initialize();
					if(!lgKb.bShowVKeyboard)
					{
						lgKb.vKeyboard.style.display = 'none';
						lgKb.popupLangSel.style.top = "0px";
						lgKb.popupLangSel.style.display = 'none';	
					}					
				}
		};
	}

	window.addEventListener("load", initKeyboard, false);
	window.addEventListener("unload", cleanKeyboard, false);
	
	if(lgKb.isLgBrowser())
	{
		window.addEventListener("keydown", OnRemoteKeyDown, true);
		window.addEventListener("keyup", OnRemoteKeyUp, true);
		window.addEventListener("mouseon", OnMouseOn, true);
		window.addEventListener("mouseoff", OnMouseOff, true);
	}
})();
