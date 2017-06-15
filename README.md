# babel-plugin-loginator

> This plugin transforms console statements to include some extra parameters.

## Example

**In**

```javascript
console.info('hello');
```

**Out**
```javascript
console.info("[INFO ]", new Date().toISOString(), "[FILENAME:LINE_NUM]", "info");
```

## Installation

```sh
npm install --save-dev acoll/babel-plugin-loginator
```

## Usage

### Via `.babelrc`

**.babelrc**
```js
//without options
{
    "plugins": [
        "loginator"
    ]
}

//with options
{
    "plugins": [
        [
            "loginator",
            {
                "colors": true
            }
        ]
    ]
}

### Via CLI
```sh
babel --plugins loginator script.js
```

## Options

### `colors`

`boolean`, defaults to `false`.

When set to `true`, this will colorize the log level string using [Marak/colors.js](https://github.com/Marak/colors.js).