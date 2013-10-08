/*
	 LCD TV LABORATORY, LG ELECTRONICS INC., SEOUL, KOREA
	 Copyright(c) 2010 by LG Electronics Inc.

	 All rights reserved. No part of this work may be reproduced, stored in a
	 retrieval system, or transmitted by any means without prior written
	 permission of LG Electronics Inc.
	 
	 Developer : Sungsik Kim (sungsik74.kim@lge.com)
	 			 Yejeong Park (yejeong.park@lge.com)
*/

/**
 * current page number  
 */
var currentPageIdx = 0;
var currentKeyId = "";
var currentCaretIdx = 0;

var miniPopUpSupport = false;
var miniPopUpInfoObjects;
var miniPopUpActivated = false;
var currentPopUpInfo = null;
var currentPopUpKeyId = "";

var idx;
var gubun = 'lang';

var bgImage = "";
var blackBgImage = "";
var flag = true;
var isFocus = false;
var txId = "";

var entCnt = 1;
var str = "";
var fCnt = 0;
var arEmbeds = "";

var nPageFullItemCnt = 21;
var popPageIdx = 0;
var maxPageCnt = 1;
var nSelLangCnt = 0;
var nMaxSelLangCnt = 3;

var kDIdx = 0;
var downPosition  = 'wkk_key_305';

//set label
function toggleKeyChange()
{
	setInnerHtml("wkk_key_lang_toggle", lgKb.nextLang.toUpperCase());	// Lang Toggle	
	setInnerHtml("wkk_key_char_sel", lgKb.nextChar);					// Character
	
	toggleShiftKey(false);
}

function setKeyName()
{
	setInnerHtml("wkk_key_clear", STR_VK_CLEAR);
	setInnerHtml("LangTitle", LANG_POPUP_TITLE);
	setInnerHtml("message", LANG_POPUP_MAX_SEL_DESC);
	setInnerHtml("popup_btn_ok", LANG_POPUP_OK);
	setInnerHtml("popup_btn_cancel", LANG_POPUP_CANCEL);
}


function toggleShiftKey(bOver)
{
	if(bOver)
	{
		if(lgKb.selectedCaps == 'shift')
		{
			setElementBackground("wkk_key_shift_toggle", "url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn12_F.png')");
		}
		else
		{
			setElementBackground("wkk_key_shift_toggle" ,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn13_F.png')");
		}
		
		lgKb.mouseOverKeyId = "wkk_key_shift_toggle";
	}
	else
	{
		if(lgKb.selectedCaps == 'shift')
		{
			setElementBackground("wkk_key_shift_toggle", "url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn12_N.png')");
		}
		else
		{
			setElementBackground("wkk_key_shift_toggle" ,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn13_N.png')");
		}
	}
}

/**
 * doHighlight 
 * key Ids 
 * 		- wkk_key_51 : switch page key
 * 		- wkk_key_57 : back space key
 * 		- wkk_key_58 : ok key
 * 		- wkk_key_59 : cancel key
 * 		- wkk_tx : text bar
 * 		- wkk_key_53 : space key
 * keyBoardType : ( 0 : Layout1 / 1 : Layout2 / 3 : Layout3 )
 */ 
function doHighlight(event) {
	keyId = event.target.id;
	
	if(keyId.search(/wkk_key/)>=0)
	{
		if(event.type == 'mouseover')
		{
			if((event.target.firstChild == null) || (event.target.firstChild.nodeValue != " "))
			{
				if(keyId == 'wkk_key_kb_up')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn_KB_Up_F.png')");
				}
				else if(keyId == 'wkk_key_lang_sel')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn4_F.png')");
				}
				else if(keyId == 'wkk_key_clear')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn3_F.png')");
				}
				else if(keyId == 'wkk_key_enter')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn7_F.png')");
				}
				else if(keyId == 'wkk_key_backspace')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn6_F.png')");
				}
				else if(keyId == 'wkk_key_shift_toggle')
				{
					if(lgKb.selectedCaps == 'shift')
					{
						setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn12_F.png')");
					}
					else
					{
						setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn13_F.png')");
					}
				}
				else if(keyId == 'wkk_key_left')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn8_F.png')");
				}
				else if(keyId == 'wkk_key_right')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn9_F.png')");
				}
				else if(keyId == 'wkk_key_char_sel')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn3_F.png')");
				}
				else if(keyId == 'wkk_key_kb_down')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn_KB_Down_F.png')");
				}
				else if(keyId == 'wkk_key_spacebar')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn11_F.png')");
				}
				else if(keyId == 'wkk_key_hide')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn10_F.png')");
				}
				else
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn1_F.png')");		
				}
				
				lgKb.mouseOverKeyId = keyId;
			}
		}
		else if(event.type == 'mouseout')
		{
			if((event.target.firstChild == null) || (event.target.firstChild.nodeValue != " "))
			{
				if(keyId == 'wkk_key_kb_up')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn_KB_Up_N.png')");
				}
				else if(keyId == 'wkk_key_lang_sel')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn4_N.png')");
				}
				else if(keyId == 'wkk_key_clear')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn3_N2.png')");
				}
				else if(keyId == 'wkk_key_enter')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn7_N.png')");
				}
				else if(keyId == 'wkk_key_backspace')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn6_N.png')");
				}
				else if(keyId == 'wkk_key_lang_toggle')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn2_N.png')");
				}
				else if(keyId == 'wkk_key_shift_toggle')
				{
					if(lgKb.selectedCaps == 'shift')
					{
						setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn12_N.png')");
					}
					else
					{
						setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn13_N.png')");
					}
				}
				else if(keyId == 'wkk_key_left')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn8_N.png')");
				}
				else if(keyId == 'wkk_key_right')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn9_N.png')");
				}
				else if(keyId == 'wkk_key_char_sel')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn3_N.png')");
				}
				else if(keyId == 'wkk_key_kb_down')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn_KB_Down_N.png')");
				}
				else if(keyId == 'wkk_key_spacebar')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn11_N.png')");
				}
				else if(keyId == 'wkk_key_hide')
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn10_N.png')");
				}
				else
				{
					setElementBackground(keyId,"url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn1_N.png')");		
				}	
			}
		}
	}	
}

