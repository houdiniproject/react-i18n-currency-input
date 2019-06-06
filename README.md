# react-i18n-currency-input (inspired by [`react-currency-input`](https://github.com/jsillitoe/react-currency-input))

An Typescript react component for currency using the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) based upon [`react-currency-input`](https://github.com/jsillitoe/react-currency-input)


## Changes

## v1.0.0

## Installation

```
not yet!
```

## Integration

You can store the value passed in to the change handler in your state.

```typescript
import * as React from 'react'
import I18nCurrencyInput from 'react-i18n-currency-input';

class MyApp extends React.Component<{}, {amount:string}> {
    getInitialState(){
        return ({amount: "0.00"});
    },

    handleChange(event, maskedvalue, floatvalue){
        this.setState({amount: maskedvalue});
    },
    render() {
        return (
            <div>
                <I18nCurrencyInput value={this.state.amount} onChangeEvent={this.handleChange}/>
            </div>
        );
    }
}
export default MyApp
```

You can also assign a reference then access the value using a call to getMaskedValue().

```typescript
import * as React from 'react'
import I18nCurrencyInput from 'react-i18n-currency-input';

class MyApp extends React.Component {
  
  sampleRef: React.RefObject<I18nCurrencyInput>;
  
  constructor(props: any){
    super(props)
    this.sampleRef = React.createRef()
  }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.sampleRef.current.getMaskedValue())
    },

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <CurrencyInput ref={this.sampleRef} />
            </form>
        );
    }
});
export default MyApp
```

## Locales and currencies

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
    <CurrencyInput locale="en-IN" currency="INR" />
```

Currency without decimals prints just the integer portion

```typescript
    // ￥123,456,789
    <CurrencyInput locale="jp-jp" currency="JPY" />
```

## Negatives

You can control whether the user can input negative or positive amounts.

For example, any negative symbols added to the following input will be stripped:
```typescript
    <CurrencyInput allowNegatives={false} />
```

On the other hand, the following input will always be negative, no matter if the user attempts to remove the negative:
```typescript
    <CurrencyInput forceNegative={true} />
```

All other attributes are applied to the input element. For example, you can integrate bootstrap styling:

```typescript
    <CurrencyInput className="form-control" />
```

## Options

Option            | Default Value | Description
----------------- | ------------- | -----------------------------------------------------------------------------
value             | 0             | The initial value
locale            | "en-us"       | locales to use for formatting
currency          | "USD"         | The ISO 4217 currency code for this field
currencyDisplay   | "symbol"      | How you want the currency code to be displayed. See [currencyDisplay](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
onChange          | n/a           | Callback function to handle value changes.
onBlur            | n/a           | Callback function on when focus is removed from the input
inputType         | "text"        | Input field tag type. You may want to use `number` or `tel`*
useGrouping       | true          | whether to include the integer grouping symbols. For example, in the US, a comma is added every three digits: "1000" is turned into "1,000"   
allowNegative     | true          | Allows negative numbers in the input
requireNegative   | false         | Require all non-zero numbers to be negative
selectAllOnFocus  | false         | Selects all text on focus or does not

***Note:** Enabling any mask-related features such as prefix, suffix or separators with an inputType="number" or "tel" could trigger errors. Most of those characters would be invalid in such input types.


## Questions
### Why did you fork react-currency-input?
[react-currency-input](https://github.com/jsillitoe/react-currency-input/blob/master/test/index.spec.js) is a really great library and most of the code in react-i18n-currency-input is a fairly direct copy from react-currency-input.  react-i18n-currency-input would not exist without react-currency-input. 

That said, I had one major issue when using react-currency-input: it doesn't use the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). The future of the Houdini Project demands that have a consistent, reliable way to do internationalization of currency amounts. The best way to do so it to use the ECMAScript Internationalization and "outsource" internationalization to a reliable source.

Given this along with the more minor issues of react-currency-input being seemingly unmaintained and not having a Typescript API, it seems like it makes sense to go in a different direction.