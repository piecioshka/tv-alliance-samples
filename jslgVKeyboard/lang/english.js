/*
	 LCD TV LABORATORY, LG ELECTRONICS INC., SEOUL, KOREA
	 Copyright(c) 2010 by LG Electronics Inc.

	 All rights reserved. No part of this work may be reproduced, stored in a
	 retrieval system, or transmitted by any means without prior written
	 permission of LG Electronics Inc.
*/

/*
	LG Virtual Keyboard Version 2.0
	

	Copyright (c) 2011 LG Electronics, All Rights Reserved
*/

/**
 * English
 */

/**
 * key board page count
 */
var pageCnt = 2;

/**
 * label string seting
 */
var STR_VK_CLEAR = "Clear";
var LANG_POPUP_TITLE = "Language Selection";
var LANG_POPUP_SELECTED_CNT = " languages are selected";
var LANG_POPUP_MAX_SEL_DESC = "You can select no more than " + nMaxSelLangCnt + " languages.";
var LANG_POPUP_OK = "OK";
var LANG_POPUP_CANCEL = "Cancel";
var LANG_POPUP_LOWER_LIMIT = "need to select at least one language";
var LANG_POPUP_UPPER_LIMIT_LEFT = "Cannot select more than ";
var LANG_POPUP_UPPER_LIMIT_RIGHT = " languages";


/**
 * initialize keyboard data
 * @return
 */
function initialize() {
	chTggIdx=0;
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
	
}




/**
 * Numeric key display on screen.
 * @param currPageIdx
 * @return truel/false
 */
function isNumericKeyActivated(currPageIdx) {
	if(currPageIdx==0 || currPageIdx == 1  ) {
		return true;
	} else {
		return false;
	}
}

/**
 * action that ok button pressed 
 * @return
 */

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
			setKeyText("wkk_key_101", "Q");
			setKeyText("wkk_key_102", "W");
			setKeyText("wkk_key_103", "E");
			setKeyText("wkk_key_104", "R");
			setKeyText("wkk_key_105", "T");
			setKeyText("wkk_key_106", "Y");
			setKeyText("wkk_key_107", "U");
			setKeyText("wkk_key_108", "I");
			setKeyText("wkk_key_109", "O");
			setKeyText("wkk_key_110", "P");
			setKeyText("wkk_key_111", "[");
			setKeyText("wkk_key_112", "]");
			setKeyText("wkk_key_113", "|");
			setKeyText("wkk_key_114", " ");
			setKeyText("wkk_key_201", " ");
			setKeyText("wkk_key_202", "A");
			setKeyText("wkk_key_203", "S");
			setKeyText("wkk_key_204", "D");
			setKeyText("wkk_key_205", "F");
			setKeyText("wkk_key_206", "G");
			setKeyText("wkk_key_207", "H");
			setKeyText("wkk_key_208", "J");
			setKeyText("wkk_key_209", "K");
			setKeyText("wkk_key_210", "L");
			setKeyText("wkk_key_211", ";");
			setKeyText("wkk_key_212", "'");
			setKeyText("wkk_key_213", " ");
			setKeyText("wkk_key_214", " ");
			setKeyText("wkk_key_301", " ");
			setKeyText("wkk_key_302", " ");
			setKeyText("wkk_key_303", "Z");
			setKeyText("wkk_key_304", "X");
			setKeyText("wkk_key_305", "C");
			setKeyText("wkk_key_306", "V");
			setKeyText("wkk_key_307", "B");
			setKeyText("wkk_key_308", "N");
			setKeyText("wkk_key_309", "M");
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
			setKeyText("wkk_key_101", "q");
			setKeyText("wkk_key_102", "w");
			setKeyText("wkk_key_103", "e");
			setKeyText("wkk_key_104", "r");
			setKeyText("wkk_key_105", "t");
			setKeyText("wkk_key_106", "y");
			setKeyText("wkk_key_107", "u");
			setKeyText("wkk_key_108", "i");
			setKeyText("wkk_key_109", "o");
			setKeyText("wkk_key_110", "p");
			setKeyText("wkk_key_111", "[");
			setKeyText("wkk_key_112", "]");
			setKeyText("wkk_key_113", "\\");
			setKeyText("wkk_key_114", " ");
			setKeyText("wkk_key_201", " ");
			setKeyText("wkk_key_202", "a");
			setKeyText("wkk_key_203", "s");
			setKeyText("wkk_key_204", "d");
			setKeyText("wkk_key_205", "f");
			setKeyText("wkk_key_206", "g");
			setKeyText("wkk_key_207", "h");
			setKeyText("wkk_key_208", "j");
			setKeyText("wkk_key_209", "k");
			setKeyText("wkk_key_210", "l");
			setKeyText("wkk_key_211", ";");
			setKeyText("wkk_key_212", "'");
			setKeyText("wkk_key_213", " ");
			setKeyText("wkk_key_214", " ");
			setKeyText("wkk_key_301", " ");
			setKeyText("wkk_key_302", " ");
			setKeyText("wkk_key_303", "z");
			setKeyText("wkk_key_304", "x");
			setKeyText("wkk_key_305", "c");
			setKeyText("wkk_key_306", "v");
			setKeyText("wkk_key_307", "b");
			setKeyText("wkk_key_308", "n");
			setKeyText("wkk_key_309", "m");
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
	var key = document.createElement( 'DIV' );
	key.innerHTML = " ";
	appendText(key);
	lastInputChar = " ";

}

/**
 * backspace text
 * @return
 */
function backspaceText() {
	deletePrevChar();
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
		} else {
			addStrIntoFld(content, true);
		}
	}

}

/**
 * pre processing define when key pressed (for combination charset ex> hangle)
 * @param nMode
 * @return
 */
function setNewMode(nMode) {
	//do nothing
}