function keyStroke(event)
{
	var keyId = event.target.id;
	
	if(keyId.search(/wkk_key/)>=0)
	{
		switch(keyId)
		{
			case 'wkk_key_kb_up' :
				lgKb.moveKeboard("up");
				break;
			case 'wkk_key_kb_down' :
				lgKb.moveKeboard("down");
				break;
			case 'wkk_key_lang_sel' :
				lgKb.showPopupLangSel(true);
				break;
			case 'wkk_key_clear' :
  				clearText();
  				break;
			case 'wkk_key_lang_toggle' :
				lgKb.changeLangJs(event.target.firstChild.nodeValue);
				break;
			case 'wkk_key_shift_toggle' :
				toggleShift();
				break;
			case 'wkk_key_enter' :
				enterInputField();
				break;
			case 'wkk_key_backspace' : 
				backspaceText();
				break;
			case 'wkk_key_left' : 
				inputBoxControl('left');
				break;
			case 'wkk_key_right' :
				inputBoxControl('right');
				break;
			case 'wkk_key_char_sel' : 
				lgKb.category = event.target.firstChild.nodeValue;
				changeKeyValue(lgKb.category);
				break;
			case 'wkk_key_spacebar' :
				addSpaceText();
				break;
			case 'wkk_key_hide' :
				lgKb.focusOut();
				break;
			default : 
				if(event.target.firstChild.nodeValue != " ")
				{
					appendText(event.target);
				}
				break;
		}
	}
}

function toggleShift()
{
	lgKb.category = lgKb.nextCaps;
	changeKeyValue(lgKb.category);
	toggleShiftKey(true);
}

/**
 * return keyId by keyCode
 * @param keyCode
 * @return
 */

/**
 * return Textbar's content
 * @return
 */
function getTextContent() {
	var textItem = lgKb.targetElement;
	if( textItem != null) {
		return textItem.value;
	}
	return null;
}

/**
 * set Textbar's content
 * @param value
 * @return
 */
function setTextContent(value) {
	var textItem = lgKb.targetElement;
	if( textItem != null) {		
		textItem.value = value;
	}
}

/**
 * return key's value
 * @param keyId
 * @return
 */
function getKeyValue(keyId) {
	var keyItem = lgKb.vKeyboard(keyId);
	if(keyItem != null) {
		return keyItem.firstChild.nodeValue;
	} else {
		return null;
	}
}

function clearText()
{
	lgKb.targetElement.value = "";
	lgKb.clearCaretInfo();
}


/*****************************************************************/
/******************* Language Popup Start ************************/
/*****************************************************************/

/**
 * Language Initializing
 */
function popupInit(){
	
	getSelectedLang();
	
	maxPageCnt = Math.floor((lgKb.langInfoList.length - 1)/nPageFullItemCnt + 1);
	var itemCnt;
	
	if(popPageIdx < (maxPageCnt - 1))
	{
		document.getElementById('arrowRight').style.visibility = '';
		itemCnt = nPageFullItemCnt;
	}
	else
	{
		document.getElementById('arrowRight').style.visibility = 'hidden';
		itemCnt = (lgKb.langInfoList.length - nPageFullItemCnt * popPageIdx);
	}
	
	if(popPageIdx > 0)
	{
		document.getElementById('arrowLeft').style.visibility = '';
	}
	else
	{
		document.getElementById('arrowLeft').style.visibility = 'hidden';
	}
	
	setPopupKeyText("pageCnt", "page " + (popPageIdx + 1) + "/" + maxPageCnt);
	
	var strIndex;
	var nPageStart = popPageIdx * nPageFullItemCnt;
	var keyIndex;
	var keyItem;
	var index;

	for(index=0; index<itemCnt; index++)
	{
		strIndex = "0" + index;
		keyIndex = "popup_item_" + strIndex.substr(strIndex.length - 2, 2);
		keyItem = document.getElementById(keyIndex);
		
		setPopupKeyText(keyIndex, lgKb.langInfoList[nPageStart + index].title);
		
		if(lgKb.langInfoList[nPageStart + index].bSel)
		{
			keyItem.className = "popupLangItemNormalSelected";
		}
		else
		{
			keyItem.className = "popupLangItemNormal";
		}
		
		keyItem.langId = lgKb.langInfoList[nPageStart + index].id;
	}
	for(; index<nPageFullItemCnt; index++)
	{
		strIndex = "0" + index;
		keyIndex = "popup_item_" + strIndex.substr(strIndex.length - 2, 2);
		keyItem = document.getElementById(keyIndex);
		
		setPopupKeyText(keyIndex, " ");
		
		keyItem.className = "popupLangItemNone";
		keyItem.langId = "";
	}
}

