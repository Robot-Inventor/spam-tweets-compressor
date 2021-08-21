/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/advanced_spam_detection.ts":
/*!****************************************!*\
  !*** ./src/advanced_spam_detection.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "advanced_spam_detection": () => (/* binding */ advanced_spam_detection)
/* harmony export */ });
/* harmony import */ var _normalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize */ "./src/normalize.ts");
/* harmony import */ var _parse_regexp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse_regexp */ "./src/parse_regexp.ts");


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const query_example = {
    rule: [
        "and",
        [
            {
                mode: "include",
                type: "text",
                string: "spam spam"
            },
            {
                mode: "exclude",
                type: "name",
                string: "i am spam"
            },
            {
                mode: "include",
                type: "id",
                string: "/spam.*+/i"
            },
            {
                mode: "exclude",
                type: "hashtag",
                string: "spam"
            },
            [
                "or",
                [
                    {
                        mode: "exclude",
                        type: "link",
                        string: "twitter.com/home"
                    },
                    {
                        mode: "include",
                        type: "text",
                        string: "i'm spam"
                    }
                ]
            ]
        ]
    ]
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function is_query_element(argument) {
    return (argument !== null &&
        typeof argument === "object" &&
        "mode" in argument &&
        "type" in argument &&
        "string" in argument &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof argument.mode === "string" &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof argument.type === "string" &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        typeof argument.string === "string");
}
function judge(target, pattern) {
    const is_regex = (0,_parse_regexp__WEBPACK_IMPORTED_MODULE_1__.is_regexp)(pattern);
    if (typeof target === "string") {
        if (is_regex)
            return (0,_parse_regexp__WEBPACK_IMPORTED_MODULE_1__.parse_regexp)(pattern).test(target);
        else
            return target.includes(pattern);
    }
    else {
        let result = false;
        target.forEach((t) => {
            if ((is_regex && (0,_parse_regexp__WEBPACK_IMPORTED_MODULE_1__.parse_regexp)(pattern).test(t)) || t === pattern)
                result = true;
        });
        return result;
    }
}
function advanced_spam_detection(query, tweet) {
    let result = query[0] === "and";
    query[1].forEach((query_object) => {
        let judgement = false;
        if (is_query_element(query_object)) {
            let includes_text = false;
            if (query_object.type === "text")
                includes_text = judge(tweet.content, query_object.string);
            else if (query_object.type === "hashtag")
                includes_text = judge(tweet.hashtag, (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize_hashtag)(query_object.string));
            else if (query_object.type === "id")
                includes_text = judge(tweet.user_id, (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize_user_id)(query_object.string));
            else if (query_object.type === "name")
                includes_text = judge(tweet.user_name, query_object.string);
            else if (query_object.type === "link")
                includes_text = judge(tweet.link, (() => {
                    if ((0,_parse_regexp__WEBPACK_IMPORTED_MODULE_1__.is_regexp)(query_object.string))
                        return query_object.string;
                    else
                        return (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize_link)(query_object.string);
                })());
            judgement = query_object.mode === "include" ? includes_text : !includes_text;
        }
        else {
            judgement = advanced_spam_detection(query_object, tweet);
        }
        if (query[0] === "and" && !judgement)
            result = false;
        else if (query[0] === "or" && judgement)
            result = true;
    });
    return result;
}


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

/***/ "./src/detect_spam.ts":
/*!****************************!*\
  !*** ./src/detect_spam.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "detect_spam": () => (/* binding */ detect_spam)
/* harmony export */ });
/* harmony import */ var _normalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./normalize */ "./src/normalize.ts");
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selector */ "./src/selector.ts");
/* harmony import */ var _parse_regexp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parse_regexp */ "./src/parse_regexp.ts");
/* harmony import */ var _advanced_spam_detection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./advanced_spam_detection */ "./src/advanced_spam_detection.ts");




