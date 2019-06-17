// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/src/mask.js
import { boundMethod } from "autobind-decorator";
import _ = require("lodash");

interface MaskedAndRawValues {
  /**
   * The numerical value we've created after masking
   * @type number
   * @memberof MaskedAndRawValues
   */
  value: number,
  /**
   * The masked string value
   * @type string
   * @memberof MaskedAndRawValues
   */
  maskedValue: string
};

export type MoneyFormatHelperOptions = {
  /**
   * Do we want to allow negative numbers? If false, we strip negative signs.
   * @default true
   * @type boolean
   */
  allowNegative: boolean
} |
{
  /**
   * Should numbers always be negative (other than 0)? If so, we make all non-zero numbers negative.
   * @type boolean
   */
  requireNegative: boolean
}

const defaultOptions = { allowNegative: true }

/**
 * A class which takes an `Intl.NumberFormat` and some options provides functionality for converting `number` or a string containing a number into an appropriately masked value.
 * @export
 * @class MoneyFormatHelper
 */
export class MoneyFormatHelper {
  /**
   * Creates an instance of MoneyFormatHelper.
   * @param  {Intl.NumberFormat} numberFormat the format you want to use for number formatting
   * @param  {MoneyFormatHelperOptions} [options=defaultOptions] some options related to negative numbers. By default, this value is `{allowNegative:true}`
   * @memberof MoneyFormatHelper
   */
  constructor(
    readonly numberFormat: Intl.NumberFormat,
    readonly options: MoneyFormatHelperOptions = defaultOptions
  ) { }

  /**
   * A convenience factory method for creating a new `MoneyFormatHelper` using the inputoptions for `Intl.NumberFormat`. This allows you to create the `Intl.NumberFormat` and  `MoneyFormatHelper` in a single line of code
   * @static
   * @param  {(string | string[])} [locales] a locale to pass to the `Intl.NumberFormat` constructor. If multiple locales are passed, the ECMAScript Internationalization API uses the first locale which it has support for. For more information, see the [Intl.NumberFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat)
   * @param  {Intl.NumberFormatOptions} [numberFormatOpts] The options for creating a `Intl.NumberFormat`. For more information, see the [Intl.NumberFormat docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat).
   * @param  {MoneyFormatHelperOptions} [options] some options related to negative numbers. By default, this value is `{allowNegative:true}`
   * @return MoneyFormatHelper A new `MoneyFormatHelper` which uses the 
   * @memberof MoneyFormatHelper
   */
  public static initializeFromProps(locales?: string | string[], numberFormatOpts?: Intl.NumberFormatOptions, options?: MoneyFormatHelperOptions): MoneyFormatHelper {

    return new MoneyFormatHelper(new Intl.NumberFormat(locales, {...numberFormatOpts, style: 'currency'}), options || defaultOptions)
  }

  /**
   * Turns a possibly messy input which contains numbers, letters and symbols into a nice tuple of a masked string and the numerical value. It does this by engaging in some pre-processing and then eventually sends it through the [`Intl.NumberFormat.prototype.format`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat/format)
   * 
   * The pre-processing of the input value varies based upon the type of value passed.
   * - null always returns a `MaskedAndRawValues` of { value:0, maskedValue: ''}
   * - a number goes through limited pre-processing. If we expect it to be positive or negative and it doesn't meet that expectation, we flip its sign. If it's a -0, we turn it to 0 becuase -0 is just a headache.
   * - a string goes through the most pre-processing. It includes the pre-processing done by numbers along with additional processing. Some examples of that processing include:
   *  If the string has a number with too many digits after the decimal separator for our given `Intl.NumberFormat`, we shift the numbers over by one. As an example, if we received $0.011, we would convert this into $0.11. If your value is coming from a form input, this is what you want to have happen.
   *  If we allow both negative and positive numbers, i.e. allowNegatives:true, we decide whether to make the number positive or negative. We do this by counting the number of minus signs in the string. If there is an even number of minus signs, it's a positive number and if there's a odd number of minus signs, it's a negative number. As an example $0.-11 would be converted to -$0.11 while --$0.11 would be converted to $0.11. Again this makes sense for a form input.
   * @param  {(number | string | null)} [value] the value you want to be formatted.
   * @return MaskedAndRawValues 
   * @memberof MoneyFormatHelper
   */
  @boundMethod
  mask(value?: number | string | null): MaskedAndRawValues {
    const allowNegative = _.get(this.options, 'allowNegative')
    const requireNegative = _.get(this.options, 'requireNegative')

    if (value === null || value === undefined) {
      return {
        value: 0,
        maskedValue: ''
      };
    }

    const forceToNegative = requireNegative
    const forceToPositive = !forceToNegative && !allowNegative

    if (typeof value === 'number') {
      if ((forceToPositive && value < 0) || (forceToNegative && value > 0)) {
        value *= -1
      }

      if (value === -0) {
        value = 0
      }

      return {
        value: value,
        maskedValue: this.numberFormat.format(value)
      }
    }
    else {
      if (value === '') {
        return {
          value: 0,
          maskedValue: ''
        };
      }

      const decimal = this.getDecimalSeparator()
      let decimalRegexpString = "\\d"
      const hasDecimalSeparator = decimal && decimal != '';
      const decimalRegexp = new RegExp(decimalRegexpString, 'g')
      let items = value.match(decimalRegexp) || ['0'];
      if (hasDecimalSeparator) {

        //we need to add leading zeros if we don't have them!
        const numberOfZerosToAdd = this.numberFormat.resolvedOptions().minimumFractionDigits - items.length
        if (items.length <= this.numberFormat.resolvedOptions().minimumFractionDigits) {
          for (let i = 0; i < numberOfZerosToAdd; i++) {
            items.unshift('0')
          }

        }
        //add in decimal separator
        items.splice(items.length - this.numberFormat.resolvedOptions().minimumFractionDigits, 0, '.')

      }

      //find negatives
      if (!forceToPositive) {
        let isNegative = (value.match(/-/g) || []).length % 2 === 1
        if (forceToNegative || isNegative) {
          items.unshift('-')
        }
      }
      let parsedValue = Number(items.join('').trim())

      // -0 is 0, we don't have negative zero
      if (parsedValue === -0) {
        parsedValue = 0
      }

      return {
        value: parsedValue,
        maskedValue: this.numberFormat.format(parsedValue)
      }
    }
  }