function getSelectedLang()
{
	nSelLangCnt = 0;
	var len = lgKb.langInfoList.length;
	for(var index=0; index<len; index++)
	{
		if(lgKb.langInfoList[index].bSel)
		{
			nSelLangCnt++;
		}
	}
	
	setPopupKeyText("langCnt", nSelLangCnt + LANG_POPUP_SELECTED_CNT);
}

function increaseSelectedLangCnt(bIncrease)
{
	var bRtn = false;
	if(bIncrease)
	{
		if(nSelLangCnt < nMaxSelLangCnt)
		{
			nSelLangCnt++;
			bRtn = true;
		}
		else
		{
			alert(LANG_POPUP_UPPER_LIMIT_LEFT + nMaxSelLangCnt + LANG_POPUP_UPPER_LIMIT_RIGHT);
			bRtn = false;
		}
	}
	else
	{
		nSelLangCnt--;
		bRtn = true;
	}
	
	if(bRtn)
	{
		setPopupKeyText("langCnt", nSelLangCnt + LANG_POPUP_SELECTED_CNT);
	}
	
	return bRtn;
}

function popHighlight(event)
{
	var key = event.target;
	
	if(key.id.search(/popup_item/) >= 0)
	{
		if(key.className != "popupLangItemNone")
		{
			if(event.type == 'mouseover')
			{
				if(key.className == "popupLangItemNormal")
				{
					key.className = "popupLangItemFocus";
				}
				else
				{
					key.className = "popupLangItemFocusSelected";
				}
				
				lgKb.popOverKeyId = key.id;
			}
			else if(event.type == 'mouseout')
			{
				if(key.className == "popupLangItemFocus")
				{
					key.className = "popupLangItemNormal";
				}
				else
				{
					key.className = "popupLangItemNormalSelected";
				}
			}
		}
	}
	else if(key.id.search(/popup_btn/) >= 0)
	{
		if(event.type == 'mouseover')
		{
			key.className = "popupBtnFocus";
			lgKb.popOverKeyId = key.id;
		}
		else if(event.type == 'mouseout')
		{
			key.className = "popupBtnNormal";
		}
		else if(event.type == 'mousedown')
		{
			key.className = "popupBtnDown";				
		}
		else if(event.type == 'mouseup')
		{
			key.className = "popupBtnFocus";				
		}
	}
	else
	{
		if(key.id.search(/arrowLeft/) >= 0)
		{
			if(event.type == 'mouseover')
			{
				key.className = "popupLeftArrowFocus";
			}
			else if(event.type == 'mouseout')
			{
				key.className = "popupLeftArrow";
			}
			else if(event.type == 'mousedown')
			{
				key.className = "popupLeftArrowDown";				
			}
			else if(event.type == 'mouseup')
			{
				key.className = "popupLeftArrowFocus";				
			}
		}
		else if(key.id.search(/arrowRight/) >= 0)
		{
			if(event.type == 'mouseover')
			{
				key.className = "popupRightArrowFocus";
			}
			else if(event.type == 'mouseout')
			{
				key.className = "popupRightArrow";
			}
			else if(event.type == 'mousedown')
			{
				key.className = "popupRightArrowDown";	
			}
			else if(event.type == 'mouseup')
			{
				key.className = "popupRightArrowFocus";
			}
		}
	}
}

function setSelLangList()
{
	var bRefreshAll = true;
	var len = lgKb.langInfoList.length;
	for(var index=0; index<len; index++)
	{
		if(lgKb.langInfoList[index].bCandidate)
		{
			lgKb.langInfoList[index].bSel = true;
			if(lgKb.selectedLang == lgKb.langInfoList[index].id)
			{
				bRefreshAll = false;
			}
		}
		else
		{
			lgKb.langInfoList[index].bSel = false;
		}
	}

	lgKb.refreshVKeyboard(bRefreshAll);
}

function resetSelLangList()
{
	var len = lgKb.langInfoList.length;
	for(var index=0; index<len; index++)
	{
		if(lgKb.langInfoList[index].bSel)
		{
			lgKb.langInfoList[index].bCandidate = true;
		}
		else
		{
			lgKb.langInfoList[index].bCandidate = false;
		}
	}
}


function popupKeyStroke(event)
{
	var key = event.target;
	
	if(key.id.search(/popup_item/)>=0)
	{
		if(key.className != "popupLangItemNone")
		{
			if(key.className == "popupLangItemFocus")
			{
				if(increaseSelectedLangCnt(true))
				{
					lgKb.setLangCandidate(key.langId, true);
					key.className = "popupLangItemFocusSelected";
				}
			}
			else
			{
				key.className = "popupLangItemFocus";
				increaseSelectedLangCnt(false);
				lgKb.setLangCandidate(key.langId, false);
			}
		}
		
	}
	else if(key.id == 'popup_btn_ok')
	{
		if(nSelLangCnt > 0)
		{
			setSelLangList();
		}
		else
		{
			alert(LANG_POPUP_LOWER_LIMIT);
		}
	}
	else if(key.id == 'popup_btn_cancel')
	{
		resetSelLangList();
		lgKb.showPopupLangSel(false);
	}
	else if(key.id.search(/arrowLeft/) >= 0)
	{
		popPageIdx--;
		popupInit();
	}
	else if(key.id.search(/arrowRight/) >= 0)
	{
		popPageIdx++;
		popupInit();
	}
}