function detect_ng_word(text, ng_words) {
    for (let x = 0; x < ng_words.length; x++) {
        const word = (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize)(ng_words[x]);
        if (!word)
            continue;
        if ((0,_parse_regexp__WEBPACK_IMPORTED_MODULE_2__.is_regexp)(word) && (0,_parse_regexp__WEBPACK_IMPORTED_MODULE_2__.parse_regexp)(word).test(text))
            return true;
        if (text.includes(word))
            return true;
    }
    return false;
}
function detect_verified_badge(tweet) {
    return Boolean(tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_1__.selector.verified_badge));
}
function detect_spam(target, setting, advanced_filter) {
    const normal_judgement = (() => {
        const target_content = (0,_normalize__WEBPACK_IMPORTED_MODULE_0__.normalize)(target.content);
        const has_ng_word = detect_ng_word(target_content, setting.ng_word);
        if (has_ng_word)
            return browser.i18n.getMessage("compress_reason_ng_word");
        const advanced_detection = (0,_advanced_spam_detection__WEBPACK_IMPORTED_MODULE_3__.advanced_spam_detection)(advanced_filter, target);
        if (advanced_detection)
            return browser.i18n.getMessage("compress_reason_advanced_detection_default");
        return false;
    })();
    const has_verified_badge = detect_verified_badge(target);
    const verified_badge_judgement = has_verified_badge && !setting.include_verified_account;
    return normal_judgement !== false && !verified_badge_judgement ? [true, normal_judgement] : [false];
}


/***/ }),

/***/ "./src/normalize.ts":
/*!**************************!*\
  !*** ./src/normalize.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hash_symbol": () => (/* binding */ hash_symbol),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "normalize_link": () => (/* binding */ normalize_link),
/* harmony export */   "normalize_hashtag": () => (/* binding */ normalize_hashtag),
/* harmony export */   "normalize_user_id": () => (/* binding */ normalize_user_id)
/* harmony export */ });
const hash_symbol = ["#", "＃"];
function normalize(text) {
    text = text
        .normalize("NFKC")
        .toLowerCase()
        .replace(/[ぁ-ん]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) + 0x60);
    });
    return text;
}
function normalize_link(text) {
    return text.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/(index.html)?$/, "");
}
function normalize_hashtag(text) {
    return normalize(text.replace(new RegExp(`^[${hash_symbol.join()}]`), ""));
}
function normalize_user_id(text) {
    return normalize(text.replace(/^[@＠]/, ""));
}


/***/ }),

/***/ "./src/parse_regexp.ts":
/*!*****************************!*\
  !*** ./src/parse_regexp.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "is_regexp": () => (/* binding */ is_regexp),
/* harmony export */   "parse_regexp": () => (/* binding */ parse_regexp)
/* harmony export */ });
const regexp_flag_list = ["d", "g", "i", "m", "s", "u", "y"];
const regexp_pattern = new RegExp(`^/(.*)/([${regexp_flag_list.join("")}]*)$`);
function is_regexp(pattern) {
    return regexp_pattern.test(pattern);
}
function parser_core(pattern) {
    if (!is_regexp(pattern))
        return { string: pattern, flag: null };
    const core_string = pattern.replace(regexp_pattern, "$1");
    const flag_set = new Set(pattern.replace(regexp_pattern, "$2").split(""));
    const flag_list = Array.from(flag_set).filter((flag) => regexp_flag_list.includes(flag));
    return {
        string: core_string,
        flag: flag_list.length ? flag_list.join("") : null
    };
}
function parse_regexp(pattern) {
    const parse_result = parser_core(pattern);
    if (parse_result.flag)
        return new RegExp(parse_result.string, parse_result.flag);
    else
        return new RegExp(parse_result.string);
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


/***/ }),

/***/ "./src/tweet_analyser.ts":
/*!*******************************!*\
  !*** ./src/tweet_analyser.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TweetAnalyser": () => (/* binding */ TweetAnalyser)
/* harmony export */ });
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selector */ "./src/selector.ts");
/* harmony import */ var _normalize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./normalize */ "./src/normalize.ts");


