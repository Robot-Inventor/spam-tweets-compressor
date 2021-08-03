/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/load_setting.ts":
/*!*****************************!*\
  !*** ./src/load_setting.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "load_setting": () => (/* binding */ load_setting)
/* harmony export */ });
const default_setting = {
    break_threshold: 15,
    hide_media: false,
    trim_leading_whitespace: true,
    include_verified_account: false,
    strict_mode: true,
    show_reason: true,
    character_repetition_threshold: 10,
    ng_word: [""],
    exclude_url: ["https://twitter.com/home"],
    language_filter: [""],
    advanced_filter: [""]
};
async function load_setting() {
    const saved_setting = await browser.storage.local.get("setting");
    const setting = default_setting;
    if (saved_setting.setting) {
        Object.keys(default_setting).forEach((key) => {
            setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
        });
    }
    return setting;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/browser_action.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _load_setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./load_setting */ "./src/load_setting.ts");

class ValidationMessage {
    constructor(element, message) {
        const message_element = document.createElement("span");
        message_element.textContent = message;
        message_element.style.display = "none";
        message_element.className = "validation_message";
        element.insertAdjacentElement("afterend", message_element);
        this.message_element = message_element;
    }
    show() {
        this.message_element.style.display = "inline-block";
    }
    hide() {
        this.message_element.style.display = "none";
    }
}
function get_setting_name(element) {
    const setting_name = element.dataset.settingName;
    if (setting_name)
        return setting_name;
    else
        throw "設定の名称が指定されていないinput要素が見つかりました";
}
(0,_load_setting__WEBPACK_IMPORTED_MODULE_0__.load_setting)().then((setting) => {
    const number_input_element_list = document.querySelectorAll("input[type='number']");
    number_input_element_list.forEach((input_element) => {
        const setting_name = get_setting_name(input_element);
        input_element.value = String(setting[setting_name]);
        const validation_message = new ValidationMessage(input_element, input_element.dataset.validationMessage || "不正な値です");
        input_element.addEventListener("input", () => {
            let new_value_string = input_element.value;
            new_value_string = new_value_string.normalize("NFKC");
            const is_only_number = !/\D/.test(new_value_string);
            if (!is_only_number) {
                validation_message.show();
                return;
            }
            const new_value = parseInt(new_value_string);
            const is_valid_range = (() => {
                const min_number = input_element.min ? parseInt(input_element.min) : null;
                const max_number = input_element.max ? parseInt(input_element.max) : null;
                if (min_number !== null && max_number !== null)
                    return new_value >= min_number && new_value <= max_number;
                else if (min_number === null && max_number !== null)
                    return new_value <= max_number;
                else if (min_number !== null && max_number === null)
                    return new_value >= min_number;
                else
                    return true;
            })();
            if (!is_valid_range) {
                validation_message.show();
                return;
            }
            validation_message.hide();
            setting[setting_name] = new_value;
            void browser.storage.local.set({ "setting": setting });
        });
    });
    const checkbox_input_element = document.querySelectorAll("input[type='checkbox']");
    checkbox_input_element.forEach((input_element) => {
        const setting_name = get_setting_name(input_element);
        const saved_value = setting[setting_name];
        input_element.checked = typeof saved_value === "boolean" ? saved_value : false;
        input_element.addEventListener("change", () => {
            setting[setting_name] = input_element.checked;
            void browser.storage.local.set({ "setting": setting });
        });
    });
}).catch(() => {
    console.error("設定を読み込めませんでした");
});

})();

/******/ })()
;