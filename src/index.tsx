// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/src/index.js

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { boundMethod } from 'autobind-decorator';
import { MoneyFormatHelper, MoneyFormatHelperOptions } from './money_format_helper';

interface CurrencyInputProps {
  /**
   * The value you want to be formatted. If you want this to be a 
   * controlled component, you'll need to use onChange to get the value on each
   * change and then pass in the value. If you want to an uncontrolled
   * component, this should just be the initial value
   * @type (string|number|null)
   * @memberof CurrencyInputProps
   */
  value?: string|number|null,
  /**
   * the string of the locale you want to format the number in. If you provide multiple, Intl.NumberFormat uses the first one that it has locale data for
   * @default "en-us"
   * @type string
   * @memberof CurrencyInputProps
   */
  locale?: string|string[]

  /**
   * the ISO 4217 currency code for this field
   * @default "USD"
   * @type string
   * @memberof CurrencyInputProps
   */
  currency?: string,

  /**
   * How you want your currency to be displayed. Options are:
   *  - symbol: the currency symbol, like $ or €
   *  - code: the currency code, like USD or EUR
   *  - name: the localized name of the currency, like dollar in the locale en-us or dólares estadounidenses in es-mx locale
   * @default 'symbol'
   * @type ('symbol' | 'code' | 'name')
   * @memberof CurrencyInputProps
   */
  currencyDisplay?: 'symbol' | 'code' | 'name',

  /**
   * whether you want grouping in the integer portion. As an example, in the US, grouping is done by every three digits, i.e. $1,000 and $1,000,000.
   * if you don't want grouping, set this to false.
   * @default true
   * @type boolean
   * @memberof CurrencyInputProps
   */
  useGrouping?: boolean,

  /**
   * Do you want to have null or 0 as the empty value? True for null, false for 0
   * @default false
   * @type boolean
   * @memberof CurrencyInputProps
   */
  allowEmpty?: boolean

  /**
   * the type of field. In some rare occurs, you may want to set this to something other than 'text'
   * @default 'text
   * @type string
   * @memberof CurrencyInputProps
   */
  inputType?: string

  /**
   * A callback after the input has changed and has been processed. The arguments for the onChange are as follows:
   * - instance: the instance of I18nCurrencyInput which fired this event
   * - maskedValue: the value after going through the masking process. In the case of "1" (a string) and default properties, you'll end up with "$0.01"
   * - value: the numerical value of the input value after the masking process. Use this when you need to do math using the input value. In the case of In the case of "1" (a string) and default properties, you'll end up with 0.01.
   * - valueInCents: the numerical value of the input value after the masking process in the lowest fractional value in the denomination. In the case of "1" (a string) and default properties, you'll end up with 1. For a currency without fractional values, like JPY, this will be the same as value.
   * @type number
   * @default (no-op function)
   * @memberof CurrencyInputProps
   */
  onChange?: (instance: I18nCurrencyInput, maskedValue: string, value: number, valueInCents:number) => void

  /**
   * A callback on the blur event
   * @default (no-op function)
   * @memberof CurrencyInputProps
   */
  onBlur?: (instance:I18nCurrencyInput) => void

  // you can pass along any other properties you'd like to the input field itself
  [customProps: string]: any
}

/**
 * The internal state of I18nCurrencyInput
 * @interface I18nCurrencyInputState
 */
interface I18nCurrencyInputState {
  /**
   * The input value after going through the masking process. In the case of "1" (a string) and default properties, you'll end up with "$0.01"
   * @type string
   * @memberof I18nCurrencyInputState
   */
  maskedValue: string,

  /**
   * the numerical value of the input value after the masking process. In the case of "1" (a string) and default properties, you'll end up with 0.01
   * @type number
   * @memberof I18nCurrencyInputState
   */
  value: number,

  /**
   * the numerical value of the input value after the masking process in the lowest fractional value in the denomination. In the case of "1" (a string) and default properties, you'll end up with 1. For a currency without fractional values, like JPY, this will be the same as value.
   * @type number
   * @memberof I18nCurrencyInputState
   */
  valueInCents: number,