  /**
   * The separator between the integer and decimal positions. As an example, in the us-en, we use the period: for example, 1000 is formatted as $1,000.00. In Europe, the comma is often used.
   * @return string the decimal separator for the `Intl.NumberFormat`. If there's no decimal separator in that locale and currency, such as for Japanese Yen, you'll receive an empty string
   * @memberof MoneyFormatHelper
   */
  @boundMethod
  getDecimalSeparator() {
    // a number with a decimal
    let number = 11456456.0222,
      decimal = '';

    this.formatToParts(number).forEach(function (i: any) {
      switch (i.type) {
        case 'decimal':
          decimal = i.value;
          break;
        default:
          break;
      }
    });

    return decimal;
  }

  /**
   * The separator for integer digits. As an example, in the us-en, we use the comma: for example, 1000 is formatted as $1,000.00. In Europe, the period is often used.
   * @return string the group separator for the `Intl.NumberFormat`. If there's no group separator in that locale and currency, you'll receive an empty string.
   * @memberof MoneyFormatHelper
   */
  @boundMethod
  getGroupSeparator(): string {
    // a number with a decimal
    let number = 11456456.0222,
      group = '';

    this.formatToParts(number).forEach(function (i: any) {
      switch (i.type) {
        case 'group':
          group = i.value;
          break;
        default:
          break;
      }
    });

    return group;
  }


  /**
   * Returns the currency value prefix for your given `Intl.NumberFormat`. As an example,
   * if your number format is locale: 'jp-jp' and the currency is JPY, we would return '￥' 
   * @return string the prefix for currency values. If no prefix is used, the empty string is returned.
   * @memberof MoneyFormatHelper
   */
  @boundMethod
  getPrefix(): string {
    const parts = this.formatToParts();

    let finished = false
    let prefix = ''
    parts.forEach((i) => {
      if (!finished) {
        if (i.type == 'nan') {
          finished = true
        }
        else {
          prefix += i.value
        }
      }
    })

    return prefix;
  }

  /**
   * Returns the currency value suffix for your given `Intl.NumberFormat`. As an example,
   * if your number format is locale: 'de-de' and the currency is EUR, we would return ' €' (the space is a non-breaking space, i.e. character code 160)
   * @return string the prefix for currency values. If no suffix is used, the empty string is returned.
   * @memberof MoneyFormatHelper
   */
  @boundMethod
  getSuffix(): string {
    const parts = this.formatToParts();
    let startedNan = false
    let suffix = ''
    parts.forEach((i) => {
      if (i.type == 'nan') {
        startedNan = true
      }
      else if (startedNan) {
        suffix += i.value
      }
    })

    return suffix
  }

  /**
   * a helper method to handle formatToParts because it's not properly defined in Typescript
   * @param  {Number} [number] 
   * @return Array<{type:string, value:string}> 
   * @memberof MoneyFormatHelper
   */
  @boundMethod
  private formatToParts(number?: Number): Array<{ type: string, value: string }> {
    // a number with a decimal
    let fmt_local: any = this.numberFormat

    return fmt_local.formatToParts(number)
  }

}