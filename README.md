# Spam Tweets Compressor

[日本語](README_ja.md)

This is a browser extension which compresses spam Tweets. At the moment, it compresses "long" Tweets.

## What Is A Long Tweet ?

A "long" tweet is a spam tweet that occupies space by inserting a large number of line breaks into the text of the tweet. This makes it difficult to browse the timeline.

## What Does It Work ?

This browser extension compresses "long" tweets by removing their line breaks. Of course, you can also decompress the compressed tweets.

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
