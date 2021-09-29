# 高度なフィルターについて

[English](../en/advanced_spam_detection.md)

Spam Tweets Compressorには通常の設定では行えない、ユーザー定義の高度なフィルターが実装されています。

高度なフィルターの設定はJSON形式で行います。設定のJSONデータをオブジェクトに変換した、TypeScriptでの``query_object``インターフェースは次のようになっています。

```typescript
interface query_element {
    mode: "include" | "exclude",
    type: "text" | "hashtag" | "name" | "id" | "link",
    string: string
}

type query_type = ["and" | "or", Array<query_element | query_type>];

interface query_object {
    rule: query_type
}
```

設定のJSONファイルの例です。

```json
{
    "rule": [
        "and",
        [
            {
                "mode": "include",
                "type": "text",
                "string": "spam spam"
            },
            {
                "mode": "exclude",
                "type": "name",
                "string": "i am spam"
            },
            {
                "mode": "include",
                "type": "id",
                "string": "/spam.*+/i"
            },
            {
                "mode": "exclude",
                "type": "hashtag",
                "string": "spam"
            },
            [
                "or", [
                    {
                        "mode": "exclude",
                        "type": "link",
                        "string": "twitter.com/home"
                    },
                    {
                        "mode": "include",
                        "type": "text",
                        "string": "i'm spam",
                    }
                ]
            ]
        ]
    ]
}
```

``rule``プロパティーには、次のような形式の配列を指定します。

```
[operation_mode, query]
```

## operation_mode

``query``の演算モードを設定します。``and``または``or``の文字列を指定でます。``and``の場合は論理積、``or``の場合は論理和が使用されます。

## query

配列です。配列の要素にはオブジェクトまたは``[operation_mode, query]``を使用できます。オブジェクトの場合は、次のプロパティーを定義してください。

- mode
- type
- string

### mode

``include``または``exclude``の文字列を指定できます。

### type

検索対象を次のいずれかの文字列から選択できます。

- ``text``
- ``hashtag``
- ``name``
- ``id``
- ``link``

#### text

検索対象をツイート本文に設定します。メンション、リンク、ハッシュタグなども含みます。``string``で指定した文字列がツイート本文に含まれるか判定します。

#### hashtag

検索対象をツイートに含まれるハッシュタグに設定します。ハッシュタグの先頭の``#``は無視されます。ツイートに含まれるハッシュタグのうち、``string``と完全に一致するものがあるか判定します。

#### name

検索対象をツイートのユーザー名に設定します。``string``で指定した文字列がユーザー名に含まれるか判定します。

#### id

検索対象をツイートのユーザーIDに設定します。ユーザーIDの先頭の``@``は無視されます。``string``で指定した文字列がユーザーIDに含まれるか判定します。

#### link

検索対象をツイートに含まれるリンクに設定します。リンクの先頭の``https://``や``http://``、末尾の``/``や``/index.html``は無視されます。ツイートに含まれるリンクのうち、``string``と完全に一致するものがあるか判定します。

### string

検索する文字列です。通常の文字列または正規表現パターンを表した文字列を使用できます。正規表現を使用する場合、JavaScriptの正規表現リテラルと同じ形式の文字列を指定してください。