function getTextFromKeyCode(keyCode)
{
	
	var keyName = "keyCode_" + keyCode;
	var keyItem = document.getElementsByName(keyName)[0];
	
	return keyItem;
}

function remoteKeyDown(event)
{
	var rtnVal = false;
	
	if(lgKb.bShowPopupLangSel)
	{
		popKeyDown(event);
		event.returnValue = false;
	}
	else if(lgKb.bShowVKeyboard)
	{
		var keyCode = event.keyCode;
		
		//	change keycode of number pad key to keycode of number key
		if((keyCode >= VK_NUMPAD_0) && (keyCode <= VK_NUMPAD_9))
		{
			keyCode -= 48;
		}
		
		var keyId = "";
		switch(keyCode) {
			case VK_HID_ESC :
				lgKb.focusOut();
				break;
			case VK_UP :
				keyId = moveUp();
				break;
				
			case VK_DOWN :
				keyId = moveDown();
				break;
				
			case VK_LEFT :
				keyId = moveLeft();
				break;
				
			case VK_RIGHT :
				keyId = moveRight();
				break;
				
			case VK_ENTER :
				lgKb.fireMouseClick(lgKb.mouseOverKeyId);
				break;
				
			case VK_SHIFT :
				if(!lgKb.bShift)
				{
					keyCode = VK_CAPS_LOCK;
					lgKb.insertKeyFromInputDevice(keyCode);					
					lgKb.bShift = true;
				}
				break;
			default :
				lgKb.insertKeyFromInputDevice(keyCode);
				break;
		}
		
		if(keyId != "")
		{
			lgKb.fireMouseOut(lgKb.mouseOverKeyId);
			lgKb.fireMouseOver(keyId);
		}
		
		event.returnValue = rtnVal;
	}
	else
	{
		lgKb.onKeyDown(event);
	}
	
	return;
}

function remoteKeyUp(event)
{
	if(lgKb.bShowPopupLangSel)
	{
		event.returnValue = false;
	}
	else if(lgKb.bShowVKeyboard)
	{
		var keyCode = event.keyCode;
		
		switch(keyCode) {				
			case VK_SHIFT :
				keyCode = VK_CAPS_LOCK;
				lgKb.insertKeyFromInputDevice(keyCode);
				lgKb.bShift = false;
				break;
				
			default :
				break;
		}
		event.returnValue = false;
	}
	else
	{
		lgKb.onKeyUp(event);
	}
	
	return;
}

function moveUp()
{
	var keyId = "";
	var nextkeyId = lgKb.mouseOverKeyId;
	
	switch(lgKb.mouseOverKeyId)
	{
		case 'wkk_key_kb_up' :
			return keyId;
			
		case 'wkk_key_lang_sel' :
			return 'wkk_key_kb_up';
			
		case 'wkk_key_lang_toggle' :				
		case 'wkk_key_shift_toggle' :
			return 'wkk_key_lang_sel';
			
		case 'wkk_key_char_sel' :
			return 'wkk_key_shift_toggle';
			
		case 'wkk_key_kb_down' :
			return 'wkk_key_char_sel';
			
		case 'wkk_key_clear' :
			return keyId;
			
		case 'wkk_key_backspace' : 
			return 'wkk_key_clear';
			
		case 'wkk_key_enter' :
			return 'wkk_key_backspace';
			
		case 'wkk_key_left' :
		case 'wkk_key_right' :
			return 'wkk_key_enter';
			
		case 'wkk_key_hide' :
			return 'wkk_key_left';
			
		case 'wkk_key_spacebar' :
			return downPosition;
		}
	
	if(keyId == "")
	{
		var y = nextkeyId.charAt(8);
		var x = nextkeyId.substr(9,2);
		
		
		if(new Number(y)>0)
		{
			y = new Number(y)-1;
			keyId = 'wkk_key_' + y + x;
			
			while((y >= 0) && (document.getElementById(keyId).firstChild.nodeValue == " "))
			{
				y = new Number(y)-1;
				keyId = 'wkk_key_' + y + x;
			}
			
			if(y < 0)
			{
				keyId = "";
			}

		}
	}
	return keyId;
}

function moveDown()
{
	var keyId = "";
	
	switch(lgKb.mouseOverKeyId)
	{
		case 'wkk_key_kb_up' :
			return 'wkk_key_lang_sel';
		
		case 'wkk_key_lang_sel' :
			return 'wkk_key_lang_toggle';

		case 'wkk_key_lang_toggle' :					
		case 'wkk_key_shift_toggle' :
			return 'wkk_key_char_sel';

		case 'wkk_key_char_sel' :
			return 'wkk_key_kb_down';
			
		case 'wkk_key_kb_down' :
			return keyId;
			
		case 'wkk_key_clear' :
			return 'wkk_key_backspace';

		case 'wkk_key_backspace' : 
			return 'wkk_key_enter';

		case 'wkk_key_enter' :
			return 'wkk_key_left';

		case 'wkk_key_left' :
		case 'wkk_key_right' :
			return 'wkk_key_hide';

		case 'wkk_key_hide' :
			return keyId;
			
		case 'wkk_key_spacebar' :
			return keyId;	
	}
	

	if(keyId == "")
	{
		var y = lgKb.mouseOverKeyId.charAt(8);
		var x = lgKb.mouseOverKeyId.substr(9,2);
		
		
		if(new Number(y)<4)
		{
			if(Number(y) == 3 && (Number(x) == 5 || Number(x) == 6 || Number(x) == 7 || Number(x) == 8 || Number(x) == 9 || Number(x) == 10 ))
			{	
				downPosition  ='wkk_key_' + y + x;
				return keyId = 'wkk_key_spacebar';
			}

			y = new Number(y)+1;
			keyId = 'wkk_key_' + y + x;

			while((y <= 4) && (document.getElementById(keyId).firstChild.nodeValue == " "))
			{
				y = new Number(y)+1;
				keyId = 'wkk_key_' + y + x;
			
			}
			
			if(y > 4)
			{
				keyId = "";
			}

		}
	}
	return keyId;
	
}

