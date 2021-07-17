/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/detect_spam.ts":
/*!****************************!*\
  !*** ./src/detect_spam.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"detect_spam\": () => (/* binding */ detect_spam)\n/* harmony export */ });\n/* harmony import */ var _normalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize */ \"./src/normalize.ts\");\n\r\nfunction detect_ng_word(text, ng_words) {\r\n    for (let x = 0; x < ng_words.length; x++) {\r\n        const word = (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize)(ng_words[x]);\r\n        if (!word)\r\n            continue;\r\n        const is_regex = Boolean(word.match(/^\\/(.*)\\/\\D*$/));\r\n        const regex_core_string = word.replace(/^\\//, \"\").replace(/\\/(\\D*)$/, \"\");\r\n        const regex_flag = word.replace(/^\\/.*?\\/(\\D*)$/, \"$1\");\r\n        const regex = new RegExp(regex_core_string, regex_flag);\r\n        if (is_regex && text.match(regex))\r\n            return true;\r\n        if (text.includes(word))\r\n            return true;\r\n    }\r\n    return false;\r\n}\r\nfunction detect_filtered_language(target_language, language_filter) {\r\n    for (let i = 0; i < language_filter.length; i++) {\r\n        const filter = language_filter[i];\r\n        if (target_language === filter)\r\n            return true;\r\n    }\r\n    return false;\r\n}\r\nasync function detect_spam(target, setting) {\r\n    const target_content = (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize)(target.content);\r\n    const breaks = target_content.match(/\\n/g);\r\n    const break_length = breaks ? breaks.length : 0;\r\n    const has_too_many_breaks = break_length >= setting.break_threshold;\r\n    const repeated_character = target_content.match(new RegExp(`(.)\\\\1{${setting.character_repetition_threshold},}`));\r\n    const has_ng_word = detect_ng_word(target_content, setting.ng_word);\r\n    const content_language = await target.language;\r\n    const is_filtered_language = detect_filtered_language(content_language || \"\", setting.language_filter);\r\n    if (has_too_many_breaks || repeated_character || has_ng_word || is_filtered_language)\r\n        return true;\r\n    else\r\n        return false;\r\n}\r\n\n\n//# sourceURL=webpack://spam-tweets-compressor/./src/detect_spam.ts?");

/***/ }),

