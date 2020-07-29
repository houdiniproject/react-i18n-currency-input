// License: LGPL-3.0-or-later
import 'jest';
import * as React from 'react'

import { render, cleanup, fireEvent, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
const nbsp = " ";

export function CurrencyInputTests(WrapperClass:React.FunctionComponent<any>) {

  function createValueProps(input:any) {
    return {value:input};
  }

  function expectValues(beforeAction: () => RenderResult, values: string[][]) {
    it.each(values)('%s should be "%s', (id, output, type) => {
      const { getByTestId } = beforeAction();
      if (type == 'value')
        expect(getByTestId(id)).toHaveValue(output)
      else
        expect(getByTestId(id)).toHaveTextContent(output)
    })
  }

  describe('default arguments', function () {

    expectValues(() => (render(<WrapperClass />)),
      [['input', '$0.00', 'value'],
      ['value', '0', 'text'],
      ['valueInCents', '0', 'text'],
      ['maskedValue', '$0.00', 'text']]);
  });

  describe("start typing", function () {
    let getByTestId: any;
    expectValues(() => {
      const result = render(<WrapperClass />)
      getByTestId = result.getByTestId
      const input = getByTestId('input')
      fireEvent.change(getByTestId('input'), { target: { value: '$0.001' } })
      return result;
    }, [
      ['value', '0.01', 'text'],
      ['valueInCents', '1', 'text'],
      ['maskedValue', '$0.01', 'text'],
      ['input', '$0.01', 'value']
    ])

  });

  describe('properly convert number value props into display values', () => {

    it.each([
      ['adds decimals to whole numbers to match precision', 123456789, '$1,234,567.89'],
      ['Does not change value when precision matches', 1234567.89, '$12,345.68'],
      ['Rounds down properly when an number with extra decimals is passed in', 1234567.89123, '$12,345.68'],
      ['handles initial value as the integer 0', 0, '$0.00'],
      ['handles initial value as the float 0.00', 0.00, '$0.00']
    ])("%s", (_name, input, output) => {
      const { getByTestId } = render(<WrapperClass {...createValueProps(input)} />)
      expect(getByTestId('input')).toHaveValue(output)
    })

  });

  describe('properly convert string value props into display values', () => {
    it.each([
      ['adds decimals to whole numbers to match precision', '6300.00', '$6,300.00'],
      ['Does not change value when precision matches', "1234567.89", '$1,234,567.89']
    ])("%s", (_name, input, output) => {
      const { getByTestId } = render(<WrapperClass {...createValueProps(input)} />)
      expect(getByTestId('input')).toHaveValue(output)
    })
  });

  describe('rounding', () => {
    it.each([
      ['Rounds down properly when an number with extra decimals is passed in', 1234567.4123, '$12,345.67', 'USD'],
      ['Rounds up properly when an number with extra decimals is passed in', 1234567.89999, '$12,345.68', 'USD'],
      ['Rounds up the whole number when an number with extra decimals is passed in', 1234567.999, '¥1,234,568', 'JPY'],
    ])("%s", (_name, input, output, currency) => {
      const { getByTestId } = render(<WrapperClass
        {...createValueProps(input)} currency={currency} />)
      expect(getByTestId('input')).toHaveValue(output)
    })
  });

  describe('negative numbers', () => {
    it.each([
      ['-0', 'without negative sign', "$0.00"],
      ["123456", 'with no or even number of "-" as positive', '$1,234.56'],
      ["--123456", 'with no or even number of "-" as positive', '$1,234.56'],
      ["123--456", 'with no or even number of "-" as positive', '$1,234.56'],
      ["123456--", 'with no or even number of "-" as positive', '$1,234.56'],
      ["--123--456--", 'with no or even number of "-" as positive', '$1,234.56'],
      ["123456----", 'with no or even number of "-" as positive', '$1,234.56']
    ])('should render %s %s', (_name, input, output) => {
      const { getByTestId } = render(<WrapperClass {...createValueProps(input)} />)
      fireEvent.change(getByTestId('input'), { target: { value: output } });
      expect(getByTestId('input')).toHaveValue(output)
    })

    it('should correctly change between postive and negative', () => {
      const { getByTestId } = render(<WrapperClass value={0} />)
      fireEvent.change(getByTestId('input'), { target: { value: "123456" } });
      expect(getByTestId('input')).toHaveValue('$1,234.56')

      fireEvent.change(getByTestId('input'), { target: { value: "1,234.56-" } });
      expect(getByTestId('input')).toHaveValue('-$1,234.56')

      fireEvent.change(getByTestId('input'), { target: { value: "-1,234.56-" } });
      expect(getByTestId('input')).toHaveValue('$1,234.56')

      fireEvent.change(getByTestId('input'), { target: { value: "1-,234.56" } });
      expect(getByTestId('input')).toHaveValue('-$1,234.56')

      fireEvent.change(getByTestId('input'), { target: { value: "1---,234.56" } });
      expect(getByTestId('input')).toHaveValue('-$1,234.56')

      fireEvent.change(getByTestId('input'), { target: { value: "-1,234.-56" } });
      expect(getByTestId('input')).toHaveValue('$1,234.56')
    });
  });

  describe('separators and symbols', () => {
    it.each([
      ['1,000.01', 'handles string with separators', undefined, undefined, "$1,000.01"],
      ['$10.01', 'handles string with prefixes', undefined, undefined, '$10.01'],
      ['10.01 EUR', 'handles strings with suffixes', "de-de", 'EUR', `10,01${nbsp}€`],
      ["123.456.789,12", 'handles strings with custom separators', "de-de", undefined, `123.456.789,12${nbsp}$`],
      ["1,234,567.89", "handles 1,234,567.89 format", undefined, undefined, '$1,234,567.89'],
      ['1.234.567,89', "Handles 1.234.567,89 format", 'de-de', undefined, `1.234.567,89${nbsp}$` ],
    ])("Passing %s %s and locale %s, currency %s", (value, _name, locale, currency, output) => {
      let args:any = {}
      if (locale)
        args['locale'] = locale
      if (currency)
        args['currency'] = currency
      const { getByTestId } = render(<WrapperClass {...args} {...createValueProps(value)}/>)
      expect(getByTestId('input')).toHaveValue(output)
    })
  });

};