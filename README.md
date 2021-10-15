# Spam Tweets Compressor

[この内容を日本語で読む](README_ja.md)

[![Known Vulnerabilities](https://snyk.io/test/github/Robot-Inventor/spam-tweets-compressor/badge.svg)](https://snyk.io/test/github/Robot-Inventor/spam-tweets-compressor/) [![CodeQL](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/codeql-analysis.yml) [![NodeJS with Webpack](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/webpack.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/webpack.yml) [![eslint](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/eslint.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/eslint.yml) [![stylelint](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/stylelint.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/stylelint.yml) [![test](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/test.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/test.yml)

![logo](image/logo.svg)

This extension protects you from tweets that you feel are harassing or threatening by "your standards".

## Summary

What kind of tweets are perceived as harassment or threats varies from person to person. It can be difficult to judge objectively. This extension hides tweets that you judge to be "harassing or threatening" based on "your criteria". It is an unofficial browser extension that protects your mind when viewing replies or doing ego searches.

### ✔ What this does

- You can protect your mind by hiding tweets that are harassing or threatening
- You can hide them only in your own browser, so you cannot hide them in other people's browsers

### ✖ What this can't do

- There is no automatic reporting of tweets deemed potentially harassing or threatening, or the ability to mute or block the poster
- Hide only on your browser. Can't be hidden on other people's browsers
- Only works on [twitter.com](https://twitter.com) and [mobile.twitter.com](https://mobile.twitter.com). Will not work with other Twitter clients or mobile apps

### ⚠ Precaution

- This is an unofficial extension, Twitter is not involved in any way
- Hides "possibly" harassing or threatening tweets. False positives and false negatives can also occur

[<img src="docs/available_in_chrome_web_store.svg" width="50%">](https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf)
[<img src="docs/get_the_addon_fx_apr_2020.svg" width="43%">](https://addons.mozilla.org/ja/firefox/addon/spam-tweets-compressor/)

### Report Bugs and Suggest Features

Bug reports and feature suggestions should be sent to one of the following places.

- GitHub [Issues](https://github.com/Robot-Inventor/spam-tweets-compressor/issues)（If you have a GitHub account）
- [Chrome Web Store](https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf)'s [Support] section（If you are using Google Chrome）
- [AMO](https://addons.mozilla.org/firefox/addon/spam-tweets-compressor/)'s review（If you are using Mozilla Firefox）

## Supported Browsers

- Google Chrome
- Mozilla Firefox
- Chromium-based browsers (e.g. Microsoft Edge)

Note: The only browsers that have been tested are Google Chrome and Mozilla Firefox; Chromium-based browsers are likely to work correctly because they are internally identical to Google Chrome.

## Installation

You can install the extension from each browser's extension store.

- [Chrome Web Store (Google Chrome)](https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf)
- [AMO (Mozilla Firefox)](https://addons.mozilla.org/ja/firefox/addon/spam-tweets-compressor/)

## Judgment Method

This extension determines whether to hide a tweet based on the following factors.

- NG words
- Advanced Filters

<!-- When you rename About Personal Information section, change privacy policy link in _locales/**/message.json. -->
## About Personal Information

This extension does not send any information to the outside world, as the analysis takes place only on the user's PC. But please note that the extension will automatically receive "data to update the Advance Filter".

This extension will only use the permissions for the following purposes

- Interferes with [twitter.com](https://twitter.com) and [mobile.twitter.com](https://mobile.twitter.com) to determine whether the displayed tweets are spam or not and hides tweets that are determined to be spam
- Uses storage permission to save the extension settings in the user folder. Does not send settings to external clouds or servers
- Access [cdn.statically.io](https://cdn.statically.io) to receive the latest spam information for Advanced Filter

## Development

When developing, first install the necessary packages.

```powershell
npm install
```

### Lint

```powershell
npm run lint:css
npm run lint:js
npm run lint // lint CSS and JS
```

### Format

```powershell
npm run format
```

### Test

```powershell
npm run test
```

### Build

```powershell
npm run build:css
npm run build:js
npm run build // build CSS and JS
```

or

```powershell
npm run watch:css
npm run watch:js
npm run watch // watch CSS and JS
```

### Package

```powershell
npm run pack
```
