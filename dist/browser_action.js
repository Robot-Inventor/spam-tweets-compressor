/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/browser_action_view.ts":
/*!************************************!*\
  !*** ./src/browser_action_view.ts ***!
  \************************************/
/***/ (() => {


class TabSwitcher {
    constructor() {
        this.selector = {
            item_group: ".setting_item_group",
            selected_item: ".tab_switcher_item[data-selected]"
        };
        const default_item = document.querySelector(this.selector.selected_item);
        if (default_item)
            this.show_item(default_item.dataset.target);
        const tab_switcher_item = document.querySelectorAll(".tab_switcher_item");
        tab_switcher_item.forEach((item) => {
            item.addEventListener("click", () => {
                const selected_item = document.querySelector(this.selector.selected_item);
                if (selected_item)
                    delete selected_item.dataset.selected;
                item.dataset.selected = "";
                this.show_item(item.dataset.target);
            });
        });
    }
    show_item(selector) {
        if (!selector)
            return;
        const item_group = document.querySelectorAll(this.selector.item_group);
        item_group.forEach((element) => {
            element.style.display = "none";
        });
        const target = document.querySelector(selector);
        if (target)
            target.style.display = "block";
    }
}
function show_version() {
    const manifest = browser.runtime.getManifest();
    const version = manifest.version;
    const target_element = document.getElementById("extension_version");
    if (target_element)
        target_element.textContent = `${version}`;
}
new TabSwitcher();
show_version();


/***/ }),

/***/ "./src/color.ts":
/*!**********************!*\
  !*** ./src/color.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "update_color_setting": () => (/* binding */ update_color_setting),
/* harmony export */   "load_color_setting": () => (/* binding */ load_color_setting)
/* harmony export */ });
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selector */ "./src/selector.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setting */ "./src/setting.ts");


async function update_color_setting() {
    const setting = await new _setting__WEBPACK_IMPORTED_MODULE_1__.Setting().load();
    const tweet_button_inner = document.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.tweet_button_inner);
    if (tweet_button_inner) {
        const main_color = getComputedStyle(tweet_button_inner).backgroundColor;
        if (main_color)
            setting.main_color = main_color;
    }
    const background_color = getComputedStyle(document.body).backgroundColor;
    if (background_color)
        setting.background_color = background_color;
    const account_name = document.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.normal_text);
    if (account_name)
        setting.font_color = getComputedStyle(account_name).color;
}
function change_opacity(rgb, opacity) {
    return rgb.replace(/^rgb\(/, "rgba(").replace(/\)$/, `, ${opacity})`);
}
async function load_color_setting() {
    const setting = await new _setting__WEBPACK_IMPORTED_MODULE_1__.Setting().load();
    const style_element = document.createElement("style");
    style_element.textContent = `
:root {
    --main_color: ${setting.main_color};
    --background_color: ${setting.background_color};
    --high_emphasize_text_color: ${change_opacity(setting.font_color, 0.87)};
    --medium_emphasize_text_color: ${change_opacity(setting.font_color, 0.6)};
}
    `;
    document.body.appendChild(style_element);
}


/***/ }),

/***/ "./src/selector.ts":
/*!*************************!*\
  !*** ./src/selector.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selector": () => (/* binding */ selector)
/* harmony export */ });
function generate_media_selector() {
    const media_selector = {
        image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        video: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x",
        summary_card: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg",
        summary_with_large_image: ".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg"
    };
    return Object.values(media_selector).join(",");
}
const selector = {
    tweet_outer: "div.css-1dbjc4n.r-1adg3ll.r-1ny4l3l",
    tweet_content: ".css-901oao.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0",
    user_name: ".css-901oao.css-bfa6kz.r-1awozwy.r-6koalj.r-1tl8opc.r-a023e6.r-b88u0q.r-rjixqe.r-bcqeeo.r-1udh08x.r-3s2u2q.r-qvutc0",
    user_id: ".css-901oao.css-bfa6kz.r-18u37iz.r-16dba41.r-bcqeeo.r-qvutc0",
    timeline: "main",
    checked_tweet_class_name: "spam-tweets-compressor-checked",
    media: generate_media_selector(),
    verified_badge: "svg.r-4qtqp9.r-yyyyoo.r-1xvli5t.r-9cviqr.r-f9ja8p.r-og9te1.r-bnwqim.r-1plcrui.r-lrvibr",
    hashtag_link_mention: ".css-4rbku5.css-18t94o4.css-901oao.css-16my406.r-1loqt21.r-poiln3.r-bcqeeo.r-qvutc0",
    link_scheme_outer: ".css-901oao.css-16my406.r-1tl8opc.r-hiw28u.r-qvk6io.r-bcqeeo.r-qvutc0",
    tweet_button_inner: ".css-4rbku5.css-18t94o4.css-1dbjc4n.r-42olwf.r-sdzlij.r-1phboty.r-rs99b7.r-1waj6vr.r-1loqt21.r-19yznuf.r-64el8z.r-1ny4l3l.r-o7ynqc.r-6416eg.r-lrvibr",
    normal_text: ".css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0",
    show_tweet_button: ".show-tweet-button"
};


/***/ }),

/***/ "./src/setting.ts":
/*!************************!*\
  !*** ./src/setting.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Setting": () => (/* binding */ Setting)
/* harmony export */ });
const default_setting = {
    include_verified_account: false,
    show_reason: true,
    ng_word: [""],
    allow_list: [""],
    exclude_url: ["https://twitter.com/home"],
    advanced_filter: [""],
    main_color: "rgb(29, 161, 242)",
    background_color: "rgb(0, 0, 0)",
    font_color: "rgb(255, 255, 255)"
};
class Setting {
    constructor() {
        this.setting = default_setting;
        this.callback = undefined;
    }
    async load() {
        const saved_setting = await browser.storage.local.get("setting");
        const setting = default_setting;
        if (saved_setting.setting) {
            Object.keys(default_setting).forEach((key) => {
                setting[key] =
                    saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
            });
        }
        browser.storage.onChanged.addListener((changes) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            this.setting = changes.setting.newValue;
            if (this.callback)
                this.callback();
        });
        return new Proxy(setting, {
            get: (target, key) => {
                return this.setting[key];
            },
            set: (target, key, value) => {
                this.setting[key] = value;
                this.save();
                return true;
            }
        });
    }
    save() {
        void browser.storage.local.set({ setting: this.setting });
    }
    onChange(callback) {
        this.callback = callback;
    }
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/* harmony import */ var _browser_action_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser_action_view */ "./src/browser_action_view.ts");
/* harmony import */ var _browser_action_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_browser_action_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./setting */ "./src/setting.ts");



function get_setting_name(element) {
    const setting_name = element.dataset.settingName;
    if (setting_name)
        return setting_name;
    else
        throw "設定の名称が指定されていないinput要素が見つかりました";
}
new _setting__WEBPACK_IMPORTED_MODULE_2__.Setting()
    .load()
    .then((setting) => {
    void (0,_color__WEBPACK_IMPORTED_MODULE_1__.load_color_setting)();
    const checkbox_input_element = document.querySelectorAll("input[type='checkbox']");
    checkbox_input_element.forEach((input_element) => {
        const setting_name = get_setting_name(input_element);
        const saved_value = setting[setting_name];
        input_element.checked = typeof saved_value === "boolean" ? saved_value : false;
        input_element.addEventListener("change", () => {
            setting[setting_name] = input_element.checked;
        });
    });
})
    .catch(() => {
    console.error("設定を読み込めませんでした");
});

})();

/******/ })()
;