/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/advanced_setting_view.ts":
/*!**************************************!*\
  !*** ./src/advanced_setting_view.ts ***!
  \**************************************/
/***/ (() => {


function adjust_scroll_position() {
    const header = document.querySelector("header");
    if (header)
        scrollBy(0, parseInt(getComputedStyle(header).height.replace(/px$/, "")) * -2);
    else
        console.error("header was not found.");
}
class Menu {
    constructor() {
        this.overlay = document.getElementById("overlay");
        this.menu = document.getElementById("menu");
        this.item_outer = document.getElementById("menu_item_outer");
        this.open_button = document.getElementById("menu_open_button");
        this.close_button = document.getElementById("menu_close_button");
        this.header = document.querySelector("header");
        this.open_attribute = "data-open";
        if (this.open_button) {
            this.open_button.addEventListener("click", () => {
                this.show();
            });
        }
        else {
            console.error("#menu_open_button was not found.");
        }
        if (this.close_button) {
            this.close_button.addEventListener("click", () => {
                this.hide();
            });
        }
        else {
            console.error("#menu_close_button was not found.");
        }
        if (this.overlay) {
            this.overlay.addEventListener("click", () => {
                this.hide();
            });
        }
        else {
            console.error("#overlay was not found.");
        }
        [...document.querySelectorAll("h2")].reverse().forEach((element) => {
            if (getComputedStyle(element).display !== "none" && element.textContent && this.item_outer) {
                const menu_item = document.createElement("div");
                menu_item.className = "menu_item";
                menu_item.textContent = element.textContent;
                menu_item.addEventListener("click", () => {
                    location.hash = element.id;
                    adjust_scroll_position();
                });
                this.item_outer.insertAdjacentElement("afterbegin", menu_item);
            }
        });
    }
    show() {
        if (!this.menu) {
            console.error("#menu was not found.");
            return;
        }
        else {
            this.menu.setAttribute(this.open_attribute, "");
            if (this.overlay)
                this.overlay.style.display = "block";
            else
                console.error("#overlay was not found.");
        }
    }
    hide() {
        if (!this.menu) {
            console.error("#menu was not found.");
            return;
        }
        else {
            this.menu.removeAttribute(this.open_attribute);
            if (this.overlay)
                this.overlay.style.display = "none";
            else
                console.error("#overlay was not found.");
        }
    }
}
new Menu();
if (location.hash)
    adjust_scroll_position();


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
    --medium_emphasize_text_color: ${change_opacity(setting.font_color, 0.60)};
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
    let merged = "";
    Object.keys(media_selector).forEach((key) => {
        merged += "," + media_selector[key];
    });
    merged = merged.replace(/^,/, "");
    return merged;
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
    normal_text: ".css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0"
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
    hide_media: false,
    include_verified_account: false,
    strict_mode: true,
    show_reason: true,
    ng_word: [""],
    allow_list: [""],
    exclude_url: ["https://twitter.com/home"],
    language_filter: [""],
    advanced_filter: [""],
    main_color: "rgb(29, 161, 242)",
    background_color: "rgb(0, 0, 0)",
    font_color: "rgb(255, 255, 255)"
};
class Setting {
    constructor() {
        this.setting = default_setting;
    }
    async load() {
        const saved_setting = await browser.storage.local.get("setting");
        const setting = default_setting;
        if (saved_setting.setting) {
            Object.keys(default_setting).forEach((key) => {
                setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];
            });
        }
        browser.storage.onChanged.addListener((changes) => {
            this.setting = changes.setting.newValue;
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
        void browser.storage.local.set({ "setting": this.setting });
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
/*!*********************************!*\
  !*** ./src/advanced_setting.ts ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color */ "./src/color.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setting */ "./src/setting.ts");
/* harmony import */ var _advanced_setting_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./advanced_setting_view */ "./src/advanced_setting_view.ts");
/* harmony import */ var _advanced_setting_view__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_advanced_setting_view__WEBPACK_IMPORTED_MODULE_2__);



function get_setting_name(element) {
    const setting_name = element.dataset.settingName;
    if (setting_name)
        return setting_name;
    else
        throw "設定の名称が指定されていないinput要素が見つかりました";
}
async function load_filter_list(setting) {
    const response = await fetch("https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json_data = await response.json();
    const filter_list_outer = document.getElementById("filter_list_outer");
    if (filter_list_outer) {
        Object.keys(json_data).sort().forEach((key) => {
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            // eslint-disable-next-line no-irregular-whitespace
            const checkbox_id = key.replace(/[ 　]/g, "_");
            checkbox.id = checkbox_id;
            checkbox.dataset.filterName = key;
            if (setting.advanced_filter.includes(key))
                checkbox.checked = true;
            checkbox.addEventListener("change", () => {
                const all_checkbox = filter_list_outer.querySelectorAll("input[type='checkbox'");
                setting.advanced_filter = [...all_checkbox].filter((element) => {
                    return element.checked && element.dataset.filterName !== undefined;
                }).map((element) => {
                    return (element.dataset.filterName || "");
                });
            });
            const label = document.createElement("label");
            label.textContent = key;
            label.setAttribute("for", checkbox_id);
            const outer = document.createElement("div");
            outer.className = "filter_list_item";
            outer.appendChild(checkbox);
            outer.appendChild(label);
            filter_list_outer.appendChild(outer);
        });
    }
    else {
        console.log("filter_list_outerが見つかりませんでした");
    }
}
function set_href_attribute() {
    const target = document.getElementById("language_code_link");
    if (target)
        target.setAttribute("href", browser.i18n.getMessage("advanced_setting_language_code_link"));
    else
        console.error("language_code_linkが見つかりませんでした");
}
new _setting__WEBPACK_IMPORTED_MODULE_1__.Setting().load().then((setting) => {
    void (0,_color__WEBPACK_IMPORTED_MODULE_0__.load_color_setting)();
    void load_filter_list(setting);
    set_href_attribute();
    const textarea_element_list = document.querySelectorAll("textarea");
    textarea_element_list.forEach((textarea) => {
        const setting_name = get_setting_name(textarea);
        if (Object.keys(setting).includes(setting_name)) {
            const saved_value = setting[setting_name];
            textarea.value = saved_value instanceof Array ? saved_value.join("\n") : "";
            textarea.addEventListener("change", () => {
                setting[setting_name] = textarea.value.split("\n");
            });
            window.addEventListener("beforeunload", () => {
                setting[setting_name] = textarea.value.split("\n");
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