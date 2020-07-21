// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/mask.spec.js
import 'jest';
import {MoneyFormatHelper} from './money_format_helper'

const nbsp = String.fromCharCode(160)

const enUS = MoneyFormatHelper.initializeFromProps('en-us', {currency: 'USD'});
const jaJP = MoneyFormatHelper.initializeFromProps('ja-JP', { style: 'currency', currency: 'JPY' })

const enIN = MoneyFormatHelper.initializeFromProps('en-IN', { currency: 'INR' })

const deDE = MoneyFormatHelper.initializeFromProps('de-DE', { currency: 'EUR' })

const enUSNoNegative = MoneyFormatHelper.initializeFromProps('en-us', { style: 'currency', currency: 'USD'  }, {requireSign:'positive'})

const enUSRequireNegative = MoneyFormatHelper.initializeFromProps('en-us', { currency: 'USD'  }, {requireSign:'negative'})

describe('mask', function () {
  
  it('should return empty strings when value is not set"', function () {
    const { maskedValue, value, valueInCents } = enUS.mask();

    expect(maskedValue).toBe("");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should return empty strings when value is empty string"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("");

    expect(maskedValue).toBe("");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should return empty strings when value is null"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask(null);

    expect(maskedValue).toBe("");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should change "0" to "0.00"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("0");

    expect(maskedValue).toBe("$0.00");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should change "00" to "0.00"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("00");

    expect(maskedValue).toBe("$0.00");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should change "000" to "$0.00"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("000");
    expect(maskedValue).toBe("$0.00");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should change "0000" to "0.00"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("0000");
    expect(maskedValue).toBe("$0.00");
    expect(value).toBe(0);
    expect(valueInCents).toBe(0)
  });

  it('should change "0001" to "0.01"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("0001");
    expect(maskedValue).toBe("$0.01");
    expect(value).toBe(0.01);
    expect(valueInCents).toBe(1)
  });

  it('should change "1001" to "1$0.01"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("1001");
    expect(maskedValue).toBe("$10.01");
    expect(value).toBe(10.01);
    expect(valueInCents).toBe(1001)
  });

  it('should change "123456789" to "1,234,567.89"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("123456789");
    expect(maskedValue).toBe("$1,234,567.89");
    expect(value).toBe(1234567.89);
    expect(valueInCents).toBe(123456789)
  });

  it('should change "-123456789" to "-$1,234,567.89"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("-123456789");
    expect(maskedValue).toBe("-$1,234,567.89");
    expect(value).toBe(-1234567.89);
    expect(valueInCents).toBe(-123456789);
  });


  it('should change "100.1" to "100.10"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("100.1");
    expect(maskedValue).toBe("$10.01");
    expect(value).toBe(10.01);
    expect(valueInCents).toBe(1001);
  });

  it('should change "100.10." to "100.10"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("100.10.");
    expect(maskedValue).toBe("$100.10");
    expect(value).toBe(100.10);
    expect(valueInCents).toBe(10010);
  });

  it('should change ".100.10" to "100.10"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask(".100.10");
    expect(maskedValue).toBe("$100.10");
    expect(value).toBe(100.10);
    expect(valueInCents).toBe(10010);
  });

  it('should change "10.0.10" to "100.10"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("10.0.10");
    expect(maskedValue).toBe("$100.10");
    expect(value).toBe(100.10);
    expect(valueInCents).toBe(10010);
  });



  it('should change "10.011" to "100.11"', function () {
    const { maskedValue, value, valueInCents } =  enUS.mask("10.011");
    expect(maskedValue).toBe("$100.11");
    expect(value).toBe(100.11);
    expect(valueInCents).toBe(10011);
  });

  it('should accept a single digit and put it in the cents spot', () => {
    const { maskedValue, value, valueInCents } =  enUS.mask("5");
    expect(maskedValue).toBe("$0.05");
    expect(value).toBe(0.05);
    expect(valueInCents).toBe(5);
  })

  it('should change digits whether the  and put it in the cents spot', () => {
    const { maskedValue, value, valueInCents } =  enUS.mask("5");
    expect(maskedValue).toBe("$0.05");
    expect(value).toBe(0.05);
    expect(valueInCents).toBe(5);
  })

  it('should have a prefix of $', () => {
    expect(enUS.getPrefix()).toBe('$')
  })

  it('should have a suffix of ""', () => {
    expect(enUS.getSuffix()).toBe('')
  })

  describe('jp', () => {

    it('should return empty strings when value is not set"', function () {
      const { maskedValue, value, valueInCents } = jaJP.mask();
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should return empty strings when value is empty string"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("");
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should return empty strings when value is null"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask();
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0" to "￥0"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("0");
  
      expect(maskedValue).toBe(`￥0`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "00" to "￥0"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("00");
  
      expect(maskedValue).toBe("￥0");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "000" to "￥0"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("000");
      expect(maskedValue).toBe("￥0");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0000" to "￥0"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("0000");
      expect(maskedValue).toBe("￥0");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0001" to "￥1"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("0001");
      expect(maskedValue).toBe("￥1");
      expect(value).toBe(1);
      expect(valueInCents).toBe(1);
    });
  
    it('should change "1001" to "￥1,001', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("1001");
      expect(maskedValue).toBe("￥1,001");
      expect(value).toBe(1001);
      expect(valueInCents).toBe(1001);
    });
  
    it('should change "123456789" to "￥123,456,789"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("123456789");
      expect(maskedValue).toBe("￥123,456,789");
      expect(value).toBe(123456789);
      expect(valueInCents).toBe(123456789);
    });

    it('should change "-123456789" to "-￥123,456,789"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("-123456789");
      expect(maskedValue).toBe("-￥123,456,789");
      expect(value).toBe(-123456789);
      expect(valueInCents).toBe(-123456789);
    });

    it('should change "￥123,456,789" to "￥123,456,789"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("￥123,456,789");
      expect(maskedValue).toBe("￥123,456,789");
      expect(value).toBe(123456789);
      expect(valueInCents).toBe(123456789);
    });

    it('should change "￥12,3,456,7,,89" to "￥123,456,789"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("￥123,456,789");
      expect(maskedValue).toBe("￥123,456,789");
      expect(value).toBe(123456789);
      expect(valueInCents).toBe(123456789);
    });
  
  
    it('should change "100." to "￥100"', function () {
      const { maskedValue, value, valueInCents } =  jaJP.mask("100.");
      expect(maskedValue).toBe("￥100");
      expect(value).toBe(100);
      expect(valueInCents).toBe(100);
    });

    it('should have a prefix of ￥', () => {
      expect(jaJP.getPrefix()).toBe('￥')
    })
  
    it('should have a suffix of ""', () => {
      expect(jaJP.getSuffix()).toBe('')
    })

  })

  describe('in', () => {

    it('should return empty strings when value is not set"', function () {
      const { maskedValue, value, valueInCents } = enIN.mask();
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should return empty strings when value is empty string"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("");
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should return empty strings when value is null"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask();
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0" to "₹0.00"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("0");
      expect(maskedValue).toBe(`₹${nbsp}0.00`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "00" to "₹0.00"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("00");
  
      expect(maskedValue).toBe(`₹${nbsp}0.00`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "000" to "₹0.00"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("000");
      expect(maskedValue).toBe(`₹${nbsp}0.00`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0000" to "₹0.00"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("0000");
      expect(maskedValue).toBe(`₹${nbsp}0.00`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0001" to "₹0.00"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("0001");
      expect(maskedValue).toBe(`₹${nbsp}0.01`);
      expect(value).toBe(0.01);
      expect(valueInCents).toBe(1);
    });
  
    it('should change "1001" to "₹10.00', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("1001");
      expect(maskedValue).toBe(`₹${nbsp}10.01`);
      expect(value).toBe(10.01);
      expect(valueInCents).toBe(1001);
    });
  
    it('should change "123456789" to "₹12,34,567.89"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("123456789");
      expect(maskedValue).toBe(`₹${nbsp}12,34,567.89`);
      expect(value).toBe(1234567.89);
      expect(valueInCents).toBe(123456789);
    });

    it('should change "-123456789" to "-₹12,34,567.89""', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("-123456789");
      expect(maskedValue).toBe(`-₹${nbsp}12,34,567.89`);
      expect(valueInCents).toBe(-123456789);
    });

    it('should change "₹12,34,567.89" to "₹12,34,567.89"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("₹12,34,567.89");
      expect(maskedValue).toBe(`₹${nbsp}12,34,567.89`);
      expect(value).toBe(1234567.89);
      expect(valueInCents).toBe(123456789);
    });

    it('should change "₹12,34,56,,7.8.9" to "₹12,34,567.89"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("￥123,456,789");
      expect(maskedValue).toBe(`₹${nbsp}12,34,567.89`);
      expect(value).toBe(1234567.89);
      expect(valueInCents).toBe(123456789);
    });
  
    it('should change "100." to "₹1.00"', function () {
      const { maskedValue, value, valueInCents } =  enIN.mask("100.");
      expect(maskedValue).toBe(`₹${nbsp}1.00`);
      expect(value).toBe(1);
      expect(valueInCents).toBe(100);
    });

    it('should have a prefix of ₹${nbsp}', () => {
      expect(enIN.getPrefix()).toBe(`₹${nbsp}`)
    })
  
    it('should have a suffix of ""', () => {
      expect(enIN.getSuffix()).toBe('')
    })

  })

  describe('de', () => {

    it('should return empty strings when value is not set"', function () {
      const { maskedValue, value, valueInCents } = deDE.mask();
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should return empty strings when value is empty string"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("");
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should return empty strings when value is null"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask(null);
  
      expect(maskedValue).toBe("");
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0" to "0.00 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("0");
      expect(maskedValue).toBe(`0,00${nbsp}€`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "00" to "0,00 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("00");
  
      expect(maskedValue).toBe(`0,00${nbsp}€`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "000" to "0,00 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("000");
      expect(maskedValue).toBe(`0,00${nbsp}€`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0000" to "0,00 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("0000");
      expect(maskedValue).toBe(`0,00${nbsp}€`);
      expect(value).toBe(0);
      expect(valueInCents).toBe(0);
    });
  
    it('should change "0001" to "0,01 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("0001");
      expect(maskedValue).toBe(`0,01${nbsp}€`);
      expect(value).toBe(0.01);
      expect(valueInCents).toBe(1);
    });
  
    it('should change "1001" to "10,01 €', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("1001");
      expect(maskedValue).toBe(`10,01${nbsp}€`);
      expect(value).toBe(10.01);
      expect(valueInCents).toBe(1001);
    });
  
    it('should change "123456789" to "₹12,34,567.89"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("123456789");
      expect(maskedValue).toBe(`1.234.567,89${nbsp}€`);
      expect(value).toBe(1234567.89);
      expect(valueInCents).toBe(123456789);
    });

    it('should change "1.234.567,89 €" to "1.234.567,89 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask(`1.234.567,89${nbsp}€`);
      expect(maskedValue).toBe(`1.234.567,89${nbsp}€`);
      expect(value).toBe(1234567.89);
      expect(valueInCents).toBe(123456789);
    });

    it('should change "1.234.56..7,89 €" to "1.234.567,89 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("1.234.56..7,89€");
      expect(maskedValue).toBe(`1.234.567,89${nbsp}€`);
      expect(value).toBe(1234567.89);
      expect(valueInCents).toBe(123456789);
    });
  
    it('should change "100," to "100,00 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("100,");
      expect(maskedValue).toBe(`1,00${nbsp}€`);
      expect(value).toBe(1);
      expect(valueInCents).toBe(100);
    });

    it('should have a no prefix', () => {
      expect(deDE.getPrefix()).toBe("")
    })
  
    it('should have a suffix of ""', () => {
      expect(deDE.getSuffix()).toBe(`${nbsp}€`)
    })

    it('should change "-123456789" to "-1.234.567,89 €"', function () {
      const { maskedValue, value, valueInCents } =  deDE.mask("-123456789");
      expect(maskedValue).toBe(`-1.234.567,89${nbsp}€`);
      expect(value).toBe(-1234567.89);
    });

  })

  describe('negative numbers', function () {

    it('single "-" anywhere in the string should result in a negative masked number', function () {
      expect(enUS.mask("-123456").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("123-456").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("123456-").maskedValue).toBe("-$1,234.56");
    });


    it('single "-" anywhere in the string should result in a negative masked number', function () {
      expect(enUS.mask("-123456").value).toBe(-1234.56);
      expect(enUS.mask("123-456").value).toBe(-1234.56);
      expect(enUS.mask("123456-").value).toBe(-1234.56);
    });

    it('no or even number of "-" should result in a positive number', function () {
      expect(enUS.mask("123456").maskedValue).toBe("$1,234.56");
      expect(enUS.mask("--123456").maskedValue).toBe("$1,234.56");
      expect(enUS.mask("123--456").maskedValue).toBe("$1,234.56");
      expect(enUS.mask("123456--").maskedValue).toBe("$1,234.56");
      expect(enUS.mask("--123456--").maskedValue).toBe("$1,234.56");
      expect(enUS.mask("--123--456--").maskedValue).toBe("$1,234.56");
      expect(enUS.mask("--1--234--56--").maskedValue).toBe("$1,234.56");
    });

    it('odd number of "-" should result in a negative number', function () {
      expect(enUS.mask("-123456").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("123-456").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("123456-").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("-123-456-").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("-1-23-45-6-").maskedValue).toBe("-$1,234.56");
      expect(enUS.mask("-1-2-3-4-5-6-").maskedValue).toBe("-$1,234.56");
    });

    it('0 is never negative', function () {
      expect(enUS.mask("0").maskedValue).toBe("$0.00");
      expect(enUS.mask("-0").maskedValue).toBe("$0.00");
      expect(enUS.mask("-0-").maskedValue).toBe("$0.00");
      expect(enUS.mask("--0-").maskedValue).toBe("$0.00");
    });

    it('just "-" should result in 0.00', function () {
      expect(enUS.mask("-").maskedValue).toBe("$0.00");
    });
  });

  describe('dont allow negative', function () {
    it('should keep positive numbers as is', () => {
      const {maskedValue, value, valueInCents} = enUSNoNegative.mask("123456789")
      expect(maskedValue).toBe("$1,234,567.89")
      expect(value).toBe(1234567.89)
      expect(valueInCents).toBe(123456789)
    })

    it('should convert 0 to $0.00', () => {
      const {maskedValue, value, valueInCents} = enUSNoNegative.mask("0")
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert -0 to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSNoNegative.mask("-0")
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert 0 as number to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSNoNegative.mask(0)
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert -0 as number to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSNoNegative.mask(-0)
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert -122222 to $1222.22', () => {
       const { maskedValue, value, valueInCents } = enUSNoNegative.mask("-122222")
      expect(maskedValue).toBe("$1,222.22")
      expect(value).toBe(1222.22)
      expect(valueInCents).toBe(122222)
    })

    it('should convert -122222 to $1222.22', () => {
       const { maskedValue, value, valueInCents } = enUSNoNegative.mask(-122222)
      expect(maskedValue).toBe("$122,222.00")
      expect(value).toBe(122222)
      expect(valueInCents).toBe(12222200)
    })
  })

  describe('require negative', function () {
    it('should keep negative numbers as-is', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask("-123456789")
      expect(maskedValue).toBe("-$1,234,567.89")
      expect(value).toBe(-1234567.89)
      expect(valueInCents).toBe(-123456789)
    })


    it('should keep negative numbers passed as number as-is', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask(-1234567.89)
      expect(maskedValue).toBe("-$1,234,567.89")
      expect(value).toBe(-1234567.89)
      expect(valueInCents).toBe(-123456789)
    })

    it('should convert 0 to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask("0")
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert -0 to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask("-0")
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert 0 as number to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask(0)
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert -0 as number to $0.00', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask(-0)
      expect(maskedValue).toBe("$0.00")
      expect(value).toBe(0)
      expect(valueInCents).toBe(0)
    })

    it('should convert 122222 to -$1222.22', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask("122222")
      expect(maskedValue).toBe("-$1,222.22")
      expect(value).toBe(-1222.22)
      expect(valueInCents).toBe(-122222)
    })

    it('should convert 122222 as number to -$122,222.00', () => {
       const { maskedValue, value, valueInCents } = enUSRequireNegative.mask(122222)
      expect(maskedValue).toBe("-$122,222.00")
      expect(value).toBe(-122222)
      expect(valueInCents).toBe(-12222200)
    })
  })
});
