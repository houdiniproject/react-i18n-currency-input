// License: LGPL-3.0-or-later
import { MoneyFormatHelperOptions } from "./money_format_helper";

interface I18nCurrencyInputPropsCommon extends MoneyFormatHelperOptions {
  /**
   * The value you want to be formatted. If you want this to be a 
   * controlled component, you'll need to use onChange to get the value on each
   * change and then pass in the value. If you want to an uncontrolled
   * component, this should just be the initial value
   * @type (string|number|null)
   * @memberof I18nCurrencyInputPropsCommon
   */
  value?: string | number | null

  /**
   * the string of the locale you want to format the number in. If you provide multiple, Intl.NumberFormat uses the first one that it has locale data for
   * @default "en-us"
   * @type string
   * @memberof I18nCurrencyInputPropsCommon
   */
  locale?: string | string[]

  /**
   * the ISO 4217 currency code for this field
   * @default "USD"
   * @type string
   * @memberof I18nCurrencyInputPropsCommon
   */
  currency?: string,

  /**
   * How you want your currency to be displayed. Options are:
   *  - symbol: the currency symbol, like $ or €
   *  - code: the currency code, like USD or EUR
   *  - name: the localized name of the currency, like dollar in the locale en-us or dólares estadounidenses in es-mx locale
   * @default 'symbol'
   * @type ('symbol' | 'code' | 'name')
   * @memberof I18nCurrencyInputPropsCommon
   */
  currencyDisplay?: 'symbol' | 'code' | 'name',

  /**
   * whether you want grouping in the integer portion. As an example, in the US, grouping is done by every three digits, i.e. $1,000 and $1,000,000.
   * if you don't want grouping, set this to false.
   * @default true
   * @type boolean
   * @memberof I18nCurrencyInputPropsCommon
   */
  useGrouping?: boolean,


  /**
   * The minimum number of integer digits to use.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#Syntax}
   * for more info.
   * @default 1
   * @type {number}
   * @memberof I18nCurrencyInputPropsCommon
   */
  minimumIntegerDigits?: number;


  /**
   * The minimum number of fraction digits to use, i.e. on the right side of the decimal point.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#Syntax}
   * for more info.
   * @default the number of minor unit digits for a currency
   * @type {number}
   * @memberof I18nCurrencyInputPropsCommon
   */
  minimumFractionDigits?: number;



  /**
   * The minimum number of fraction digits to use, i.e. on the right side of the decimal point.
   * 
   * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#Syntax}
   * for more info.
   * @default larger of minimumFractionDigits or the number of minor unit digits for a currency.
   * @type {number}
   * @memberof I18nCurrencyInputPropsCommon
   */
  maximumFractionDigits?: number;

  /**
   * The minimum number of significant digits to use.
   * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#Syntax}
   * for more info.
   * @default 1
   * @type {number}
   * @memberof I18nCurrencyInputPropsCommon
   */
  minimumSignificantDigits?: number;


  /**
   * The maximum number of significant digits to use.
   * 
   * See {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#Syntax}
   * for more info.
   * @default 21
   * @type {number}
   * @memberof I18nCurrencyInputPropsCommon
   */
  maximumSignificantDigits?: number;

  /**
   * Do you want to have null or 0 as the empty value? True for null, false for 0
   * @default false
   * @type boolean
   * @memberof CurrencyInputProps
   */
  allowEmpty?: boolean


  /**
   * Do you want to select the entire contents of the field on focus?
   * 
   * @default false
   * @type {boolean}
   * @memberof I18nCurrencyInputPropsCommon
   */
  selectAllOnFocus?: boolean;

}

export type I18nCurrencyInputProps = I18nCurrencyInputPropsCommon & Partial<MoneyFormatHelperOptions> & Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> & {
  /**
   * A callback after the input has changed and has been processed. The arguments for the onChange are as follows:
   * - instance: the instance of I18nCurrencyInput which fired this event
   * - maskedValue: the value after going through the masking process. In the case of "1" (a string) and default properties, you'll end up with "$0.01"
   * - value: the numerical value of the input value after the masking process. Use this when you need to do math using the input value. In the case of In the case of "1" (a string) and default properties, you'll end up with 0.01.
   * - valueInCents: the numerical value of the input value after the masking process in the lowest fractional value in the denomination. In the case of "1" (a string) and default properties, you'll end up with 1. For a currency without fractional values, like JPY, this will be the same as value.
   * @type number
   * @default (no-op function)
   * @memberof I18nCurrencyInputProps
   */
  onChange?: (maskedValue: string, value: number, valueInCents: number) => void

  /**
   * A callback on the blur event
   * @default (no-op function)
   * @memberof I18nCurrencyInputProps
   */
  onBlur?: () => void

  /**
  * A ref to the field which will contain a monetary value.
  * You might need this for certain form libraries. If you don't pass anything,
  * I18nCurrencyInput will work just fine.
  *
  * @type {React.MutableRefObject<HTMLInputElement>}
  */
  inputRef?: React.MutableRefObject<HTMLInputElement>
};




export type UseI18nCurrencyInputProps = I18nCurrencyInputPropsCommon & Partial<MoneyFormatHelperOptions> & {

  /**
   * A reference to the field which will contain a monetary value.
   *
   * @type {React.MutableRefObject<HTMLInputElement>}
   */
  inputRef: React.MutableRefObject<HTMLInputElement>
}

