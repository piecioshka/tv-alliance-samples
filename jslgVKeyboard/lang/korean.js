/*
	 LCD TV LABORATORY, LG ELECTRONICS INC., SEOUL, KOREA
	 Copyright(c) 2010 by LG Electronics Inc.

	 All rights reserved. No part of this work may be reproduced, stored in a
	 retrieval system, or transmitted by any means without prior written
	 permission of LG Electronics Inc.
*/

/**
 * Korean
 */



/**
 * key board page count
 */
var pageCnt = 4;

/**
 * label string seting
 */
var STR_VK_CLEAR = "지움";
var LANG_POPUP_TITLE = "언어 선택";
var LANG_POPUP_SELECTED_CNT = " 개의 언어 선택";
var LANG_POPUP_MAX_SEL_DESC = "최대 " + nMaxSelLangCnt + "개의 언어를 선택할 수 있습니다.";
var LANG_POPUP_OK = "확인";
var LANG_POPUP_CANCEL = "취소";
var LANG_POPUP_LOWER_LIMIT = "최소 하나의 언어는 선택해야 합니다.";
var LANG_POPUP_UPPER_LIMIT_LEFT = "언어는 최대 ";
var LANG_POPUP_UPPER_LIMIT_RIGHT = "개까지 선택이 가능합니다.";

