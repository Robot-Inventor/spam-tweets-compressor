# About Advanced Spam Detection

Spam Tweets Compressor implements advanced user-defined spam detection that cannot be done in the normal settings.

Settings for advanced spam detection are in JSON format. The ``query_object`` interface in TypeScript, which converted from the configuration JSON data into an object, looks like this.

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

Here is an example of a configuration JSON file.

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

The ``rule`` property is an array of the following form.

```
[operation_mode, query]
```

## operation_mode

Sets the operation mode of ``query``. You can specify a string of ``and`` or ``or``. If ``and``, logical conjunction is used, and if ``or``, logical disjunction is used.

## query

An array. The elements of the array can be objects or ``[operation_mode, query]``. For an object, define the following properties.

- mode
- type
- string

### mode

You can specify the ``include`` or ``exclude`` string.

### type

The search target can be selected from one of the following strings.

- ``text``
- ``hashtag``
- ``name``
- ``id``
- ``link``

#### text

Set the search target to the body of the tweet. Mentions, links, hashtags, etc. are also included. It judges if the string specified by ``string`` is included in the body of the tweet.

#### hashtag

Set the search target to the hashtags included in the tweet. The ``#`` at the beginning of the hashtag will be ignored. It will determine if any of the hashtags in the tweet match the ``string`` exactly.

#### name

Sets the search target to the user name of the tweet. It judges if the string specified by ``string`` is included in the user name.

#### id

Set the search target to the user ID of the tweet. The ``@`` at the beginning of the user ID will be ignored. It judges if the string specified by ``string`` is included in the user ID.

#### link

Set the search target to the links contained in the tweet. The ``https://`` and ``http://`` at the beginning and ``/`` and ``/index.html`` at the end of the link will be ignored. It will determine if any of the links in the tweet match the ``string`` exactly.

#### string

The string to search. It can be a normal string or a string representing a regular expression pattern. When using regular expressions, specify a string in the same format as the JavaScript regular expression literal.