/***/ "./src/load_setting.ts":
/*!*****************************!*\
  !*** ./src/load_setting.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"load_setting\": () => (/* binding */ load_setting)\n/* harmony export */ });\n;\r\nconst default_setting = {\r\n    break_threshold: 5,\r\n    hide_media: true,\r\n    strict_mode: false,\r\n    character_repetition_threshold: 5,\r\n    ng_word: [\"\"],\r\n    exclude_url: [\"https://twitter.com/home\", \"https://twitter.com/notifications\"],\r\n    language_filter: [\"\"]\r\n};\r\nasync function load_setting() {\r\n    const saved_setting = await browser.storage.local.get(\"setting\");\r\n    const setting = default_setting;\r\n    if (saved_setting.setting) {\r\n        Object.keys(default_setting).forEach((key) => {\r\n            setting[key] = saved_setting.setting[key] !== undefined ? saved_setting.setting[key] : default_setting[key];\r\n        });\r\n    }\r\n    return setting;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack://spam-tweets-compressor/./src/load_setting.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _detect_spam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detect_spam */ \"./src/detect_spam.ts\");\n/* harmony import */ var _load_setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load_setting */ \"./src/load_setting.ts\");\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selector */ \"./src/selector.ts\");\n/* harmony import */ var _tweet_analyser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tweet_analyser */ \"./src/tweet_analyser.ts\");\n\r\n\r\n\r\n\r\nfunction get_unchecked_tweets() {\r\n    const tweets = document.querySelectorAll(`${_selector__WEBPACK_IMPORTED_MODULE_2__.selector.tweet_outer}:not(.${_selector__WEBPACK_IMPORTED_MODULE_2__.selector.checked_tweet_class_name})`);\r\n    let result = [];\r\n    tweets.forEach(async (element) => {\r\n        element.classList.add(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.checked_tweet_class_name);\r\n        const analyser = new _tweet_analyser__WEBPACK_IMPORTED_MODULE_3__.TweetAnalyser(element);\r\n        element.content = analyser.get_content();\r\n        element.user_name = analyser.get_user_name();\r\n        element.user_id = analyser.get_user_id();\r\n        element.language = analyser.get_language();\r\n        element.compress = (compressor_mode, hide_media) => {\r\n            const content_element = element.querySelector(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.tweet_content);\r\n            if (!content_element)\r\n                return;\r\n            if (compressor_mode === \"normal\") {\r\n                const raw_content = content_element.innerHTML;\r\n                element.dataset.rawHTML = raw_content;\r\n                element.dataset.rawContent = element.content;\r\n                const compressed_content = content_element.innerHTML.replaceAll(\"\\n\", \"\");\r\n                if (content_element)\r\n                    content_element.innerHTML = compressed_content;\r\n                element.content = element.content.replaceAll(\"\\n\", \"\");\r\n                const media = element.querySelector(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.media);\r\n                if (media && hide_media)\r\n                    media.style.display = \"none\";\r\n                const decompress_button = document.createElement(\"button\");\r\n                decompress_button.className = \"decompress-button\";\r\n                const decompress_button_normal = browser.i18n.getMessage(\"decompress_button_normal\");\r\n                decompress_button.textContent = decompress_button_normal;\r\n                content_element.appendChild(decompress_button);\r\n                decompress_button.addEventListener(\"click\", () => {\r\n                    content_element.innerHTML = element.dataset.rawHTML || \"\";\r\n                    element.content = element.dataset.rawContent || \"\";\r\n                    if (media && hide_media)\r\n                        media.style.display = \"block\";\r\n                    decompress_button.remove();\r\n                });\r\n            }\r\n            else {\r\n                const decompress_button = document.createElement(\"button\");\r\n                decompress_button.setAttribute(\"class\", element.getAttribute(\"class\") || \"\");\r\n                decompress_button.classList.add(\"show-tweet-button\");\r\n                const text_color = (() => {\r\n                    const user_name_element = element.querySelector(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.user_name);\r\n                    if (user_name_element)\r\n                        return getComputedStyle(user_name_element).getPropertyValue(\"color\");\r\n                    else\r\n                        return \"#1da1f2\";\r\n                })();\r\n                decompress_button.style.color = text_color;\r\n                const user_name = element.user_name;\r\n                const user_id = element.user_id;\r\n                const button_text = browser.i18n.getMessage(\"decompress_button_strict\", [user_name, user_id]);\r\n                decompress_button.textContent = button_text;\r\n                decompress_button.addEventListener(\"click\", () => {\r\n                    element.style.display = \"block\";\r\n                    decompress_button.remove();\r\n                });\r\n                element.style.display = \"none\";\r\n                element.insertAdjacentElement(\"afterend\", decompress_button);\r\n            }\r\n        };\r\n        result.push(element);\r\n    });\r\n    return result;\r\n}\r\nasync function run_check(setting) {\r\n    const exclude_url = setting.exclude_url;\r\n    if (exclude_url.includes(location.href))\r\n        return;\r\n    const check_target = get_unchecked_tweets();\r\n    const compressor_mode = setting.strict_mode ? \"strict\" : \"normal\";\r\n    const hide_media = setting.hide_media;\r\n    for (let i = 0; i < check_target.length; i++) {\r\n        const target = check_target[i];\r\n        const is_spam = await (0,_detect_spam__WEBPACK_IMPORTED_MODULE_0__.detect_spam)(target, setting);\r\n        if (is_spam)\r\n            target.compress(compressor_mode, hide_media);\r\n    }\r\n}\r\n(async () => {\r\n    const setting = await (0,_load_setting__WEBPACK_IMPORTED_MODULE_1__.load_setting)();\r\n    const body_observer_target = document.body;\r\n    const body_observer = new MutationObserver(() => {\r\n        const timeline = document.querySelector(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.timeline);\r\n        if (timeline) {\r\n            body_observer.disconnect();\r\n            const main_observer_target = timeline;\r\n            const main_observer = new MutationObserver(() => {\r\n                run_check(setting);\r\n            });\r\n            main_observer.observe(main_observer_target, {\r\n                childList: true,\r\n                subtree: true\r\n            });\r\n        }\r\n    });\r\n    body_observer.observe(body_observer_target, {\r\n        childList: true,\r\n        subtree: true\r\n    });\r\n})();\r\n\n\n//# sourceURL=webpack://spam-tweets-compressor/./src/main.ts?");

/***/ }),