var firstLst = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
var secondLst = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
var thirdLst = ["//","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
var keyboardLst = ["ㅁ","ㅠ","ㅊ","ㅇ","ㄷ","ㄹ","ㅎ","ㅗ","ㅑ","ㅓ","ㅏ","ㅣ","ㅡ","ㅜ","ㅐ","ㅔ","ㅂ","ㄱ","ㄴ","ㅅ","ㅕ","ㅍ","ㅈ","ㅌ","ㅛ","ㅋ"];
var twinConsonantLst = ["ㄲ","ㄸ","ㅃ","ㅆ","ㅉ"];
var hangleKeyLst = ["ㄲ","ㄸ","ㅃ","ㅆ","ㅉ","ㅁ","ㅠ","ㅊ","ㅇ","ㄷ","ㄹ","ㅎ","ㅗ","ㅑ","ㅓ","ㅏ","ㅣ","ㅡ","ㅜ","ㅐ","ㅔ","ㅒ","ㅖ","ㅂ","ㄱ","ㄴ","ㅅ","ㅕ","ㅍ","ㅈ","ㅌ","ㅛ","ㅋ"];
var doubleFirstLst = new Array();
var doubleSecondLst = new Array();
var doubleBottomLst = new Array();

var BASE_JISU = 44032;
var CHOSUNG_K = 588;
var JUNGSUNG_K = 28;


/**
 * initialize keyboard data
 * @return
 */
function initialize() {
//	alert("in Korean!!");

//	lgKb.targetElement.style.textAlign= 'left';		
	miniPopUpInfoObjects[0] = "";
	miniPopUpInfoObjects[1] = "";
	miniPopUpInfoObjects[2] = "";
	miniPopUpInfoObjects[3] = "";
	miniPopUpInfoObjects[4] = "";
	miniPopUpInfoObjects[5] = "";
	miniPopUpInfoObjects[6] = "";
	miniPopUpInfoObjects[7] = "";
	miniPopUpInfoObjects[8] = "";
	miniPopUpInfoObjects[9] = "";

	doubleSecondLst[2] = new Array("ㅣ");
	doubleSecondLst[6] = new Array("ㅣ");
	doubleSecondLst[8] = new Array("ㅏ","ㅐ","ㅣ");
	doubleSecondLst[13] = new Array("ㅓ","ㅔ","ㅣ");
	doubleSecondLst[18] = new Array("ㅣ");

	doubleBottomLst[1] = new Array(" ","ㅅ");
	doubleBottomLst[4] = new Array("ㅈ","ㅎ");
	doubleBottomLst[7] = new Array(" ");
	doubleBottomLst[8] = new Array("ㄱ","ㅁ","ㅂ","ㅅ","ㅌ","ㅍ","ㅎ");
	doubleBottomLst[17] = new Array("ㅅ");
	doubleBottomLst[19] = new Array(" ");
	doubleBottomLst[22] = new Array(" ");
}

/**
 * return page idx change button label
 * @return
 */
function getPageHtml(isFocus) {
	var f = "";
	if(isFocus) {
		f = "f";
	}
	return '<font id="font'+f+'0">한</font>/ <font id="font'+f+'1" style="margin-left: -3px; color: #4D4D4D">영</font>/ <font id="font'+f+'2" style="margin-left: -3px; color: #4D4D4D">기호</font>';		
}



/**
 * Numeric key display on screen.
 * @param currPageIdx
 * @return truel/false
 */
function isNumericKeyActivated(currPageIdx) {
	if(currPageIdx==1 || currPageIdx == 2 ) {
		return true;
	} else {
		return false;
	}
}


/**
 * change key values
 * @return
 */
function changeKeyValue(category) {
	switch(category)
	{
		case '12;)':
			lgKb.nextCaps = lgKb.selectedCaps;
			lgKb.selectedChar = "12;)";
			setKeyText("wkk_key_001", "`");
			setKeyText("wkk_key_002", "1");
			setKeyText("wkk_key_003", "2");
			setKeyText("wkk_key_004", "3");
			setKeyText("wkk_key_005", "4");
			setKeyText("wkk_key_006", "5");
			setKeyText("wkk_key_007", "6");
			setKeyText("wkk_key_008", "7");
			setKeyText("wkk_key_009", "8");
			setKeyText("wkk_key_010", "9");
			setKeyText("wkk_key_011", "0");
			setKeyText("wkk_key_012", "-");
			setKeyText("wkk_key_013", "=");
			setKeyText("wkk_key_014", " ");
			setKeyText("wkk_key_101", "/");
			setKeyText("wkk_key_102", "^");
			setKeyText("wkk_key_103", "~");
			setKeyText("wkk_key_104", "?");
			setKeyText("wkk_key_105", "!");
			setKeyText("wkk_key_106", "\'");
			setKeyText("wkk_key_107", "\"");
			setKeyText("wkk_key_108", "(");
			setKeyText("wkk_key_109", ")");
			setKeyText("wkk_key_110", ":");
			setKeyText("wkk_key_111", ";");
			setKeyText("wkk_key_112", "+");
			setKeyText("wkk_key_113", "&");
			setKeyText("wkk_key_114", " ");
			setKeyText("wkk_key_201", " ");
			setKeyText("wkk_key_202", "%");
			setKeyText("wkk_key_203", "*");
			setKeyText("wkk_key_204", "<");
			setKeyText("wkk_key_205", ">");
			setKeyText("wkk_key_206", "[");
			setKeyText("wkk_key_207", "]");
			setKeyText("wkk_key_208", "{");
			setKeyText("wkk_key_209", "}");
			setKeyText("wkk_key_210", ",");
			setKeyText("wkk_key_211", "§");
			setKeyText("wkk_key_212", "#");
			setKeyText("wkk_key_213", " ");
			setKeyText("wkk_key_214", " ");
			setKeyText("wkk_key_301", " ");
			setKeyText("wkk_key_302", " ");
			setKeyText("wkk_key_303", "¿");
			setKeyText("wkk_key_304", "¡");
			setKeyText("wkk_key_305", "£");
			setKeyText("wkk_key_306", "$");
			setKeyText("wkk_key_307", "¥");
			setKeyText("wkk_key_308", "＼");
			setKeyText("wkk_key_309", "|");
			setKeyText("wkk_key_310", ".");
			setKeyText("wkk_key_311", "@");
			setKeyText("wkk_key_312", "_");
			setKeyText("wkk_key_313", " ");
			setKeyText("wkk_key_314", " ");
			setKeyText("wkk_key_401", "http://");
			setKeyText("wkk_key_402", "www.");
			setKeyText("wkk_key_403", ".com");
			setKeyText("wkk_key_404", " ");
			setKeyText("wkk_key_411", " ");
			setKeyText("wkk_key_412", " ");
			setKeyText("wkk_key_413", " ");
			setKeyText("wkk_key_414", " "); 
			break;
		case 'shift':
			lgKb.category = "shift";
			lgKb.selectedCaps = "shift";
			lgKb.nextCaps = "unshift";
			lgKb.nextChar = "12;)";
			setKeyText("wkk_key_001", "~");
			setKeyText("wkk_key_002", "!");
			setKeyText("wkk_key_003", "@");
			setKeyText("wkk_key_004", "#");
			setKeyText("wkk_key_005", "$");
			setKeyText("wkk_key_006", "%");
			setKeyText("wkk_key_007", "^");
			setKeyText("wkk_key_008", "&");
			setKeyText("wkk_key_009", "*");
			setKeyText("wkk_key_010", "(");
			setKeyText("wkk_key_011", ")");
			setKeyText("wkk_key_012", "_");
			setKeyText("wkk_key_013", "+");
			setKeyText("wkk_key_014", " ");
			setKeyText("wkk_key_101", "ㅃ", true);
			setKeyText("wkk_key_102", "ㅉ", true);
			setKeyText("wkk_key_103", "ㄸ", true);
			setKeyText("wkk_key_104", "ㄲ", true);
			setKeyText("wkk_key_105", "ㅆ", true);
			setKeyText("wkk_key_106", "ㅛ", true);
			setKeyText("wkk_key_107", "ㅕ", true);
			setKeyText("wkk_key_108", "ㅑ", true);
			setKeyText("wkk_key_109", "ㅒ", true);
			setKeyText("wkk_key_110", "ㅖ", true);
			setKeyText("wkk_key_111", "[");
			setKeyText("wkk_key_112", "]");
			setKeyText("wkk_key_113", "|");
			setKeyText("wkk_key_114", " ");
			setKeyText("wkk_key_201", " ");
			setKeyText("wkk_key_202", "ㅁ", true);
			setKeyText("wkk_key_203", "ㄴ", true);
			setKeyText("wkk_key_204", "ㅇ", true);
			setKeyText("wkk_key_205", "ㄹ", true);
			setKeyText("wkk_key_206", "ㅎ", true);
			setKeyText("wkk_key_207", "ㅗ", true);
			setKeyText("wkk_key_208", "ㅓ", true);
			setKeyText("wkk_key_209", "ㅏ", true);
			setKeyText("wkk_key_210", "ㅣ", true);
			setKeyText("wkk_key_211", ";");
			setKeyText("wkk_key_212", "'");
			setKeyText("wkk_key_213", " ");
			setKeyText("wkk_key_214", " ");
			setKeyText("wkk_key_301", " ");
			setKeyText("wkk_key_302", " ");
			setKeyText("wkk_key_303", "ㅋ", true);
			setKeyText("wkk_key_304", "ㅌ", true);
			setKeyText("wkk_key_305", "ㅊ", true);
			setKeyText("wkk_key_306", "ㅍ", true);
			setKeyText("wkk_key_307", "ㅠ", true);
			setKeyText("wkk_key_308", "ㅜ", true);
			setKeyText("wkk_key_309", "ㅡ", true);
			setKeyText("wkk_key_310", "<");
			setKeyText("wkk_key_311", ">");
			setKeyText("wkk_key_312", "?");
			setKeyText("wkk_key_313", " ");
			setKeyText("wkk_key_314", " ");
			setKeyText("wkk_key_401", "http://");
			setKeyText("wkk_key_402", "www.");
			setKeyText("wkk_key_403", ".com");
			setKeyText("wkk_key_404", " ");
			setKeyText("wkk_key_411", " ");
			setKeyText("wkk_key_412", " ");
			setKeyText("wkk_key_413", " ");
			setKeyText("wkk_key_414", " "); 
			break;
		default :
			lgKb.category = "unshift";
			lgKb.selectedCaps = "unshift";
			lgKb.nextCaps = "shift";
			lgKb.nextChar = "12;)";
			setKeyText("wkk_key_001", "`");
			setKeyText("wkk_key_002", "1");
			setKeyText("wkk_key_003", "2");
			setKeyText("wkk_key_004", "3");
			setKeyText("wkk_key_005", "4");
			setKeyText("wkk_key_006", "5");
			setKeyText("wkk_key_007", "6");
			setKeyText("wkk_key_008", "7");
			setKeyText("wkk_key_009", "8");
			setKeyText("wkk_key_010", "9");
			setKeyText("wkk_key_011", "0");
			setKeyText("wkk_key_012", "-");
			setKeyText("wkk_key_013", "=");
			setKeyText("wkk_key_014", " ");
			setKeyText("wkk_key_101", "ㅂ", true);
			setKeyText("wkk_key_102", "ㅈ", true);
			setKeyText("wkk_key_103", "ㄷ", true);
			setKeyText("wkk_key_104", "ㄱ", true);
			setKeyText("wkk_key_105", "ㅅ", true);
			setKeyText("wkk_key_106", "ㅛ", true);
			setKeyText("wkk_key_107", "ㅕ", true);
			setKeyText("wkk_key_108", "ㅑ", true);
			setKeyText("wkk_key_109", "ㅐ", true);
			setKeyText("wkk_key_110", "ㅔ", true);
			setKeyText("wkk_key_111", "[");
			setKeyText("wkk_key_112", "]");
			setKeyText("wkk_key_113", "\\");
			setKeyText("wkk_key_114", " ");
			setKeyText("wkk_key_201", " ");
			setKeyText("wkk_key_202", "ㅁ", true);
			setKeyText("wkk_key_203", "ㄴ", true);
			setKeyText("wkk_key_204", "ㅇ", true);
			setKeyText("wkk_key_205", "ㄹ", true);
			setKeyText("wkk_key_206", "ㅎ", true);
			setKeyText("wkk_key_207", "ㅗ", true);
			setKeyText("wkk_key_208", "ㅓ", true);
			setKeyText("wkk_key_209", "ㅏ", true);
			setKeyText("wkk_key_210", "ㅣ", true);
			setKeyText("wkk_key_211", ";");
			setKeyText("wkk_key_212", "'");
			setKeyText("wkk_key_213", " ");
			setKeyText("wkk_key_214", " ");
			setKeyText("wkk_key_301", " ");
			setKeyText("wkk_key_302", " ");
			setKeyText("wkk_key_303", "ㅋ", true);
			setKeyText("wkk_key_304", "ㅌ", true);
			setKeyText("wkk_key_305", "ㅊ", true);
			setKeyText("wkk_key_306", "ㅍ", true);
			setKeyText("wkk_key_307", "ㅠ", true);
			setKeyText("wkk_key_308", "ㅜ", true);
			setKeyText("wkk_key_309", "ㅡ", true);
			setKeyText("wkk_key_310", ",");
			setKeyText("wkk_key_311", ".");
			setKeyText("wkk_key_312", "/");
			setKeyText("wkk_key_313", " ");
			setKeyText("wkk_key_314", " ");
			setKeyText("wkk_key_401", "http://");
			setKeyText("wkk_key_402", "www.");
			setKeyText("wkk_key_403", ".com");
			setKeyText("wkk_key_404", " ");
			setKeyText("wkk_key_411", " ");
			setKeyText("wkk_key_412", " ");
			setKeyText("wkk_key_413", " ");
			setKeyText("wkk_key_414", " "); 
			break;
	}
	toggleKeyChange();
}

/**
 * add space to textbox's content
 * @return
 */
function addSpaceText() {
	setNewMode(0);
	appendText(document.getElementById("wkk_key_spacebar"));
}

/**
 * backspace text
 * @return
 */
function backspaceText() {
	var textItem = lgKb.targetElement;
	
	if( textItem != null) {
		var isKor = isCaretActivated();
		if (isKor) {
			doSomeAfterPressMuteForHangul();
		} else {
			deletePrevChar();
		}
	}
}

/**
 * 
 * @param val
 * @return
 */
function appendText(key) {
	var textItem = lgKb.targetElement;
	var content = key.firstChild.nodeValue;
	if( textItem != null) {
		if(content == " ") {
			addStrIntoFld(" ", true);
		}else{
			if( key.combination == 'true' ) {
				var kObj = getHangul(content);
				addStrIntoFldForHangul(kObj);
			} else {
				addStrIntoFld(content, true);
				lgKb.clearCaretInfo();
			}
		}		
	}
}

/**
 * pre processing define when key pressed (for combination charset ex> hangle)
 * @param nMode
 * @return
 */
function setNewMode(nMode) {
	mode = new Number(nMode);
	if(mode == 0) {
		historyLst = null;
		historyLst = new Array();
		initializeIndex();
	}
}


/*start of hangle handle*/

var firstIdx = new Number();
var secondIdx = new Number();
var thirdIdx = new Number();
var doubleBottomIdx = new Number();
var mode = new Number();
var historyLst = new Array();
var lastInputChar = new String();
var isScreen = true;


function initializeIndex() {
	firstIdx = -1;
	secondIdx = -1;
	thirdIdx = -1;
	doubleBottomIdx = -1;
}


function getLastInputChar() {
	var kHistory = historyLst[historyLst.length -1];
	if(kHistory == null) {
		return null;
	}
	return kHistory.inputChar;
}

function deleteChar(u) {
	var kCurrent = historyLst[historyLst.length -1];
	if(kCurrent.newSecondIdx > -1 ) {
		kCurrent.newSecondIdx = -1;
		if(kCurrent.newFirstIdx > -1 ) {
			setNewMode(1);
		} else {
			setNewMode(0);
		}
		kCurrent.deleteLen = 2;
	} else if (kCurrent.newFirstIdx > -1) {
		kCurrent.newFirstIdx = -1;
		setNewMode(0);
		kCurrent.deleteLen = 2;
	} else if (kCurrent.doubleBottomIdx > -1 ) {
		thirdIdx = revertThirdIdx( kCurrent.thirdIdx, kCurrent.doubleBottomIdx);
		kCurrent.doubleBottomIdx = -1;
		kCurrent.thirdIdx = thirdIdx;
		setNewMode(3);
		kCurrent.deleteLen = 1;
	} else if (kCurrent.thirdIdx > -1) {
		thirdIdx = -1;
		doubleBottomIdx = -1;
		kCurrent.thirdIdx = -1;
		setNewMode(2);
		kCurrent.deleteLen = 1;
	} else if (kCurrent.secondIdx > -1 ) {
		if (( u =="forReplace") && (kCurrent.secondIdx == 9 || kCurrent.secondIdx == 14 )) {
			kCurrent.secondIdx -= 1;
			secondIdx = kCurrent.secondIdx;
			lastInputChar = secondLst[kCurrent.secondIdx];
			kCurrent.inputChar = lastInputChar;
			setNewMode(2);
		} else {
			secondIdx= - -1;
			kCurrent.secondIdx = -1;
			lastInputChar = firstLst[kCurrent.firstIdx];
			kCurrent.inputChar = lastInputChar;
			setNewMode(1);
		}
		kCurrent.deleteLen = 1;
	} else if (kCurrent.firstIdx > -1 ) {
		firstIdx = -1;
		kCurrent.firstIdx = -1;
		setNewMode(0);
		kCurrent.deleteLen = 1;
	}
	kCurrent.resultChar = getKoreanChar(kCurrent.firstIdx, kCurrent.secondIdx, kCurrent.thirdIdx);
	kCurrent.newChar = getKoreanChar(kCurrent.newFirstIdx, kCurrent.newSecondIdx, kCurrent.newThirdIdx);
	return kCurrent;
}

function initHistoryLastIdx( his ) {
	if( his.thirdIdx > -1) {
		his.thirdIdx = -1;
		his.mode = 2;
	} else if ( his.secondIdx > -1) {
		his.secondIdx = -1;
		his.mode = 1;
	} else if ( his.firstIdx > -1 ) {
		his.firstIdx = -1;
		his.mode = 0;
	}
}

function initHistoryLastNewIdx(his) {
	if( his.newThirdIdx > -1) {
		his.newThirdIdx = -1;
		his.mode = 2;
	} else if (his.newSecondIdx > -1) {
		his.newSecondIdx = -1;
		his.mode = 1;
	} else if (his.newFirstIdx > -1) {
		his.newFirstIdx = -1;
		his.mode = 0;
	}
}

function getCanDeleteChar() {
	if( historyLst.length > 0 ) {
		return true;
	} else {
		return false;
	}
}

function revertThirdIdx( t, db ) {
	return new Number(t) - new Number(db) -1;
}

function doublizeThirdIdx( t, db) {
	return new Number(t) + new Number(db) +1;
}

function getInitialObj( c ) {
	var obj = new Object();
	obj.firstIdx = firstIdx;
	obj.secondIdx = secondIdx;
	obj.thirdIdx = thirdIdx;
	obj.doubleBottomIdx = doubleBottomIdx;
	obj.newFirstIdx = -1;
	obj.newSecondIdx = -1;
	obj.newThirdIdx = -1;
	obj.isCompleted = false;
	obj.inputChar = c;
	obj.resultChar = "";
	obj.newChar = "";
	obj.mode = mode;
	return obj;
}

function getArrayIndex( array, str, defaultValue) {
	var dv = new Number(defaultValue);
	if(array != null && array.length > 0 ) {
		for( var i = 0 ; i < array.length ; i++ ) {
			if( array[i] == str) {
				dv = i;
				break;
			}
		}
	}
	return dv;
}


function doSomeWhenConsonant( result ) {
	var kChar = result.inputChar;
	var kLastChar = getLastInputChar();
	if( mode == 0) {
		firstIdx = getArrayIndex(firstLst, kChar, -1);
		setNewMode(1);
		result.firstIdx = firstIdx;
	} else if ( mode == 1) {
		initializeIndex();
		firstIdx = getArrayIndex(firstLst, kChar, -1);
		setNewMode(1);
		result.isCompleted = true;
		result.newFirstIdx = firstIdx;
	} else if ( mode == 2) {
		if ( firstIdx == -1) {
			initializeIndex();
			firstIdx = getArrayIndex(firstLst, kChar, -1);
			setNewMode(1);
			result.isCompleted = true;
			result.newFirstIdx = firstIdx;
		} else {
			thirdIdx = getArrayIndex(thirdLst, kChar, -1);

			if (thirdIdx != -1) {
				setNewMode(3);
				result.thirdIdx = thirdIdx;				
			} else {
				initializeIndex();
				firstIdx = getArrayIndex(firstLst, kChar, -1);
				setNewMode(1);
				result.isCompleted = true;
				result.newFirstIdx = firstIdx;
			}
		}
	} else if ( mode == 3) {
		var kSubDBLst = doubleBottomLst[thirdIdx];
		if(kSubDBLst == null || kSubDBLst.length == 0 ) {
			initializeIndex();
			firstIdx = getArrayIndex(firstLst, kChar, -1);
			setNewMode(1);
			result.isCompleted = true;
			result.newFirstIdx = firstIdx;
		} else {
			doubleBottomIdx = getArrayIndex(kSubDBLst, kChar, -1);
			if( doubleBottomIdx == -1) {
				initializeIndex();
				setNewMode(1);
				firstIdx = getArrayIndex(firstLst, kChar, -1);
				result.isCompleted = true;
				result.newFirstIdx = firstIdx;
			} else {
				setNewMode(4);
				thirdIdx = doublizeThirdIdx(thirdIdx, doubleBottomIdx);
				result.thirdIdx = thirdIdx;
			}
			result.doubleBottomIdx = doubleBottomIdx;
		}
	} else if ( mode == 4) {
		initializeIndex();
		setNewMode(1);
		firstIdx = getArrayIndex(firstLst, kChar, -1);
		result.isCompleted = true;
		result.newFirstIdx = firstIdx;
	}
}

function doSomeWhenVowel(result) {
	var kChar = result.inputChar;
	var kLastChar = getLastInputChar();

	if( mode == 0) {
		setNewMode(0);
		var kSecondIdx = getArrayIndex(secondLst, kChar, -1);
		result.isCompleted = true;
		result.secondIdx = kSecondIdx;
	} else if (mode == 1) {
		secondIdx = getArrayIndex(secondLst,kChar,-1);
		setNewMode(2);
		result.secondIdx = secondIdx;
	} else if ( mode == 2) {
		var kSubDSLst = doubleSecondLst[secondIdx];
		
		if( isScreen && kChar =="ㅣ") {
			if(kLastChar == "ㅑ" || kLastChar == "ㅕ") {
				kSubDSLst = null;
			}
		}
		if(kSubDSLst == null || kSubDSLst.length == 0) {
			setNewMode(0);
			var kSecondIdx = getArrayIndex(secondLst, kChar, -1);
			result.isCompleted = true;
			result.newSecondIdx = kSecondIdx;
		} else {
			var kSubDSIdx = getArrayIndex(kSubDSLst, kChar, -1);
			if(kSubDSIdx == -1) {
				setNewMode(0);
				var kSecondIdx = getArrayIndex(secondLst, kChar, -1);
				result.isCompleted = true;
				result.newSecondIdx = kSecondIdx;
			} else {
				secondIdx = new Number(secondIdx) + new Number(kSubDSIdx) + 1;
				setNewMode(2);
				result.secondIdx = secondIdx;
			}
		}
	} else if ( mode == 3) {
		initializeIndex();
		firstIdx = getArrayIndex(firstLst, kLastChar, -1);
		secondIdx = getArrayIndex(secondLst, kChar, -1);
		setNewMode(2);
		result.isCompleted = true;
		result.thirdIdx = -1;
		result.newFirstIdx = firstIdx;
		result.newSecondIdx = secondIdx;
	} else if ( mode == 4) {
		var kFirstIdx = getArrayIndex(firstLst, thirdLst[thirdIdx], -1);
		if(kFirstIdx == -1) {
			var kThirdIdx = revertThirdIdx(thirdIdx, doubleBottomIdx);
			initializeIndex();
			firstIdx = getArrayIndex(firstLst, kLastChar, -1);
			secondIdx = getArrayIndex(secondLst, kChar, -1);
			setNewMode(2);
			result.isCompleted = true;
			result.thirdIdx = kThirdIdx;
			result.newFirstIdx = firstIdx;
			result.newSecondIdx = secondIdx;
			result.doubleBottomIdx = doubleBottomIdx = -1;
		} else {
			initializeIndex();
			firstIdx = kFirstIdx;
			secondIdx = getArrayIndex(secondLst, kChar, -1);
			setNewMode(2);
			result.isCompleted = true;
			result.thirdIdx = thirdIdx;
			result.newFirstIdx = firstIdx;
			result.newSecondIDx = secondIdx;
		}
	}
}

function compound(result) {
	var kInputChar = result.inputChar;
	var kIsConsonant = false;
	if(getArrayIndex(firstLst, kInputChar, -1) > -1) {
		kIsConsonant = true;
	}
	if(kIsConsonant) {
		
		doSomeWhenConsonant(result);
	} else {
	
		doSomeWhenVowel(result);
	}
	result.resultChar = getKoreanChar(result.firstIdx, result.secondIdx, result.thirdIdx);
	result.newChar = getKoreanChar(result.newFirstIdx, result.newSecondIdx, result.newThirdIdx);
	result.newMode = mode;
}

function getHangul( c ) {
	var kResult = getInitialObj(c);
	compound(kResult);
	if(kResult.isCompleted) {
		historyLst = null;
		historyLst = new Array();
	}
	historyLst.push(kResult);
	lastInputChar = c;
	return kResult;
}

function doSomeAfterPressMuteForHangul() {
	var kSelected = isCaretActivated();
	var kIdx = getCaretPosition();
	var kCanDelete = (kSelected || kIdx > 0);
	if (kCanDelete)
	{
		if (getCanDeleteChar())
		{
			if (kSelected)
			{
				var kResult = deleteCharPressingBackSpace();
				deleteCharInCompoundingForHangul(kResult);
			}
			else
			{
				deleteCharAtForHangul(kIdx -1);
			}
			
			historyLst.pop();
			if(historyLst.length == 0)
			{
				lgKb.clearCaretInfo();
				currentCaretIdx++;
			}
		}
		else
		{
			deleteCharAtForHangul(kIdx-1);
			lgKb.clearCaretInfo();
		}
	}
}

function deleteCharInCompoundingForHangul(result) {
	var resultChar = result.resultChar == null ? "" : result.resultChar;
	var newChar = result.newChar == null ? "" : result.newChar;
	var kNew = resultChar + newChar;
	var kTxt = getTextContent(); 
	var kCaretSelected = isCaretActivated();
	var kDeleteLen = 1;

		
	if( result.deleteLen != null && result.deleteLen != "undefined" ) {
		kDeleteLen = result.deleteLen;
	}

	var kIdx = getCaretPosition();

	var kTxt_0;
	var kTxt_1;
	var kCaretIdx; 

	if (kNew.length == 0) {
		
		if(kDIdx == 0 || kDIdx == 1){
			kTxt_0 = kTxt.substr(0, kIdx);
			kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
		}else{
			kTxt_0 = kTxt.substr(0, kIdx -1);
			kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
			kDIdx = 0;
		}
		kCaretIdx = kTxt_0.length;
		kCaretSelected = false;
		kDIdx++;
		
	} else if (kNew.length == 2) {
	
		kTxt_0 = kTxt.substr(0, kIdx-1);
		kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);

		kCaretIdx = (kTxt_0 + kNew).length -1;
		kCaretSelected = true;
	} else {
		
		if (kDeleteLen == 2) {
			kTxt_0 = kTxt.substr(0, kIdx -1);
			kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
			kCaretIdx = (kTxt_0 + kNew).length;
			
		} else {
			kTxt_0 = kTxt.substr(0, kIdx);
			kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
			kCaretIdx = kIdx;
			kCaretSelected = true;
			
		}
	}
	var kJoin = kTxt_0 + kNew + kTxt_1;
	
	putStrIntoFldForHangul(kJoin, kCaretIdx, kCaretSelected);
}