function moveLeft()
{
	var keyId = "";
	var nextkeyId = lgKb.mouseOverKeyId;
	
	switch(lgKb.mouseOverKeyId)
	{
		case 'wkk_key_kb_up' :
			return 'wkk_key_clear';
	
		case 'wkk_key_lang_sel' :
			return 'wkk_key_backspace';

		case 'wkk_key_lang_toggle' : 
			return 'wkk_key_enter';

		case 'wkk_key_shift_toggle' :
			return 'wkk_key_lang_toggle';

		case 'wkk_key_char_sel' :
			return 'wkk_key_right';
			
		case 'wkk_key_kb_down' :
			return 'wkk_key_hide';
			
		case 'wkk_key_clear' :
			nextkeyId = 'wkk_key_015';
			break;
			
		case 'wkk_key_backspace' : 
			nextkeyId = 'wkk_key_115';
			break;
			
		case 'wkk_key_enter' :
			nextkeyId = 'wkk_key_215';
			break;
			
		case 'wkk_key_left' :
			nextkeyId = 'wkk_key_315';
			break;
			
		case 'wkk_key_right' :
			return 'wkk_key_left';

		case 'wkk_key_hide' :
			nextkeyId = 'wkk_key_415';
			break;
			
		case 'wkk_key_spacebar' :
			nextkeyId = 'wkk_key_405';
			break;
	}
	

	if(keyId == "")
	{
		var y = nextkeyId.charAt(8);
		var x = nextkeyId.substr(9,2);
		
		if(x > 0)
		{
			x = new Number(x)-1;
			keyId = getKeyIdfromXY(x,y);
			
			while( (x > 0) && (document.getElementById(keyId).firstChild.nodeValue == " "))
			{				
				x = new Number(x)-1;
				keyId = getKeyIdfromXY(x,y);
				
				if( keyId == 'wkk_key_411')
				{
					return 'wkk_key_spacebar';
				}
			}
			if( x == 0 )
			{
				switch(y)
				{
					case '0' :
						keyId = 'wkk_key_kb_up';
						break;
					case '1' :
						keyId = 'wkk_key_lang_sel';
						break;
					case '2' :
						keyId = 'wkk_key_shift_toggle';
						break;
					case '3' :
						keyId = 'wkk_key_char_sel';
						break;
					case '4' :
						keyId = 'wkk_key_kb_down';
						break;	
				}
			}
		}
	}
	return keyId;
}

function moveRight()
{
	var keyId = "";
	var nextkeyId = lgKb.mouseOverKeyId;
	
	switch(lgKb.mouseOverKeyId)
	{
		case 'wkk_key_kb_up' :
			nextkeyId = 'wkk_key_000';
			break;

		case 'wkk_key_lang_sel' :
			nextkeyId = 'wkk_key_100';
			break;
			
		case 'wkk_key_lang_toggle' : 
			return 'wkk_key_shift_toggle';
			
		case 'wkk_key_shift_toggle' :
			nextkeyId = 'wkk_key_200';
			break;
			
		case 'wkk_key_char_sel' :
			nextkeyId = 'wkk_key_300';
			break;

		case 'wkk_key_kb_down' :
			nextkeyId = 'wkk_key_400';
			break;

		case 'wkk_key_clear' :
			return 'wkk_key_kb_up';

		case 'wkk_key_backspace' : 
			return 'wkk_key_lang_sel';

		case 'wkk_key_enter' :
			return 'wkk_key_lang_toggle';

		case 'wkk_key_left' :
			return 'wkk_key_right';
			
		case 'wkk_key_right' :
			return 'wkk_key_char_sel';
			
		case 'wkk_key_hide' :
			return 'wkk_key_kb_down';
			
		case 'wkk_key_spacebar' :
			nextkeyId = 'wkk_key_410';
			break;
	}
	

	if(keyId == "")
	{
		var y = nextkeyId.charAt(8);
		var x = nextkeyId.substr(9,2);
		
		if(x >= 0)
		{
			x = new Number(x)+1;
			keyId = getKeyIdfromXY(x,y);
			
			while( (x < 14) && (document.getElementById(keyId).firstChild.nodeValue == " "))
			{				
				x = new Number(x)+1;
				keyId = getKeyIdfromXY(x,y);
				
				if( keyId == 'wkk_key_405')
				{
					return 'wkk_key_spacebar';
				}
			}
			if( x == 14 )
			{
				switch(y)
				{
					case '0' :
						keyId = 'wkk_key_clear';
						break;
					case '1' :
						keyId = 'wkk_key_backspace';
						break;
					case '2' :
						keyId = 'wkk_key_enter';
						break;
					case '3' :
						keyId = 'wkk_key_left';
						break;
					case '4' :
						keyId = 'wkk_key_hide';
						break;	
				}
			}
		}
	}
	return keyId;
}

