# Spam Tweets Compressor

[日本語](README_ja.md)

![logo](image/logo.svg)

This is a browser extension which compresses spam Tweets.

## What Does It Work ?

This browser extension compresses spam tweets. Of course, you can also decompress the compressed tweets.

Before:

![Screenshot](image/for_readme/long_tweet_uncompressed.png)

After:

![Screenshot](image/for_readme/long_tweet_compressed.png)

## How to Install?

### Google Chrome

#### 1. Download

First, download the source code from this repository any way you like (using git or downloading in zip format).

#### 2. Install

Type ``chrome://extensions/`` in the address bar, and enable developer mode.

![Screenshot](image/for_readme/chrome_extensions.png)

Click [Load Unpacked] and select the folder you downloaded the extension to.

![Screenshot](image/for_readme/chrome_extensions2.png)

### Firefox

Just install from [AMO](https://addons.mozilla.org/ja/firefox/addon/spam-tweets-compressor/).

## Development

When developing, first install the necessary packages.

```
npm install
```

### Lint

To lint, run the following command.

```
npm run lint
```

### Build

To build it, run the following command.

```
npm run build
```

Also, if you want to WATCH the file changes, please execute the following command.

```
npm run watch
```

To create a zip file of the extension, run ``npx web-ext build``.
