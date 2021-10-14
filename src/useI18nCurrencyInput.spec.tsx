// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/index.spec.js
import 'jest';
import * as React from 'react'
import {useI18nCurrencyInput, Types} from './index'

import { useRef } from 'react';

import {renderHook, RenderResult} from '@testing-library/react-hooks';
import '@testing-library/jest-dom/extend-expect';
import { CurrencyInputTests } from './test';

function UpdateWrapper(props: Omit<Types.UseI18nCurrencyInputProps, 'inputRef'>) {
  const inputRef = useRef<HTMLInputElement|null>(null)
  const values = useI18nCurrencyInput({
    ...props,
    inputRef
  });
  const { maskedValue: value, onFocus, onChange, onMouseUp, onSelect } = values;
  const inputProps = { value, onFocus, onChange, onMouseUp, onSelect }
  return <div>
    <p data-testid="value">{values.value}</p>
    <p data-testid="valueInCents">{values.valueInCents}</p>
    <p data-testid="maskedValue">{values.maskedValue}</p>
    <input ref={inputRef} data-testid="input" {...inputProps} />
  </div>
}

describe('useI18nCurrencyInput', () => {
  CurrencyInputTests(UpdateWrapper);

  describe('properly handles an update of the value from 800 to 8000', () => {

    function getWrapper(): RenderResult<Types.UseI18nCurrencyInputResult> {
      const {result:refResult} = renderHook(() => useRef<HTMLInputElement|null>(null));
      const initialProps: any = {value: 800, updatePropsAfterInit: true}
      const { result, rerender} = renderHook((props: Types.UseI18nCurrencyInputProps) => useI18nCurrencyInput({
          ...props,
        inputRef:refResult.current
        }), {initialProps});
      
        expect(result.current.valueInCents).toBe(800);
        expect(result.current.maskedValue).toBe("$8.00");
        expect(result.current.value).toBe(8);
        rerender({value: 8000, inputRef:refResult.current});
        return result;
    }

    it("has updated to 8000 for the valueInCents", () => {
      const wrapper = getWrapper();
      expect(wrapper.current.valueInCents).toBe(8000);
    });

    it("has updated to $80.00 for the maskedValue", () => {
      const wrapper = getWrapper();
      expect(wrapper.current.maskedValue).toBe("$80.00");
    });

    it("has updated to $80.00 for the maskedValue", () => {
      const wrapper = getWrapper();
      expect(wrapper.current.value).toBe(80);
    });
  })

  describe('properly handles an update of the value from 800 to 8000', () => {

    function getWrapper(): RenderResult<Types.UseI18nCurrencyInputResult> {
      const {result:refResult} = renderHook(() => useRef<HTMLInputElement|null>(null));
      const initialProps: any = {value: 800, updatePropsAfterInit: true}
      const { result, rerender} = renderHook((props: Types.UseI18nCurrencyInputProps) => useI18nCurrencyInput({
          ...props,
        inputRef:refResult.current
        }), {initialProps});
      
        expect(result.current.valueInCents).toBe(800);
        expect(result.current.maskedValue).toBe("$8.00");
        expect(result.current.value).toBe(8);
        rerender({value: 8000, inputRef:refResult.current});
        return result;
    }

    it("has updated to 8000 for the valueInCents", () => {
      const wrapper = getWrapper();
      expect(wrapper.current.valueInCents).toBe(8000);
    });

    it("has updated to $80.00 for the maskedValue", () => {
      const wrapper = getWrapper();
      expect(wrapper.current.maskedValue).toBe("$80.00");
    });

    it("has updated to $80.00 for the maskedValue", () => {
      const wrapper = getWrapper();
      expect(wrapper.current.value).toBe(80);
    });
  })

  describe('properly handles an update of the value from 800 to $80.00', () => {

    function getWrapper(): RenderResult<Types.UseI18nCurrencyInputResult> {
      const {result:refResult} = renderHook(() => useRef<HTMLInputElement|null>(null));
      const initialProps: any = {value: 800, updatePropsAfterInit: true}
      const { result, rerender} = renderHook((props: Types.UseI18nCurrencyInputProps) => useI18nCurrencyInput({
          ...props,
        inputRef:refResult.current
        }), {initialProps});
      
        expect(result.current.valueInCents).toBe(800);
        expect(result.current.maskedValue).toBe("$8.00");
        expect(result.current.value).toBe(8);
        rerender({value: "$80.00", inputRef:refResult.current});
        return result;
    }

    it("has updated to 8000 for the valueInCents", async () => {
      const wrapper = getWrapper();
      expect(wrapper.current.valueInCents).toBe(8000);
    });

    it("has updated to $80.00 for the maskedValue", async () => {
      const wrapper = getWrapper();
      expect(wrapper.current.maskedValue).toBe("$80.00");
    });

    it("has updated to $80.00 for the maskedValue", async () => {
      const wrapper = getWrapper();
      expect(wrapper.current.value).toBe(80);
    });
  })
});
