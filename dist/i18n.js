/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/i18n.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
const target_element = document.querySelectorAll("*[data-i18n]");
target_element.forEach((target) => {
    const message_name = target.dataset.i18n;
    if (!message_name)
        return;
    const message = browser.i18n.getMessage(message_name);
    if (message)
        target.textContent = message;
});


/******/ })()
;