class TweetAnalyser {
    constructor(tweet) {
        this.tweet = tweet;
        this.content_element = tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.tweet_content);
    }
    get content() {
        if (!this.content_element)
            return null;
        return this.content_element.textContent || "";
    }
    get user_name() {
        const user_name_element = this.tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.user_name);
        if (user_name_element)
            return user_name_element.textContent || "";
        else
            return "";
    }
    get user_id() {
        const user_id_element = this.tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.user_id);
        if (user_id_element)
            return (0,_normalize__WEBPACK_IMPORTED_MODULE_1__.normalize_user_id)(user_id_element.textContent || "");
        else
            return null;
    }
    get language() {
        return this.get_language();
    }
    async get_language() {
        const target_node = this.content_element;
        let target_text = this.content || "";
        if (target_node) {
            const clone_node = target_node.cloneNode(true);
            const temporary_element = document.createElement("div");
            temporary_element.appendChild(clone_node);
            temporary_element.querySelectorAll(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.hashtag_link_mention).forEach((element) => element.remove());
            target_text = temporary_element.textContent || "";
        }
        const detect = await browser.i18n.detectLanguage(target_text);
        if (detect.isReliable)
            return detect.languages[0].language.replace(/-.*$/, "");
        else if (this.content_element && this.content_element.lang)
            return this.content_element.lang;
        else
            return "";
    }
    compress(reason) {
        const content_element = this.tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.tweet_content);
        if (!content_element)
            return;
        const decompress_button = document.createElement("button");
        decompress_button.setAttribute("class", this.tweet.getAttribute("class") || "");
        decompress_button.classList.add(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.show_tweet_button.replace(/^\./, ""));
        const text_color = (() => {
            const user_name_element = this.tweet.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.user_name);
            if (user_name_element)
                return getComputedStyle(user_name_element).getPropertyValue("color");
            else
                return "#1da1f2";
        })();
        decompress_button.style.color = text_color;
        const user_name = this.tweet.user_name;
        const user_id = this.tweet.user_id;
        if (reason) {
            const button_text = browser.i18n.getMessage("decompress_button_strict_with_reason", [
                user_name,
                `@${user_id}`,
                reason
            ]);
            decompress_button.textContent = button_text;
        }
        else {
            const button_text = browser.i18n.getMessage("decompress_button_strict_without_reason", [
                user_name,
                `@${user_id}`
            ]);
            decompress_button.textContent = button_text;
        }
        decompress_button.addEventListener("click", () => {
            this.tweet.style.display = "block";
            decompress_button.remove();
        });
        this.tweet.style.display = "none";
        this.tweet.insertAdjacentElement("afterend", decompress_button);
    }
    get hashtag() {
        const is_hashtag = (element) => {
            return element.textContent && _normalize__WEBPACK_IMPORTED_MODULE_1__.hash_symbol.includes(element.textContent[0]);
        };
        const normalize = (element) => {
            return (0,_normalize__WEBPACK_IMPORTED_MODULE_1__.normalize_hashtag)(element.textContent || "");
        };
        return [...this.tweet.querySelectorAll(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.hashtag_link_mention)].filter(is_hashtag).map(normalize);
    }
    get link() {
        function is_link(element) {
            return Boolean(element.querySelector(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.link_scheme_outer));
        }
        function normalize(element) {
            return (0,_normalize__WEBPACK_IMPORTED_MODULE_1__.normalize_link)((element.textContent || "").replace(/…$/, ""));
        }
        return [...this.tweet.querySelectorAll(_selector__WEBPACK_IMPORTED_MODULE_0__.selector.hashtag_link_mention)].filter(is_link).map(normalize);
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
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _detect_spam__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./detect_spam */ "./src/detect_spam.ts");
/* harmony import */ var _setting__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setting */ "./src/setting.ts");
/* harmony import */ var _selector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selector */ "./src/selector.ts");
/* harmony import */ var _tweet_analyser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tweet_analyser */ "./src/tweet_analyser.ts");
/* harmony import */ var _normalize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./normalize */ "./src/normalize.ts");
/* harmony import */ var _color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./color */ "./src/color.ts");






