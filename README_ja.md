# Spam Tweets Compressor

[Read this content in English](README.md)

[![Known Vulnerabilities](https://snyk.io/test/github/Robot-Inventor/spam-tweets-compressor/badge.svg)](https://snyk.io/test/github/Robot-Inventor/spam-tweets-compressor/) [![CodeQL](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/codeql-analysis.yml) [![NodeJS with Webpack](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/webpack.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/webpack.yml) [![eslint](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/eslint.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/eslint.yml) [![stylelint](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/stylelint.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/stylelint.yml) [![test](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/test.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/test.yml)

![logo](image/logo.svg)

「あなたの基準」で嫌がらせや脅迫と感じるツイートからあなたを守ります。

## 概要

どのようなツイートを嫌がらせや脅迫と感じるかは人によって違い、客観的な判断が難しい場合もあります。この拡張機能は「あなたの基準」で「嫌がらせや脅迫」と感じるツイートを非表示にします。あなたへのリプライやあなたに関するツイートを閲覧する際に、心ない悪意から身を守るための非公式の拡張機能です。

また、特定の女性アイドルや配信者に対して「脅迫」「各種嫌がらせ」「暴力の助長」「グロ画像の投稿」などをハッシュタグ付きで送っている人のツイートを非表示にすることもできます。

### ✔ できること

- 嫌がらせや脅迫の可能性があるツイートを非表示にしてあなたの精神を守ります
- どのようなツイートを嫌がらせや脅迫とみなすかを設定できます

### ✖ できないこと

- 嫌がらせや脅迫の可能性があるとみなされたツイートを自動で通報したり、投稿者をミュート・ブロックしたりする機能はありません
- あなたのブラウザー上でのみ非表示にします。他の人のブラウザー上では非表示にできません
- [twitter.com](https://twitter.com)と[mobile.twitter.com](https://mobile.twitter.com)でのみ動作するブラウザー拡張機能です。他のTwitterクライアントやモバイルアプリでは動作しません

### ⚠ 注意

- この拡張機能は非公式の拡張機能です。Twitter社は一切関与していません
- 嫌がらせや脅迫の「可能性がある」ツイートを非表示にします。偽陽性や偽陰性も発生します

[<img src="docs/available_in_chrome_web_store.svg" width="50%">](https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf)
[<img src="docs/get_the_addon_fx_apr_2020.svg" width="43%">](https://addons.mozilla.org/firefox/addon/spam-tweets-compressor/)

### バグの報告・機能提案

バグの報告や機能提案は、次のいずれかの場所にお願いします。

- GitHubの[Issue](https://github.com/Robot-Inventor/spam-tweets-compressor/issues)（GitHubアカウントを持っている場合）
- [Chrome ウェブストア](https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf)の [サポート] セクション（Google Chromeの場合）
- [AMO](https://addons.mozilla.org/firefox/addon/spam-tweets-compressor/)のレビュー（Mozilla Firefoxの場合）

## 対応ブラウザー

- Google Chrome
- Mozilla Firefox
- Chromiumベースのブラウザー（Microsoft Edgeなど）

※動作確認を行っているのはGoogle ChromeとMozilla Firefoxのみです。Chromiumベースのブラウザーは内部的にはGoogle Chromeと同じため正常に動作する可能性が高いと考えられます。

## インストール方法

各ブラウザーの拡張機能のストアからインストールできます。

- [Chrome ウェブストア（Google Chrome）](https://chrome.google.com/webstore/detail/spam-tweets-compressor/ahbajmjkdmknfdkcppkginogfjmpefjf)
- [AMO（Mozilla Firefox）](https://addons.mozilla.org/ja/firefox/addon/spam-tweets-compressor/)

## 判定方法

この拡張機能は次のような要素からツイートを非表示にするか判断します。

- NGワード
- 高度なフィルター

<!-- 「個人情報について」のセクションの名称を変更する場合は、_locales/**/message.jsonのプライバシーポリシーのリンクも変更する -->
## 個人情報について

この拡張機能は、ユーザーのPC上でのみ分析が行われるため、外部に情報を送信することはありません。ただし、この拡張機能は「高度なフィルターを更新するためのデータ」を自動的に受信します。

この拡張機能は、権限を次の目的にのみ使用します。

- [twitter.com](https://twitter.com)と[mobile.twitter.com](https://mobile.twitter.com)に干渉して、表示されたツイートがスパムかどうかを判断し、スパムと判断されたツイートを非表示にします
- storage権限を使用して、拡張機能の設定をユーザーフォルダーに保存します。外部のクラウドやサーバーには設定を送信しません
- [cdn.statically.io](https://cdn.statically.io)にアクセスして、高度なフィルターの最新のスパム情報を受信します

## 開発者向け

開発する際は、まず必要なパッケージをインストールします。

```sh
npm install
```

### Lint

```sh
npm run lint:css
npm run lint:js

# lint CSS and JS
npm run lint
```

### Format

```sh
npm run format
```

### Test

```sh
npm run test
```

### Build

```sh
npm run build:css
npm run build:js

# build CSS and JS
npm run build
```

または

```sh
npm run watch:css
npm run watch:js

# watch CSS and JS
npm run watch
```

### Package

```sh
npm run pack
```
