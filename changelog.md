# Changelog

## Released

### [v2.0.8.4] - 2021-08-19

#### Added

- 宣伝ページを作成 [#186](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/186)
- 高度なスパム判定のUIに目的外では誤作動すると明記 [#182](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/182)
- 設定変更時に再読み込みを不要にする [#113](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/113)
- テストの導入 [#185](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/185)
- OSSライセンスに関するページを作成 [#198](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/198)

#### Changed

- 詳細設定ページのデザイン改善 [#117](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/117)
- web-ext-typesの導入 [#197](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/197)
- npm installをnpm install --save-devに変更 [#201](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/201)

#### Deleted

- 一部の機能を削除 [#177](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/177)

#### Fixed

- browser actionのフォントサイズを指定する [#176](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/176)
- Chromeでbrowser actionのタイトルに改行が入ってしまうバグを修正 [#173](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/173)

### [v2.0.7.3] - 2021-08-14

#### Added

- mobile.twitter.comのホスト権限を追加 [#139](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/139)
- browser actionにバージョン番号を表示する機能を追加 [#161](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/161)

#### Changed

- beforeunloadイベントでもテキストボックスの内容を保存するように変更 [#167](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/167)

#### Fixed

- TwitterのUI変更で認証済みアカウントか正しく判別できなくなったバグを修正 [#154](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/154)
- ウィンドウが縦長のときに配色の取得に失敗するバグを修正 [#156](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/156)
- 「動きを減らす」が有効になっていると動作しないバグを修正 [#160](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/160)

### [v2.0.6.2] - 2021-08-13

#### Added

- ユーザーの許可リスト機能を追加 [#51](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/51)
- 配色をTwitterの配色設定に合わせる機能を追加 [#122](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/122)
- URLの正規化を強化しwww.を削除する [#143](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/143)
- ハッシュタグの正規化を強化 [#146](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/146)

#### Changed

- manifest.json内のdescriptionをREADMEに基づいて更新 [#102](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/102)
- browser actionの設定項目を整理する [#109](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/109)
- 設定のエクスポートを非表示にする [#116](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/116)
- browser actionの設定項目の分類を見直し [#125](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/125)
- 2021年8月12日のTwitterのUI変更に対応 [#138](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/138)
- 設定の厳格モードボタンのラベルを「非表示モードを開始する」に変更する [#103](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/103)

#### Fixed

- スレッドが正しく処理されないバグの修正 [#19](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/19)
- 存在しない名前のフィルターが指定されたときに処理をスキップする [#126](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/126)
- npmモジュールのセキュリティー問題を修正 [#131](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/131)
- リツイートのユーザー名取得バグの修正 [#132](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/132)

#### Deleted

- 行頭の空白を削除する機能を削除 [#120](https://github.com/Robot-Inventor/spam-tweets-compressor/issues/120)

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