function deleteCharPressingBackSpace() {
	lastInputNum = -1;
	lastInputChar = "";
	return deleteChar("forDelete");

}

function deleteCharAtForHangul(idx) {
	var kTxt = getTextContent();
	var kTxt_0 = kTxt.substr(0, idx);
	var kTxt_1 = kTxt.substr(idx + 1, kTxt.length);
	var kJoin = kTxt_0 + kTxt_1;
	var kCaretIdx = idx;
	putStrIntoFldForHangul(kJoin, kCaretIdx, false);	

}

function putStrIntoFldForHangul(str, idx, selected) {
	
	var kStr = (str == null) ? "" : str;

	setTextContent(kStr);
	if (kStr.length == 0) {
		setCaretPosition(0, 0);
		caretMoved();
	} else {
		setCaretPosition(idx, 1);
	}
}

function addStrIntoFldForHangul( result ) {
	
	var kNew = "";
	if(result.resultChar !=null && result.resultChar.length>0) {
		kNew = result.resultChar;
	}
	if(result.newChar != null && result.newChar.length>0) {
		kNew = kNew + result.newChar;
	}

	if( result.deleteLen != null && result.deleteLen != "undefined") {
		kDeleteLen = result.deleteLen;
	}
	var kTxt = getTextContent();

	var kMode = result.mode;
	var kCaretSelected = isCaretActivated();

	var kIsCompounding = ( kCaretSelected && (kMode > 0) );
	var kIdx = getCaretPosition();
	var kIsEnd = false;
	if(kCaretSelected) {
		kIsEnd = (kIdx >= kTxt.length-1);
	} else {
		kIsEnd = (kIdx >= kTxt.length);
	}

	var kJoin = "";
	if(kTxt.length == 0) {
		addCharToEndForHangul(kTxt, kNew, kNew.length -1);
	} else if (kIsEnd) {
		if(kIsCompounding) {
			if(result.doubleCompounding) {
				kTxt = kTxt.substr(0, kTxt.length -2);
			} else {
				kTxt = kTxt.substr(0, kTxt.length -1);
			}
			kJoin = kTxt + kNew ;
			addCharToEndForHangul(kTxt, kNew, kJoin.length-1);
		} else {
			kJoin = kTxt + kNew;
			addCharToEndForHangul(kTxt, kNew, kJoin.length -1);
		}
	} else {
		if(kIsCompounding)
		{
			replaceCharForHangul(kTxt, kNew, kIdx, result.doubleCompounding);
		}
		else
		{
			if(kCaretSelected)
			{
				kIdx++;
			}
			
			insertCharForHangul(kTxt, kNew, kIdx);
		}
	}
}