function popKeyDown(event)
{
	var keyCode;
	if(window.event) { // IE
		keyCode = event.keyCode;
	} else if(event.which) { // Netscape/Firefox/Opera
		keyCode = event.which;
	} else {
		return ;
	}
	var keyId = "";
	switch(keyCode) {				
		case VK_UP :
			keyId = popMoveUp();
			break;
			
		case VK_DOWN :
			keyId = popMoveDown();
			break;
			
		case VK_LEFT :
			keyId = popMoveLeft();
			break;
			
		case VK_RIGHT :
			keyId = popMoveRight();
			break;
		case VK_ENTER :
			lgKb.fireMouseClick(lgKb.popOverKeyId);
			break;
			
		default :
			break;
	}
	
	if(keyId != "")
	{
		lgKb.fireMouseOut(lgKb.popOverKeyId);
		lgKb.fireMouseOver(keyId);
	}
}

function popMoveUp()
{
	var y;
	var keyId = "";
	var nextkeyId = lgKb.popOverKeyId;
		
	switch(lgKb.popOverKeyId)
	{
		case 'popup_btn_ok' :
			nextkeyId = 'popup_item_21';
			break;
		case 'popup_btn_cancel' :
			nextkeyId = 'popup_item_21';
			break;
	}
	
	if(keyId == "")
	{
		var num = nextkeyId.substr(11,2);

		num = new Number(num) - 3;
		keyId = getKeyIdfromNum(num);
		
		y = Math.floor(num/3);
		
		while((y >= 0) && (document.getElementById(keyId).firstChild.nodeValue == " "))
		{
			num = new Number(num) - 3;
			keyId = getKeyIdfromNum(num);
			
			y = Math.floor(num/3);
		}
		
		if(y < 0)
		{
			keyId = "";
		}
	}
	return keyId;
}

function popMoveDown()
{
	var y;
	var keyId = "";
	var nextkeyId = lgKb.popOverKeyId;
	
	switch(lgKb.popOverKeyId)
	{
		case 'popup_btn_ok' :
		case 'popup_btn_cancel' :
			return keyId;
	}
	
	if(keyId == "")
	{
		var num = nextkeyId.substr(11,2);
		num = new Number(num) + 3;
		
		keyId = getKeyIdfromNum(num);

		y = Math.floor(num/3);
		
		while((document.getElementById(keyId).firstChild.nodeValue == " "))
		{
			num = new Number(num) + 3;
			keyId = getKeyIdfromNum(num);
			
			y = Math.floor(num/3);
			if(y == 7)
			{
				return 'popup_btn_ok';
			}
		}
	}
	return keyId;
}

function popMoveLeft()
{
	var keyId = "";
	var nextkeyId = lgKb.popOverKeyId;
	
	switch(lgKb.popOverKeyId)
	{
		case 'popup_btn_ok' :
			return "";
		case 'popup_btn_cancel' : 
			return 'popup_btn_ok';
	}
	
	if(keyId == "")
	{
		var num = nextkeyId.substr(11,2);
		num = new Number(num);
		
		keyId = nextkeyId;
		
		if((new Number(num))%3 == 0)
		{
			return keyId;
		}
		else
		{
			num = new Number(num) - 1;
			keyId = getKeyIdfromNum(num);
		}
	}
	return keyId;	
}

function popMoveRight()
{
	var keyId = "";
	var nextkeyId = lgKb.popOverKeyId;
	
	switch(lgKb.popOverKeyId)
	{
		case 'popup_btn_ok' :
			return 'popup_btn_cancel';
		case 'popup_btn_cancel' : 
			return "";
	}
	

	if(keyId == "")
	{
		var num = nextkeyId.substr(11,2);
		num =new Number(num);
		
		keyId = nextkeyId;
		
		if((new Number(num))%3 == 2)
		{
			return keyId;
		}
		
		else
		{
			num =new Number(num) + 1;
			keyId = getKeyIdfromNum(num);
			
			if(document.getElementById(keyId).firstChild.nodeValue == " ")
			{
				return "";
			}
		}
	}
	return keyId;	
}


function getKeyIdfromXY(x,y)
{
	var keyId;
	if(x < 10)
	{
		keyId = 'wkk_key_' + y + '0' + x;
	}
	else 
	{
		keyId = 'wkk_key_' + y + x;	
	}	
	return keyId;
}

function getKeyIdfromNum(num)
{
	var keyId;
	if(num < 10)
	{
		keyId = 'popup_item_' + '0' + num; 
	}
	else
	{
		keyId = 'popup_item_' + num;
	}
	return keyId;
}

/** 
 * @param keyId
 * @param value
 */
function setPopupKeyText(keyId, value) {		
	var keyItem = document.getElementById(keyId);	
	
	if(keyItem != null) {
		keyItem.firstChild.nodeValue = value;	
	}
}

function inputBoxControl(direct){
	if(direct=='left'){
		caretPrev();
	}else{
		caretNext();
	}
}

/*start of carot handle*/
function caretMoved() {
	setNewMode(0);
	setCaretPosition(getCaretPosition(), 0);
}

function caretNext() {
	setNewMode(0);
	var pos = getCaretPosition();
	setCaretPosition(new Number(pos) + 1, 0);
}

