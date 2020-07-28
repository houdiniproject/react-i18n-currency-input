// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/src/index.js

import React, { useEffect, useCallback, useRef } from 'react'
import useI18nCurrencyInput from './useI18nCurrencyInput';
import { I18nCurrencyInputProps } from './types';


function I18nCurrencyInput(props:I18nCurrencyInputProps) {
  const internalRef = useRef();
  const inputRef = props.inputRef || internalRef;
  
  const {onChange, onBlur:_onBlur} = props;
  const currencyInput = useI18nCurrencyInput({inputRef, ...props});
  
  const {value, valueInCents, maskedValue} = currencyInput;

  useEffect(() => {
     onChange(maskedValue, value, valueInCents);
  }, [value, valueInCents, maskedValue, onChange])

  const onBlur = useCallback(() => {
    _onBlur()
  }, [_onBlur, value, valueInCents, maskedValue]);
  return <input {...props} onSelect={currencyInput.onSelect} value={currencyInput.maskedValue} onChange={currencyInput.onChange} ref={inputRef} onBlur={onBlur}/>;
};

I18nCurrencyInput.defaultProps = {
  value: 0,
  locale: 'en-us',
  currency: 'USD',
  currencyDisplay: 'symbol',
  useGrouping: true,
  type: 'text',
  onChange: (maskedValue: string, value: number, valueInCents:number) => { /** no-op */ },
  onBlur: () => { /** no-op */}

}

export default I18nCurrencyInput;