function addCharToEndForHangul(txt, c, caretIdx) {
	var kJoin = txt + c;
	putStrIntoFldForHangul(kJoin, caretIdx, true);
}

function replaceCharForHangul(txt, c, idx, doubleCompounding) {
	var kTxt_0 = "";
	var kTxt_1 = "";
	if(doubleCompounding) {
		kTxt_0 = txt.substr(0, new Number(idx) -1);
	} else {
		kTxt_0 = txt.substr(0, idx);
	}
	kTxt_1 = txt.substr(new Number(idx) +1, txt.length);

	var kJoin = kTxt_0 + c + kTxt_1;
	var kCaretIdx = (kTxt_0 + c).length -1;
	putStrIntoFldForHangul(kJoin, kCaretIdx, true);
}

function insertCharForHangul(txt, c, idx) {
	var kTxt_0 = txt.substr(0, idx);
	var kTxt_1 = txt.substr(idx, txt.length);
	var kJoin = kTxt_0 + c + kTxt_1;
	var kCaretIdx = (kTxt_0 + c).length -1;
	putStrIntoFldForHangul(kJoin, kCaretIdx, true);
}

function getIsHangleKey( c ) {
	var idx = getArrayIndex( hangleKeyLst, c, -1);
	if( idx == -1) {
		return false;
	} else {
		return true;
	}
}