function caretPrev() {
	
	setNewMode(0);
	var ctrl = lgKb.targetElement;
	var pos = getCaretPosition();	
		
	if(pos>ctrl.value.length){
		pos = ctrl.value.length;
	}	
	setCaretPosition(new Number(pos) -1, 0);
}

function getCaretPosition() {
	return currentCaretIdx;
}

function isCaretActivated() {
	return isCaretActive;
}

var isCaretActive = false;

function setCaretPosition(pos, r) {
	
	if(pos<0){
		pos = 0;
	}
	
	var ctrl = lgKb.targetElement;
	ctrl.focus();
	
	if(ctrl.setSelectionRange) 	{
		//		
		ctrl.setSelectionRange(pos, new Number(pos+r));
	} else if (ctrl.createTextRange) {
		//IE... 
		var range = ctrl.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos + r);
		range.moveStart('character', pos );
		range.select();
		ctrl.blur();
	}
	
	currentCaretIdx = pos;
	if(r > 0 ) {
		isCaretActive = true;
	} else {
		isCaretActive = false;
	}
}
/*end of carot handle*/

/*start of default text handle*/
var maxLen = 100;

function addStrIntoFld( c , isNew ) {

	var kTxt = getTextContent();
	var kTxtLen = kTxt.length;
	
	if( kTxtLen < maxLen ) {
		var kSelected = isCaretActivated();
		var kIdx = getCaretPosition();
		var kIsEnd = false;
		if(kSelected) {
			kIsEnd = (kIdx >= (new Number(kTxtLen) - 1));
		} else {
			kIsEnd = (kIdx >= kTxtLen);
		}
		if(isNew) { 
			if(kIsEnd) { 				
				addCharToEnd(kTxt, c);
			} else {
				if(kSelected) {
					addCharInMiddle(kTxt, c, kIdx+1);
				} else {
					addCharInMiddle(kTxt, c, kIdx);
				}
			}
		} else {			
			if (kIsEnd) {
				overwriteCharToEnd(kTxt, c);
			} else {
				overwriteCharInMiddle(kTxt, c, kIdx);
			}
		}
	}
}

function addCharToEnd(txt, c) {
	var kJoin = txt + c;
	if(c.length > 1) {
		putStrIntoFld(kJoin, kJoin.length);
	} else {
		putStrIntoFld(kJoin, txt.length);
	}
}

function overwriteCharToEnd(txt, c) {
	var kTxt = txt.substr(0, txt.length -1);
	putStrIntoFld(kTxt+c, kTxt.length);
}

function addCharInMiddle(txt, c, idx) {
	var kTxt_0 = txt.substr(0, idx);
	var kTxt_1 = txt.substr(idx, txt.length);

	var kJoin = kTxt_0 + c + kTxt_1;
	if(c.length > 1) {
		putStrIntoFld(kJoin, new Number(idx) + c.length-1);
	} else {
		putStrIntoFld(kJoin, idx);
	}
//	setCaretPosition(idx + c.length, 0);
}

function overwriteCharInMiddle(txt, c, idx) {
	var kTxt_0 = txt.substr(0,idx);
	var kTxt_1 = txt.substr(new Number(idx)+1, txt.length);
	putStrIntoFld(kTxt_0+ c + kTxt_1, idx);	
}

function putStrIntoFld( str, idx) {
	
	var kStr = "";
	if( str != null && str.length > 0 ) {
		kStr = str;
	}
	setTextContent(kStr);

	if(kStr.length == 0 ) {
		setCaretPosition(0, 0);	
	} else {
		setCaretPosition(new Number(idx)+1, 0);
	}
}

function deletePrevChar() {
	var kTxt = getTextContent();
	var kSelected = isCaretActivated();
	var ctrl = lgKb.targetElement;
	var kIdx = getCaretPosition();
	if(kIdx>ctrl.value.length){
		kIdx = ctrl.value.length;
	}

	if(!kSelected) {
		kIdx = kIdx -1;
	}
	var kResult = "";	
	if( kIdx > -1) {
		kResult = kTxt.substr(0,kIdx) + kTxt.substr(kIdx +1, kTxt.length);
		putStrIntoFld(kResult, kIdx);	
		setCaretPosition(kIdx, 0);
	}
}


/**
 * return has black background.
 * @param curPageIdx
 * @param keyId
 * @return true/false
 */
function isBlackKey(keyId)
{
	var keyValue = getKeyValue(keyId);
	
	if(keyValue == " ")
	{
		return true;
	}
	
	return false;
}

function enterInputField()
{
	if(lgKb.targetElement.tagName == 'TEXTAREA')
	{
		lgKb.clearCaretInfo();	
		addStrIntoFld("\n", true);
	}	
}

/****************************************************************************/
/**************** Lang.js replace keyboard.js functions End ***************/
/****************************************************************************/

//	from common.js

function setKeyText(keyId, value, bCombi)
{
	var keyItem = document.getElementById(keyId);	
	
	bgImage = "url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn1_N.png')";
	blackBgImage = "url('" + lgKb.vKbJsRootPath + "image/Qwerty_Btn1_D.png')";
		
	if(keyItem != null)
	{
		keyItem.firstChild.nodeValue = value;
		if(isBlackKey(keyId))
		{			
			setElementBackground(keyId, blackBgImage );
		}
		else
		{
			setElementBackground(keyId, bgImage );
		}
		
		if(bCombi)
		{
			keyItem.combination = "true";
		}
		else
		{
			keyItem.combination = "false";
		}
	}
}

