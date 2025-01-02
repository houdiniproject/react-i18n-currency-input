// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/index.spec.js
import 'jest';
import * as React from 'react'
import I18nCurrencyInput, { Types } from '../src/index';
import { useCallback, useState } from 'react';
import { cleanup, fireEvent, render} from '@testing-library/react';
import { CurrencyInputTests } from './test';

interface WrapperValue{
  maskedValue?:string,
  value?: number,
  valueInCents?:number
}

function UpdateWrapper(props: Omit<Types.I18nCurrencyInputProps, 'onChange'>) {
  const [values, setValues] = useState<WrapperValue|null>(null)
  const onChange = useCallback((maskedValue:string, value:number, valueInCents: number) => {
    setValues({maskedValue, value, valueInCents})
  }, [setValues]);

  const value = values === null ? props.value : values.valueInCents
  return <div>
    <p data-testid="value">{values && values.value}</p>
    <p data-testid="valueInCents">{values && values.valueInCents}</p>
    <p data-testid="maskedValue">{values && values.maskedValue}</p>
    <I18nCurrencyInput data-testid="input"{...props} value={value} onChange={onChange}/>
  </div>;
}

describe('I18nCurrencyInput', function () {
  afterEach(cleanup);
  CurrencyInputTests(UpdateWrapper)

  describe('selectAllOnFocus', () => {
    it('does not select all on Focus Event when false', () => {
        const result = render(<UpdateWrapper selectAllOnFocus={false} value={'$5.55'}/>)
        const elem = result.getByTestId('input') as HTMLInputElement
        elem.focus();
        expect(elem).toHaveFocus();
        expect(elem.selectionStart).toBe(5)
        expect(elem.selectionEnd).toBe(5)
    })

    it('selects all on Focus Event when true', () => {
      const result = render(<UpdateWrapper selectAllOnFocus={true} value={'$5.55'}/>)
      const elem = result.getByTestId('input') as HTMLInputElement
      elem.focus()
      expect(elem).toHaveFocus();
      expect(elem.selectionStart).toBe(1)
      expect(elem.selectionEnd).toBe(5);
    })

    it('does not select all on Select event when false', () => {
      const result = render(<UpdateWrapper selectAllOnFocus={false} value={'$5.55'}/>)
      const elem = result.getByTestId('input') as HTMLInputElement
      elem.setSelectionRange(1, 2)
      fireEvent.select(elem, {})
      expect(elem.selectionStart).toBe(1)
      expect(elem.selectionEnd).toBe(2)
    })

    it('selects all on Select event when true', () => {
      const result = render(<UpdateWrapper selectAllOnFocus={true} value={'$5.55'}/>)
      const elem = result.getByTestId('input') as HTMLInputElement
      elem.setSelectionRange(1, 2)
      fireEvent.select(elem, {})
      expect(elem.selectionStart).toBe(1)
      expect(elem.selectionEnd).toBe(5)
    })
  });

  it("calls onFocus properly", () => {
    let onFocusCalled = false
    const result = render(<UpdateWrapper value={3333} onFocus={() => {onFocusCalled = true;}}/>)
    const elem = result.getByTestId('input') as HTMLInputElement
    elem.focus()
    expect(onFocusCalled).toEqual(true)
    
  })

  it("calls onSelect properly", () => {
    let onSelectCalled = false
    const result = render(<UpdateWrapper value={3333} onSelect={() => {onSelectCalled = true;}}/>)
    const elem = result.getByTestId('input') as HTMLInputElement
    fireEvent.select(elem, {});
    expect(onSelectCalled).toEqual(true)
  })

  it("calls onMouseUp properly", () => {
    let onMouseUpCalled = false
    const result = render(<UpdateWrapper value={3333} onMouseUp={() => {onMouseUpCalled = true;}}/>)
    const elem = result.getByTestId('input') as HTMLInputElement
    fireEvent.mouseUp(elem)
    expect(onMouseUpCalled).toEqual(true);
  });

  it.each([
    'useGrouping', 
    'locale',
    'currency',
    'currencyDisplay',
    'selectAllOnFocus',
    'minimumIntegerDigits', 
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'allowEmpty',
    'requireSign'
  ].map((i) => [i]))('%s is not passed through to the input element', (propname) => {
    const result = render(<UpdateWrapper value={3333} 
      useGrouping={true} locale={'en'} currency={'USD'} 
      currencyDisplay={'code'}
      selectAllOnFocus={true}
      minimumIntegerDigits={2}
      minimumFractionDigits={1}
      maximumFractionDigits={3}
      minimumSignificantDigits={4}
      maximumSignificantDigits={3}
      allowEmpty={true}
      requireSign={'negative'}
    />)
    const elem = result.getByTestId('input') as HTMLInputElement
    expect(elem.getAttribute(propname)).toEqual(null)
  })
});