function checkDoubleBottomConsonant( prevCons, curCons) {
	var isFound = 0;
	var idx = 0;

	for(idx = 0 ; idx < thirdLst.length ; idx ++ ) {
		if (thirdLst[idx] == prevCons) {
			isFound = 1;
			break;
		}
	}
	if ( isFound == 0 ) {
		return -1;
	} 
	var kDoubleBottomSubLst = doubleBottomLst[idx];
	if( kDoubleBottomSubLst == null || kDoubleBottomSubLst.length == 0 ) {
		return -1;
	} else {
		isFound = 0;

		for(idx = 0; idx < kDoubleBottomSubLst.length ; idx++ ) {
			if( kDoubleBottomSubLst[idx] == curCons ) {
				isFound =1;
				break;
			}
		}
		if( isFound == 1 ) {
			return idx;
		} else {
			return -1;
		}
	}
}

function getKoreanChar( first, second, third ) {
	var f = new Number(first);
	var s = new Number(second);
	var t = new Number(third);
	if( f == -1) {
		if(s == -1 ) {
			return "";
		} else {
			return secondLst[s];
		}
	} else if (s == -1) {
		return firstLst[f];
	}
	f = new Number(CHOSUNG_K) * f;
	s = new Number(JUNGSUNG_K) * s;
	t = (t == -1) ? 0 : t;
	return String.fromCharCode(BASE_JISU+ f + s + t);
}

function getIsConsonant( c ) {
	var idx = -1;
	for( var i = 0 ; i < thirdLst.length ; i++ ) {
		if(thirdLst[i] == c ) {
			idx = i;
			break;
		}
	}
	if ( idx > -1 ) {
		return true;
	} else {
		return false;
	}
}

function getIsVowel ( c ) {
	var idx = -1;
	for( var i = 0 ; i < secondLst.length ; i++ ) {
		if(secondLst[i] == c ) {
			idx = i;
			break;
		}
	}
	if ( idx > -1 ) {
		return true;
	} else {
		return false;
	}
}

function getKorCharWithKetyCode( code) {
	var kIdx = new Number(Code) - 65;
	return keyboardLst[kIdx];
}

function getIsTwinWithChar ( c ) {
	var idx = -1;
	for( var i = 0 ; i < twinConsonantLst.length ; i++ ) {
		if(twinConsonantLst[i] == c ) {
			idx = i;
			break;
		}
	}
	if ( idx > -1 ) {
		return true;
	} else {
		return false;
	}
}

function getIsTwinWithFirstIdx( idx ) {
	var kChar = firstLst[idx];
	return getIsTwinWithChar(kChar);
}

/*end of hangle handle*/