  /**
   * any properties passed to the component which will be passed to our input value
   * @type *
   * @memberof I18nCurrencyInputState
   */
  customProps: any
}

type FullCurrencyInputProps = CurrencyInputProps & Partial<MoneyFormatHelperOptions>

class I18nCurrencyInput extends React.Component<FullCurrencyInputProps, I18nCurrencyInputState> {
  inputSelectionStart: number;
  inputSelectionEnd: number;

  inputRef: Readonly<React.RefObject<HTMLInputElement>>
  constructor(props: FullCurrencyInputProps) {
    super(props);
    this.state = this.prepareProps(this.props);

    this.inputSelectionStart = 1;
    this.inputSelectionEnd = 1;
    this.inputRef = React.createRef()
  }

  static defaultProps = {
    value: 0,
    locale: 'en-us',
    currency: 'USD',
    currencyDisplay: 'symbol',
    useGrouping: true,
    inputType: 'text',
    onChange: (instance:I18nCurrencyInput, maskedValue: string, value: number) => { /** no-op */ },
    onBlur: (instance:I18nCurrencyInput) => { /** no-op */}
  }

  /**
   * Exposes the current masked value.
   *
   * @returns {String}
   */
  getMaskedValue(): string {
    return this.state.maskedValue;
  }



  private createMoneyFormatHelper(props: FullCurrencyInputProps): MoneyFormatHelper {
    let otherOptions = undefined
    if (props.allowNegative || props.requireNegative) {
      otherOptions = { allowNegative: props.allowNegative, requireNegative: props.requireNegative }
    }

    return MoneyFormatHelper.initializeFromProps(props.locale, {
      style: "currency",
      currency: props.currency,
      currencyDisplay: props.currencyDisplay,
      useGrouping: props.useGrouping
    },
      otherOptions)
  }

  /**
   * General function used to cleanup and define the final props used for rendering
   * @returns {{ maskedValue: {String}, value: {Number}, customProps: {Object} }}
   */
  @boundMethod
  private prepareProps(props: FullCurrencyInputProps): I18nCurrencyInputState {
    let customProps = { ...props };

    delete customProps.allowEmpty
    delete customProps.currency
    delete customProps.currencyDisplay
    delete customProps.inputType
    delete customProps.locale
    delete customProps.selectAllOnFocus
    delete customProps.useGrouping
    delete customProps.value
    delete customProps.onChange
    delete customProps.allowNegative
    delete customProps.requireNegative
    delete customProps.onBlur

    let initialValue = props.value;
    if (initialValue === null) {
      initialValue = props.allowEmpty ? null : '';
    }

    const { maskedValue, value, valueInCents } = this.createMoneyFormatHelper(props).mask(initialValue);

    return { maskedValue, value, valueInCents, customProps };
  }
  componentWillReceiveProps(nextProps: CurrencyInputProps) {
    this.setState(this.prepareProps(nextProps));
  }


  componentDidMount() {
    let node = ReactDOM.findDOMNode(this.inputRef.current) as HTMLInputElement;
    let selectionStart, selectionEnd;
    const suffix = this.createMoneyFormatHelper(this.props).getSuffix()
    selectionEnd = Math.min(node.selectionEnd || 0, this.inputRef.current.value.length - suffix.length);
    selectionStart = Math.min(node.selectionStart || 0, selectionEnd);
    this.setSelectionRange(node, selectionStart, selectionEnd);
    
    this.props.onChange(this, this.getMaskedValue(), this.state.value,this.state.valueInCents)
    
  }
  
  componentWillUpdate() {
    let node = ReactDOM.findDOMNode(this.inputRef.current) as HTMLInputElement;
    this.inputSelectionStart = node.selectionStart;
    this.inputSelectionEnd = node.selectionEnd;
  }

