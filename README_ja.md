# Spam Tweets Compressor

[English](README.md)

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

### ビルド

ビルドの際は、次の2つのコマンドを実行します。

```
npm run build
```

また、ファイルの変更をwatchしたい場合は、次の2つのコマンドを実行してください。

```
npm run watch
```

拡張機能のzipファイルを作成するには``npx web-ext build``を実行してください。
