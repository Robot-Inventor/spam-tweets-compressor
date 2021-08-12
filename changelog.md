# Changelog

## Released

### [v2.0.6.2] - 2021-08-13

## Added

- ユーザーの許可リスト機能を追加 #51
- 配色をTwitterの配色設定に合わせる機能を追加 #122
- URLの正規化を強化しwww.を削除する #143
- ハッシュタグの正規化を強化 #146

## Changed

- manifest.json内のdescriptionをREADMEに基づいて更新 #102
- browser actionの設定項目を整理する #109
- 設定のエクスポートを非表示にする #116
- browser actionの設定項目の分類を見直し #125
- 2021年8月12日のTwitterのUI変更に対応 #138
- 設定の厳格モードボタンのラベルを「非表示モードを開始する」に変更する #103

## Fixed

- スレッドが正しく処理されないバグの修正 #19
- 存在しない名前のフィルターが指定されたときに処理をスキップする #126
- npmモジュールのセキュリティー問題を修正 #131
- リツイートのユーザー名取得バグの修正 #132

## Deleted

- 行頭の空白を削除する機能を削除 #120

### [v2.0.5.1] - 2021-08-04

#### Added

- READMEにバッジを追加 [#70](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/70)
- 24時間ごとにフィルターを再読み込みする機能を追加 [#59](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/59)
- 詳細設定ページにファビコンを設定 [#55](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/55)
- i18n APIによる言語判定にフォールバックを実装して言語判定の精度を向上 [#44](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/44)
- 言語フィルターの言語コードの正規化を実装 [#83](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/83)
- 言語フィルターの設定に言語コードの資料へのリンクを追加 [#92](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/92)

#### changed

- バイナリーファイルのファイルサイズを342KBから39KBに削減
- デフォルトの設定を最適化 [#75](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/75)
- 高度なスパム判定のUIを改善 [#79](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/79)
- ツイートの言語判定時にハッシュタグやリンク、メンションを除外するように変更 [#80](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/80)
- READMEを改善 [#89](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/89)

#### Deleted

- 高度なスパム判定での非表示理由のサポートを削除 [#85](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/85)
- 「特定のページで無効化」のデフォルトから通知ページを削除 [#94](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/94)

#### Fixed

- 厳格モード時の解凍ボタンにIDの先頭の@が表示されないバグを修正 [#60](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/60)
- ChromeでCSSが正しく適用されないバグを修正 [#56](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/56)

### [v2.0.4.0] - 2021-08-01

#### Added

- ロゴを作成
- しきい値の調整機能を追加
- 日本語と英語に対応
- 厳格モードを追加
- 同じ文字を繰り返しているツイートを圧縮する機能を追加
- NGワード機能を追加
- 特定のページで無効化する機能を追加
- 言語フィルターを追加
- Google Chromeに対応
- 設定のエクスポート機能を追加
- 公式アカウントを圧縮しないオプションを追加
- 行頭のスペースを削除するオプションを追加
- 高度なスパム判定機能を追加
- スパムの判定理由を表示するオプションを追加

#### Changed

- TypeScriptに移行
- 解凍ボタンを``inline-block``に変更

#### Fixed

- Twitterの配色設定によって動作しないことがあるバグを修正
- バイナリーファイルのファイルサイズを1.34MBから342KBに削減

### [v1.0.3.2] - 2021-04-19

#### Changed

- Refactored
- Improved performance

### [v1.0.2.1] - 2021-04-15

#### Fixed

- Fixed a bug where the extension did not work when the Twitter background color was set to something other than black

### [v1.0.1.0] - 2021-04-15

#### Add

- The first release
