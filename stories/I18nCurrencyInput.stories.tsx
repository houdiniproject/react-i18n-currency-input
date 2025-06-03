// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/examples/index.js

import React, {useRef, useState, useCallback} from 'react';
import { action } from 'storybook/actions';
import I18nCurrencyInput from '../src/I18nCurrencyInput';

export default { title: 'I18nCurrencyInput' };

function defaultParams() {
  return {
    onChange: action('on-change'),
    onBlur: action('on-blur'),
    onFocus: action('on-focus'),
  }
}

export function zeroAsNumber() {
  
  return <I18nCurrencyInput {...defaultParams()} value={0.0} />
}

export function eurDefaultInGermanLocale() {
  return <I18nCurrencyInput {...defaultParams()} currency={"EUR"} locale={"de-de"}/>
}

export function eurDefaultInGermanLocalePrecisionZero() {
  return <I18nCurrencyInput {...defaultParams()} currency={"EUR"} locale={"de-de"} maximumFractionDigits={0}/>
}

export function emptyInput() {
  return <I18nCurrencyInput {...defaultParams()}/>
}

export function requireNegative() {
  return <I18nCurrencyInput {...defaultParams()} requireSign={'negative'}/>
}

export function requirePositiveWithStringValue1() {
  return <I18nCurrencyInput {...defaultParams()} value="1" requireSign={'positive'}/>
}

export function passAutofocusProperly() {
  return <div>
    <p><input value={"no focus on load"}/></p>
    <p><I18nCurrencyInput {...defaultParams()} autoFocus={true}/></p>
  </div>
}

export function selectAllOnFocus() {
  return <div>
    <p><I18nCurrencyInput {...defaultParams()} selectAllOnFocus={true}/></p>
  </div>
}

export function selectAllOnFocusAsFalse() {
  return <div>
    <p><I18nCurrencyInput {...defaultParams()} selectAllOnFocus={false}/></p>
  </div>
}

export function passInputRefProperly() {
  const inputRef = useRef<HTMLInputElement|null>(null);

  const [input, setInput] = useState<String|null>(null)
  const onClick = useCallback(() => {
    if (inputRef.current)
      setInput(inputRef.current.value)
  }, [setInput])

  return <div>
    <p><input value={"no focus on load"}/></p>
    <p><I18nCurrencyInput {...defaultParams()} inputRef={inputRef}/></p>
    <button onClick={onClick}>Let's check what ref equals</button>
    <p>{input}</p>
  </div>
}