function get_unchecked_tweets() {
    const tweets = document.querySelectorAll(`${_selector__WEBPACK_IMPORTED_MODULE_2__.selector.tweet_outer}:not(.${_selector__WEBPACK_IMPORTED_MODULE_2__.selector.checked_tweet_class_name})`);
    function init(tweet) {
        tweet.classList.add(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.checked_tweet_class_name);
        const analyser = new _tweet_analyser__WEBPACK_IMPORTED_MODULE_3__.TweetAnalyser(tweet);
        const user_id_bug_exclude_list = [
            "https://twitter.com/notifications",
            "https://mobile.twitter.com/notifications"
        ].map((url) => (0,_normalize__WEBPACK_IMPORTED_MODULE_4__.normalize_link)(url));
        if (!user_id_bug_exclude_list.includes((0,_normalize__WEBPACK_IMPORTED_MODULE_4__.normalize_link)(location.href)) &&
            analyser.content !== null &&
            analyser.user_id === null &&
            !document.cookie.includes("stc_show_user_id_error=true")) {
            alert(browser.i18n.getMessage("error_message_user_id_bug"));
            document.cookie = "stc_show_user_id_error=true;max-age=86400";
        }
        tweet.content = analyser.content || "";
        tweet.user_name = analyser.user_name;
        tweet.user_id = analyser.user_id || "";
        tweet.language = analyser.language;
        tweet.compress = (reason) => {
            analyser.compress(reason);
        };
        tweet.hashtag = analyser.hashtag;
        tweet.link = analyser.link;
        return tweet;
    }
    return [...tweets].map((t) => init(t));
}
function reset_check_status() {
    document
        .querySelectorAll("." + _selector__WEBPACK_IMPORTED_MODULE_2__.selector.checked_tweet_class_name)
        .forEach((element) => element.classList.remove(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.checked_tweet_class_name));
}
function decompress_all() {
    const tweets = document.querySelectorAll(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.show_tweet_button);
    tweets.forEach((element) => element.click());
}
function run_check(setting, advanced_filter) {
    const exclude_url = setting.exclude_url;
    if (exclude_url.includes(location.href))
        return;
    const check_target = get_unchecked_tweets();
    for (const target of check_target) {
        if (setting.allow_list
            .map((v) => {
            return (0,_normalize__WEBPACK_IMPORTED_MODULE_4__.normalize_user_id)(v);
        })
            .includes(target.user_id))
            continue;
        const judgement = (0,_detect_spam__WEBPACK_IMPORTED_MODULE_0__.detect_spam)(target, setting, advanced_filter);
        if (judgement[0]) {
            if (setting.show_reason)
                target.compress(judgement[1]);
            else
                target.compress();
        }
    }
}
async function get_json(url) {
    // deepcode ignore Ssrf: <This is because the function is to read only the trusted files listed in dist/advanced_filter.json.>
    const response = await fetch(url);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
}
async function load_advanced_filter(filter_name_list) {
    const filter_list = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const filter_url_data = await get_json("https://cdn.statically.io/gh/Robot-Inventor/stc-filter/main/dist/advanced_filter.json");
    for (const filter_name of filter_name_list.filter((name) => name in filter_url_data)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const filter_data = await get_json(filter_url_data[filter_name].url);
        filter_list.push(filter_data.rule);
    }
    const joined_advanced_filter = ["or", [...filter_list]];
    return joined_advanced_filter;
}
void (async () => {
    const setting_instance = new _setting__WEBPACK_IMPORTED_MODULE_1__.Setting();
    const setting = await setting_instance.load();
    async function reload_filter() {
        joined_advanced_filter = await load_advanced_filter(setting.advanced_filter);
    }
    let joined_advanced_filter = await load_advanced_filter(setting.advanced_filter);
    setInterval(() => {
        void reload_filter();
    }, 86400);
    setting_instance.onChange(() => {
        void reload_filter();
        decompress_all();
        reset_check_status();
    });
    const body_observer_target = document.body;
    const body_observer = new MutationObserver(() => {
        const timeline = document.querySelector(_selector__WEBPACK_IMPORTED_MODULE_2__.selector.timeline);
        if (timeline) {
            body_observer.disconnect();
            void (async () => {
                await (0,_color__WEBPACK_IMPORTED_MODULE_5__.update_color_setting)();
                await (0,_color__WEBPACK_IMPORTED_MODULE_5__.load_color_setting)();
            })();
            const main_observer_target = timeline;
            const main_observer = new MutationObserver(() => void run_check(setting, joined_advanced_filter));
            main_observer.observe(main_observer_target, {
                childList: true,
                subtree: true
            });
        }
    });
    body_observer.observe(body_observer_target, {
        childList: true,
        subtree: true
    });
})();

})();

/******/ })()
;