/***/ "./src/normalize.ts":
/*!**************************!*\
  !*** ./src/normalize.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"normalize\": () => (/* binding */ normalize)\n/* harmony export */ });\nfunction normalize(text) {\r\n    text = text.normalize(\"NFKC\").toLowerCase().replace(/[ぁ-ん]/g, (s) => {\r\n        return String.fromCharCode(s.charCodeAt(0) + 0x60);\r\n    });\r\n    return text;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack://spam-tweets-compressor/./src/normalize.ts?");

/***/ }),

/***/ "./src/selector.ts":
/*!*************************!*\
  !*** ./src/selector.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"selector\": () => (/* binding */ selector)\n/* harmony export */ });\nfunction generate_media_selector() {\r\n    const media_selector = {\r\n        image: \".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg\",\r\n        video: \".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1s2bzr4.r-1ny4l3l.r-1udh08x\",\r\n        summary_card: \".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-18u37iz.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg\",\r\n        summary_with_large_image: \".css-1dbjc4n.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg\"\r\n    };\r\n    let merged = \"\";\r\n    Object.keys(media_selector).forEach((key) => {\r\n        merged += \",\" + media_selector[key];\r\n    });\r\n    merged = merged.replace(/^\\,/, \"\");\r\n    return merged;\r\n}\r\nconst selector = {\r\n    tweet_outer: \".css-1dbjc4n.r-qklmqi.r-1adg3ll.r-1ny4l3l\",\r\n    tweet_content: \".css-901oao.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0\",\r\n    user_name: \".css-901oao.css-16my406.r-1tl8opc.r-bcqeeo.r-qvutc0\",\r\n    user_id: \".css-901oao.css-bfa6kz.r-18u37iz.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-qvutc0\",\r\n    timeline: \"main\",\r\n    checked_tweet_class_name: \"spam-tweets-compressor-checked\",\r\n    media: generate_media_selector()\r\n};\r\n\n\n//# sourceURL=webpack://spam-tweets-compressor/./src/selector.ts?");

/***/ }),

/***/ "./src/tweet_analyser.ts":
/*!*******************************!*\
  !*** ./src/tweet_analyser.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TweetAnalyser\": () => (/* binding */ TweetAnalyser)\n/* harmony export */ });\n/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selector */ \"./src/selector.ts\");\n\r\nclass TweetAnalyser {\r\n    constructor(tweet) {\r\n        this.tweet = tweet;\r\n        this.content_element = tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.tweet_content);\r\n    }\r\n    get_content() {\r\n        if (!this.content_element)\r\n            return \"\";\r\n        return this.content_element.textContent || \"\";\r\n    }\r\n    get_user_name() {\r\n        const user_name_element = this.tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.user_name);\r\n        if (user_name_element)\r\n            return user_name_element.textContent || \"\";\r\n        else\r\n            return \"\";\r\n    }\r\n    get_user_id() {\r\n        const user_id_element = this.tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.user_id);\r\n        if (user_id_element)\r\n            return user_id_element.textContent || \"\";\r\n        else\r\n            return \"\";\r\n    }\r\n    async get_language() {\r\n        const detect = await browser.i18n.detectLanguage(this.get_content());\r\n        if (detect.isReliable)\r\n            return detect.languages[0].language.replace(/\\-.*$/, \"\");\r\n        else\r\n            return \"\";\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://spam-tweets-compressor/./src/tweet_analyser.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;