  componentDidUpdate(_prevProps: CurrencyInputProps, prevState: I18nCurrencyInputState) {
    const formatHelper = this.createMoneyFormatHelper(this.props)
    const groupSeparator = formatHelper.getGroupSeparator();
    const decimalSeparator = formatHelper.getDecimalSeparator();
    const prefix = formatHelper.getPrefix()
    const suffix = formatHelper.getSuffix()

    let node = ReactDOM.findDOMNode(this.inputRef.current) as HTMLInputElement;
    let isNegative = (this.inputRef.current.value.match(/-/g) || []).length % 2 === 1;
    let minPos = prefix.length + (isNegative ? 1 : 0);
    let selectionEnd = Math.max(minPos, Math.min(this.inputSelectionEnd, this.inputRef.current.value.length - suffix.length));
    let selectionStart = Math.max(minPos, Math.min(this.inputSelectionEnd, selectionEnd));

    let regexEscapeRegex = /[-[\]{}()*+?.,\\^$|#\s]/g;
    let separatorsRegex = new RegExp(decimalSeparator.replace(regexEscapeRegex, '\\$&') + '|' + groupSeparator.replace(regexEscapeRegex, '\\$&'), 'g');
    let currSeparatorCount = (this.state.maskedValue.match(separatorsRegex) || []).length;
    let prevSeparatorCount = (prevState.maskedValue.match(separatorsRegex) || []).length;
    let adjustment = Math.max(currSeparatorCount - prevSeparatorCount, 0);

    selectionEnd = selectionEnd + adjustment;
    selectionStart = selectionStart + adjustment;

    const precision = formatHelper.numberFormat.resolvedOptions().minimumFractionDigits

    let baselength = suffix.length
      + prefix.length
      + (precision > 0 ? decimalSeparator.length : 0) // if precision is 0 there will be no decimal part
      + precision
      + 1; // This is to account for the default '0' value that comes before the decimal separator

    if (this.state.maskedValue.length == baselength || prevState.maskedValue.length < baselength) {
      // if we are already at base length, position the cursor at the end.
      selectionEnd = this.inputRef.current.value.length - suffix.length;
      selectionStart = selectionEnd;
    }

    this.setSelectionRange(node, selectionStart, selectionEnd);
    this.inputSelectionStart = selectionStart;
    this.inputSelectionEnd = selectionEnd;
    if (_prevProps.value !== this.props.value && this.props.value !== this.getMaskedValue()){
        this.props.onChange(this, this.getMaskedValue(), this.state.value, this.state.valueInCents)
    }
  }

  /**
   * Set selection range only if input is in focused state
   * @param node DOMElement
   * @param start number
   * @param end number
   */
  @boundMethod
  private setSelectionRange(node: HTMLInputElement, start: number, end: number) {
    if (document.activeElement === node) {
      node.setSelectionRange(start, end);
    }
  }


  /**
   * onChange Event Handler
   * @param event
   */
  @boundMethod
  private handleChange(event: React.ChangeEvent<any>) {
    event.preventDefault();
    let { maskedValue, value, valueInCents } = this.createMoneyFormatHelper(this.props).mask(event.target.value)

    event.persist();  // fixes issue #23

    this.setState({ maskedValue, value, valueInCents }, () => {
      this.props.onChange(this, maskedValue, value, valueInCents);
    });
  }


  /**
   * onFocus Event Handler
   * @param event
   */
  @boundMethod
  private handleFocus(event: FocusEvent) {
    const formatHelper = this.createMoneyFormatHelper(this.props)
    const prefix = formatHelper.getPrefix()
    const suffix = formatHelper.getSuffix()
    //Whenever we receive focus check to see if the position is before the suffix, if not, move it.
    let selectionEnd = this.inputRef.current.value.length - suffix.length;
    let isNegative = (this.inputRef.current.value.match(/-/g) || []).length % 2 === 1;
    let selectionStart = prefix.length + (isNegative ? 1 : 0);
    this.props.selectAllOnFocus && (event.target as any).setSelectionRange(selectionStart, selectionEnd);
    this.inputSelectionStart = selectionStart;
    this.inputSelectionEnd = selectionEnd;
  }


  @boundMethod
  private handleBlur(event: FocusEvent) {

    this.props.onBlur(this)
  }

  render() {
    return (
      <input
        ref={this.inputRef}
        type={this.props.inputType}
        value={this.state.maskedValue}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onMouseUp={this.handleFocus}
        onBlur={this.handleBlur}
        {...this.state.customProps}
      />
    )
  }
}

export {MoneyFormatHelper}

export default I18nCurrencyInput
