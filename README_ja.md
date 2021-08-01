# Spam Tweets Compressor

[English](README.md)

[![Known Vulnerabilities](https://snyk.io/test/github/Robot-Inventor/spam-tweets-compressor/badge.svg)](https://snyk.io/test/github/Robot-Inventor/spam-tweets-compressor/) [![CodeQL](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/codeql-analysis.yml) [![NodeJS with Webpack](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/webpack.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/webpack.yml) [![eslint](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/eslint.yml/badge.svg)](https://github.com/Robot-Inventor/spam-tweets-compressor/actions/workflows/eslint.yml)

![logo](image/logo.svg)

スパムツイートを圧縮するブラウザー拡張機能です。

## 何をしてくれるの？

この拡張機能は、スパムツイートを圧縮します。もちろん、圧縮したツイートの解凍もできます。

圧縮前：

![Screenshot](image/for_readme/long_tweet_uncompressed.png)

圧縮後：

![Screenshot](image/for_readme/long_tweet_compressed.png)

## インストール方法

### Google Chrome

#### 1. ダウンロード

まず、このリポジトリから何らかの方法でソースコードをダウンロードします（gitを使うか、zip形式でダウンロードします）。

#### 2. インストール

アドレスバーに``chrome://extensions/``と入力し、 [デベロッパーモード] を有効にします。

![Screenshot](image/for_readme/chrome_extensions.png)

[パッケージ化されていない拡張機能を読み込む] をクリックし、拡張機能をダウンロードしたフォルダーを選択します。

![Screenshot](image/for_readme/chrome_extensions2.png)

### Firefox

[AMO](https://addons.mozilla.org/ja/firefox/addon/spam-tweets-compressor/)からインストールするだけです。

## 開発

開発する際は、まず必要なパッケージをインストールします。

```
npm install
```

### リント

リントを実行するには、次のコマンドを実行します。

```
npm run lint
```

### ビルド

ビルドの際は、次のコマンドを実行します。

```
npm run build
```

また、ファイルの変更をwatchしたい場合は、次のコマンドを実行してください。

```
npm run watch
```

拡張機能のzipファイルを作成するには``npm run pack``を実行してください。
