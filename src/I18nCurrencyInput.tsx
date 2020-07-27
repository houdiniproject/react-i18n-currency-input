// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/src/index.js

import * as React from 'react'
import useI18nCurrencyInput from './useI18nCurrencyInput';
import { useEffect, useCallback } from 'react';
import { I18nCurrencyInputProps } from './types';


const I18nCurrencyInput = React.forwardRef((props:I18nCurrencyInputProps, ref:any) =>  {
  
  const {onChange, onBlur:_onBlur} = props;
  const currencyInput = useI18nCurrencyInput({inputRef:ref, ...props});
  
  const {value, valueInCents, maskedValue} = currencyInput;

  useEffect(() => {
     onChange(maskedValue, value, valueInCents);
  }, [value, valueInCents, maskedValue, onChange])

  const onBlur = useCallback(() => {
    _onBlur()
  }, [_onBlur, value, valueInCents, maskedValue]);
  return <input {...props} onSelect={currencyInput.onSelect} value={currencyInput.maskedValue} onChange={currencyInput.onChange} ref={ref} onBlur={onBlur}/>
});

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