function getKeyValue(keyId)
{
	
	var keyItem = document.getElementById(keyId);	
	if(keyItem != null)
	{
		return keyItem.firstChild.nodeValue;
	}
	else
	{
		return null;
	}
}

function setInnerHtml(elementId, html)
{
	var e = document.getElementById(elementId);
	if(e != null)
	{
		e.innerHTML = html;
	}
}

function setElementBackground(elementId, backGround)
{
	var e = document.getElementById(elementId);
	if(e != null)
	{
		e.style.background = backGround;
	}
}
//
//function getTextBoundingRect(input, selectionStart, selectionEnd, debug)
//{
//    // Basic parameter validation
//    if(!input || !('value' in input)) return input;
//    if(typeof selectionStart == "string") selectionStart = parseFloat(selectionStart);
//    if(typeof selectionStart != "number" || isNaN(selectionStart)) {
//        selectionStart = 0;
//    }
//    if(selectionStart < 0) selectionStart = 0;
//    else selectionStart = Math.min(input.value.length, selectionStart);
//    if(typeof selectionEnd == "string") selectionEnd = parseFloat(selectionEnd);
//    if(typeof selectionEnd != "number" || isNaN(selectionEnd) || selectionEnd < selectionStart) {
//        selectionEnd = selectionStart;
//    }
//    if (selectionEnd < 0) selectionEnd = 0;
//    else selectionEnd = Math.min(input.value.length, selectionEnd);
//    
//    // If available (thus IE), use the createTextRange method
//    if (typeof input.createTextRange == "function") {
//        var range = input.createTextRange();
//        range.collapse(true);
//        range.moveStart('character', selectionStart);
//        range.moveEnd('character', selectionEnd - selectionStart);
//        return range.getBoundingClientRect();
//    }
//    // createTextRange is not supported, create a fake text range
//    var offset = getInputOffset(),
//        topPos = offset.top,
//        leftPos = offset.left,
//        width = getInputCSS('width', true),
//        height = getInputCSS('height', true);
//
//        // Styles to simulate a node in an input field
//    var cssDefaultStyles = "white-space:pre;padding:0;margin:0;",
//        listOfModifiers = ['direction', 'font-family', 'font-size', 'font-size-adjust', 'font-variant', 'font-weight', 'font-style', 'letter-spacing', 'line-height', 'text-align', 'text-indent', 'text-transform', 'word-wrap', 'word-spacing'];
//
//    topPos += getInputCSS('padding-top', true);
//    topPos += getInputCSS('border-top-width', true);
//    leftPos += getInputCSS('padding-left', true);
//    leftPos += getInputCSS('border-left-width', true);
//    leftPos += 1; //Seems to be necessary
//
//    for (var i=0; i<listOfModifiers.length; i++) {
//        var property = listOfModifiers[i];
//        cssDefaultStyles += property + ':' + getInputCSS(property) +';';
//    }
//    // End of CSS variable checks
//
//    var text = input.value,
//        textLen = text.length,
//        fakeClone = document.createElement("div");
//    if(selectionStart > 0) appendPart(0, selectionStart);
//    var fakeRange = appendPart(selectionStart, selectionEnd);
//    if(textLen > selectionEnd) appendPart(selectionEnd, textLen);
//
//    // Styles to inherit the font styles of the element
//    fakeClone.style.cssText = cssDefaultStyles;
//
//    // Styles to position the text node at the desired position
//    fakeClone.style.position = "absolute";
//    fakeClone.style.top = topPos + "px";
//    fakeClone.style.left = leftPos + "px";
//    fakeClone.style.width = width + "px";
//    fakeClone.style.height = height + "px";
//    document.body.appendChild(fakeClone);
//    var returnValue = fakeRange.getBoundingClientRect(); //Get rect
//    
//    if (!debug) fakeClone.parentNode.removeChild(fakeClone); //Remove temp
//    return returnValue;
//
//    // Local functions for readability of the previous code
//    function appendPart(start, end){
//        var span = document.createElement("span");
//        span.style.cssText = cssDefaultStyles; //Force styles to prevent unexpected results
//        span.textContent = text.substring(start, end);
//        fakeClone.appendChild(span);
//        return span;
//    }
//    // Computing offset position
//    function getInputOffset(){
//        var body = document.body,
//            win = document.defaultView,
//            docElem = document.documentElement,
//            box = document.createElement('div');
//        box.style.paddingLeft = box.style.width = "1px";
//        body.appendChild(box);
//        var isBoxModel = box.offsetWidth == 2;
//        body.removeChild(box);
//        box = input.getBoundingClientRect();
//        var clientTop  = docElem.clientTop  || body.clientTop  || 0,
//            clientLeft = docElem.clientLeft || body.clientLeft || 0,
//            scrollTop  = win.pageYOffset || isBoxModel && docElem.scrollTop  || body.scrollTop,
//            scrollLeft = win.pageXOffset || isBoxModel && docElem.scrollLeft || body.scrollLeft;
//        return {
//            top : box.top  + scrollTop  - clientTop,
//            left: box.left + scrollLeft - clientLeft};
//    }
//    function getInputCSS(prop, isnumber){
//        var val = document.defaultView.getComputedStyle(input, null).getPropertyValue(prop);
//        return isnumber ? parseFloat(val) : val;
//    }
//}
