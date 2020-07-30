// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/src/index.js

import React, { useEffect, useCallback, useRef } from 'react'
import useI18nCurrencyInput from './useI18nCurrencyInput';
import { I18nCurrencyInputProps } from './types';

function I18nCurrencyInput(props:I18nCurrencyInputProps) {
  const internalRef = useRef();
  const inputRef = props.inputRef || internalRef;
  
  const {onChange, 
    onBlur:_onBlur, 
    onFocus:_onFocus, 
    onMouseUp:_onMouseUp, 
    onSelect:_onSelect,
    // the rest are just pulling out unused props
    useGrouping,
    locale,
    currency,
    currencyDisplay,
    selectAllOnFocus,
    minimumIntegerDigits, 
    minimumFractionDigits,
    maximumFractionDigits,
    minimumSignificantDigits,
    maximumSignificantDigits,
    allowEmpty, 
    ...passThruProps
  } = props;

  const currencyInput = useI18nCurrencyInput({inputRef, ...props});
  
  const {value, 
    valueInCents,
    maskedValue, 
    onFocus:_innerOnFocus,
    onMouseUp:_innerOnMouseUp,
    onSelect: _innerOnSelect,
  } = currencyInput;

  useEffect(() => {
     onChange(maskedValue, value, valueInCents);
  }, [value, valueInCents, maskedValue, onChange])


  const onFocus = useCallback((event:React.FocusEvent<HTMLInputElement>) => {
    _innerOnFocus(event);
    _onFocus && _onFocus(event);
  }, [_innerOnFocus, _onFocus] );

  const onMouseUp = useCallback((event:React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    _innerOnMouseUp(event as any)
    _onMouseUp && _onMouseUp(event)
  }, [_innerOnMouseUp, _onMouseUp])

  const onSelect = useCallback((event:React.SyntheticEvent<HTMLInputElement, Event>) => {
    _innerOnSelect(event);
    _onSelect && _onSelect(event)
  }, [_innerOnSelect, _onSelect])

  return <input {...passThruProps} 
    onSelect={onSelect} 
    value={currencyInput.maskedValue}
    onChange={currencyInput.onChange}
    onFocus={onFocus}
    onMouseUp={onMouseUp}
    ref={inputRef}
  />;
};

I18nCurrencyInput.defaultProps = {
  value: 0,
  locale: 'en-us',
  currency: 'USD',
  currencyDisplay: 'symbol',
  useGrouping: true,
  type: 'text',
  onChange: () => { /** no-op */ },
  onBlur: () => { /** no-op */}

}

export default I18nCurrencyInput;