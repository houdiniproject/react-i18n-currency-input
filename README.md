# react-i18n-currency-input (inspired by [`react-currency-input`](https://github.com/jsillitoe/react-currency-input))

An Typescript react component for currency using the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) based upon [`react-currency-input`](https://github.com/jsillitoe/react-currency-input).
The package also includes a corresponding hook (`useI18nCurrencyInput`) if you'd like to add the functionality to your own component.

## Changes

### v2.0.0

* `useI18nCurrencyInput` now will recognize when the value passed in via args is updated.
* `react-use` is no longer a peer dependency (`usePrevious` is embedded in the build becuase it's small)
* Strict mode on for Typescript

### v2.0.0-pre3

* `requireSign` is no longer passed through to the Input element, as-is it shouldn't be

### v2.0.0-pre1

* Move to React hook-based components
* Add React hook for advanced usage (useI18nCurrencyInput)
* Update dependencies
* Simplify build to use webpack
* Add storybook for development use

### v1.0.0

Initial release

## Installation

```npm
yarn install @houdiniproject/react-i18n-currency-input
```

## Integration

### I18nCurrencyInput

You can store the value passed in to the change handler in your state.

```typescript
import * as React from 'react'
import I18nCurrencyInput from 'react-i18n-currency-input';

function MyApp(props: {value:number|string|null}) {
    const [value,setValue] = useState(props.value)

    const onChange = useCallback((maskedValue, value, valueInCents) => {
        // you'll want to pass maskedValue back into yoru I18nCurrencyInput.
        setValue(maskedValue)
    }, [setValue])
    render() {
        return (
            <I18nCurrencyInput value={value} onChange={this.handleChange}/>
        );
    }
}
export default MyApp
```

#### Locales and currencies

Default locale is US English with dollars as currency

```typescript
    // $1,234,567.89
    <I18nCurrencyInput  />
```

A German locale and Euro as the currency

```typescript
    // 1.234.567,89 € (the space is a non-breaking space, i.e. character code 160)
    <I18nCurrencyInput locale="de-de" currency="EUR" />
```

Locale and currency with different grouping options

```typescript
    // ₹ 12,34,567.89 (the space is a non-breaking space, i.e. character code 160)
    <I18nCurrencyInput locale="en-IN" currency="INR" />
```

Currency without decimals prints just the integer portion

```typescript
    // ￥123,456,789
    <I18nCurrencyInput locale="jp-jp" currency="JPY" />
```

#### Negatives

You can control whether the user can input negative or positive amounts.

For example, any negative symbols added to the following input will be stripped:

```typescript
    <I18nCurrencyInput requireSign={'positive'} />
```

On the other hand, the following input will always be negative, no matter if the user attempts to remove the negative:

```typescript
    <I18nCurrencyInput forceSign={'negative'} />
```

All other attributes are applied to the input element. For example, you could add a class to the input control

```typescript
    <I18nCurrencyInput className="form-control" />
```

#### Options

Option            | Default Value | Description
----------------- | ------------- | -----------------------------------------------------------------------------
value             | 0             | The initial value
locale            | "en-us"       | locales to use for formatting
currency          | "USD"         | The ISO 4217 currency code for this field
currencyDisplay   | "symbol"      | How you want the currency code to be displayed. See [currencyDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
onChange          | n/a           | Callback function to handle value changes. Arguments are (maskedValue, value, valueInCents). Corresponds to the value that the user sees ($1,000.00), the value as a number (1000) and the number in the lowest monetary unit (1000000)
useGrouping       | true          | whether to include the integer grouping symbols. For example, in the US, a comma is added every three digits: "1000" is turned into "1,000"
requireSign       | undefined     | 'positive' to turn all non-zero numbers to be positive, 'negative' to make them negative
selectAllOnFocus  | false         | Selects all text on focus or does not
inputRef          | undefined     | a reference created using `useRef` to access the input element wrapped by I18nCurrencyInput.

Additionally, I18nCurrencyInput will pass any non-recognized properties down to the input element

### useI18nCurrencyInput hook

This project includes a hook for reusing most of the functionality of `I18nCurrencyInput` in your own components.
`I18nCurrencyInput` uses the hook internally and is a good example of its use.

To use `useI18nCurrencyInput` you would import as follows:

```typescript
import {useI18nCurrencyInput} from 'react-i18n-currency-input`
```

The properties to `useI18nCurrencyInput` are similar to the properties in `I18nCurrencyInput`. The major differences are:

* callbacks, like onChange, onFocus, etc., are ignored. You'll receive your onChange callbacks as the output from the hook.
* you MUST pass an ref to inputRef. It's current value can be undefined or null but the ref has to be passed.

The output of `useI18nCurrencyInput` are as follows:

Property          | Type          | Description
----------------- | ------------- | -----------------------------------------------------------------------------
maskedValue       | string        | the value that the user sees after formatting, i.e. $1,234.56 - NOTE: Pass this as the value of your input element
value             | number        | the value formatted as a number, i.e. 1234.56
valueInCents      | number        | the value in the small monetary unit of the currency, i.e. 123456 for $1,234.56
onChange          | Function      | the change handler to attach to your input element
onFocus           | Function      | the focus handler to attach to your input element
onMouseUp         | Function      | the mouse up handler to attach to your input element
onSelect          | Function      | the select handler to attach to your input element

## Questions

<!-- markdownlint-disable MD026 -->
### Why did you fork react-currency-input?

[react-currency-input](https://github.com/jsillitoe/react-currency-input/blob/master/test/index.spec.js) is a really great library and most of the code in react-i18n-currency-input is a fairly direct copy from react-currency-input.  react-i18n-currency-input would not exist without react-currency-input.

That said, I had one major issue when using react-currency-input: it doesn't use the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). The future of the Houdini Project demands we that have a consistent, reliable way to do internationalization of currency amounts. The best way to do so it to use the ECMAScript Internationalization and "outsource" internationalization to a reliable source.

Given this along with the more minor issues of react-currency-input being seemingly unmaintained and not having a Typescript API, it seems like it makes sense to go in a different direction.
