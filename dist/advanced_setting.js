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
    break_threshold: 5,
    hide_media: true,
    trim_leading_whitespace: true,
    include_verified_account: false,
    strict_mode: false,
    character_repetition_threshold: 5,
    ng_word: [""],
    exclude_url: ["https://twitter.com/home", "https://twitter.com/notifications"],
    language_filter: [""]
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
/*!*********************************!*\
  !*** ./src/advanced_setting.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _load_setting__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./load_setting */ "./src/load_setting.ts");

function get_setting_name(element) {
    const setting_name = element.dataset.settingName;
    if (setting_name)
        return setting_name;
    else
        throw "設定の名称が指定されていないinput要素が見つかりました";
}
(0,_load_setting__WEBPACK_IMPORTED_MODULE_0__.load_setting)().then((setting) => {
    const textarea_element_list = document.querySelectorAll("textarea");
    textarea_element_list.forEach((textarea) => {
        const setting_name = get_setting_name(textarea);
        if (Object.keys(setting).includes(setting_name)) {
            const saved_value = setting[setting_name];
            textarea.value = saved_value instanceof Array ? saved_value.join("\n") : "";
            textarea.addEventListener("change", () => {
                setting[setting_name] = textarea.value.split("\n");
                void browser.storage.local.set({ "setting": setting });
            });
        }
    });
    const copy_button = document.getElementById("copy_button");
    if (copy_button) {
        copy_button.addEventListener("click", () => {
            const setting_string = JSON.stringify(setting, null, 4);
            void navigator.clipboard.writeText(setting_string);
            copy_button.textContent = browser.i18n.getMessage("advanced_setting_export_copied");
            setTimeout(() => {
                copy_button.textContent = browser.i18n.getMessage("advanced_setting_export_copy");
            }, 5000);
        });
    }
    const save_button = document.getElementById("save_button");
    if (save_button) {
        save_button.addEventListener("click", () => {
            const setting_string = JSON.stringify(setting, null, 4);
            const download_link = document.createElement("a");
            download_link.href = URL.createObjectURL(new Blob([setting_string], { type: "text/json" }));
            download_link.download = "stc_setting.json";
            download_link.style.display = "none";
            document.body.appendChild(download_link);
            download_link.click();
            download_link.remove();
            save_button.textContent = browser.i18n.getMessage("advanced_setting_export_saved");
            setTimeout(() => {
                save_button.textContent = browser.i18n.getMessage("advanced_setting_export_save");
            }, 5000);
        });
    }
}).catch(() => {
    console.error("設定を読み込めませんでした");
});

})();

/******/ })()
;