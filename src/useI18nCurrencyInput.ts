// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/src/index.js
import React, { useState, useRef, useCallback, useEffect } from 'react';
import usePrevious from './usePrevious';
import { MoneyFormatHelper} from './money_format_helper';
import { UseI18nCurrencyInputProps,  MaskedAndRawValues, UseI18nCurrencyInputResult } from './types';

type CreateMoneyFormatHelperInput = Pick<UseI18nCurrencyInputProps, 'locale'| 'currency'| 'currencyDisplay' | 'useGrouping' | 'requireSign'>;

function createMoneyFormatHelper(props: CreateMoneyFormatHelperInput): MoneyFormatHelper {
    const {requireSign, currency, currencyDisplay, useGrouping, locale} = props;

    return MoneyFormatHelper.initializeFromProps(locale, {
        style: "currency",
        currency,
        currencyDisplay,
        useGrouping
    },
        {requireSign});
}

function prepareProps(props: UseI18nCurrencyInputProps): MaskedAndRawValues {
    let initialValue = props.value;
    if (initialValue === null) {
        initialValue = props.allowEmpty ? null : '';
    }

    return createMoneyFormatHelper(props).mask(initialValue);

}

function setSelectionRangeSafely(node: HTMLInputElement, start: number, end: number) {
    if (document.activeElement === node) {
        node.setSelectionRange(start, end);
    }
}

const defaultProps:Partial<UseI18nCurrencyInputProps> = {  value: 0,
    locale: 'en-us',
    currency: 'USD',
    currencyDisplay: 'symbol',
    useGrouping: true
};


/**
 * A hook for creating your own I18nCurrencyInput-like component. 
 *
 * @export
 * @param {UseI18nCurrencyInputProps} props
 * @returns
 */
export default function useI18nCurrencyInput(props: UseI18nCurrencyInputProps) : UseI18nCurrencyInputResult {
    props = {...defaultProps,...props}
    const initialValues = prepareProps(props)
    const inputSelectionStart = useRef<number | null>(1);
    const inputSelectionEnd = useRef<number | null>(1);
    const [values, setValues] = useState<MaskedAndRawValues>(initialValues)
    const prevValues = usePrevious(values);
    const prevProps = usePrevious(props);

    const onSelect = useCallback((event:React.SyntheticEvent<HTMLInputElement, Event>) => {
        const element = event.target as HTMLInputElement;
        inputSelectionStart.current = element.selectionStart;
        inputSelectionEnd.current = element.selectionEnd;
    }, []);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let values = createMoneyFormatHelper(props).mask(event.target.value)
        event.persist()
        setValues(values)
    }, [props])

    const focusOrMouseUp = useCallback((event:{target: HTMLInputElement}) => {
        const inputElement = props.inputRef.current
        if (inputElement) {
            const formatHelper = createMoneyFormatHelper(props)
            const prefix = formatHelper.getPrefix()
            const suffix = formatHelper.getSuffix()
            //Whenever we receive focus check to see if the position is before the suffix, if not, move it.
            let selectionEnd = inputElement.value.length - suffix.length;
            let isNegative = (inputElement.value.match(/-/g) || []).length % 2 === 1;
            let selectionStart = prefix.length + (isNegative ? 1 : 0);
            props.selectAllOnFocus && event.target.setSelectionRange(selectionStart, selectionEnd);
            inputSelectionStart.current = selectionStart;
            inputSelectionEnd.current = selectionEnd;
        }
    }, [props])

    const onFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
        focusOrMouseUp(event);
    }, [focusOrMouseUp]);

    const onMouseUp = useCallback((event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        // I don't know why typescript is complaining here when it's not any
        focusOrMouseUp(event as any);
    }, [focusOrMouseUp])

    useEffect(() => {
        const inputElement = props.inputRef.current
        if (inputElement) {
            const formatHelper = createMoneyFormatHelper(props)
            const groupSeparator = formatHelper.getGroupSeparator();
            const decimalSeparator = formatHelper.getDecimalSeparator();
            const prefix = formatHelper.getPrefix()
            const suffix = formatHelper.getSuffix()

            let node = inputElement
            let isNegative = (inputElement.value.match(/-/g) || []).length % 2 === 1;
            let minPos = prefix.length + (isNegative ? 1 : 0);
            let selectionEnd = Math.max(minPos, Math.min(inputSelectionEnd.current || 0, inputElement.value.length - suffix.length));
            let selectionStart = Math.max(minPos, Math.min(inputSelectionEnd.current || 0, selectionEnd));

            let regexEscapeRegex = /[-[\]{}()*+?.,\\^$|#\s]/g;
            let separatorsRegex = new RegExp(decimalSeparator.replace(regexEscapeRegex, '\\$&') + '|' + groupSeparator.replace(regexEscapeRegex, '\\$&'), 'g');
            let currSeparatorCount = (values.maskedValue.match(separatorsRegex) || []).length;
            let prevSeparatorCount = (prevValues && ( prevValues.maskedValue.match(separatorsRegex) || []) || []).length;
            let adjustment = Math.max(currSeparatorCount - prevSeparatorCount, 0);

            selectionEnd = selectionEnd + adjustment;
            selectionStart = selectionStart + adjustment;

            const precision = formatHelper.numberFormat.resolvedOptions().minimumFractionDigits || 0;

            let baselength = suffix.length
                + prefix.length
                + (precision > 0 ? decimalSeparator.length : 0) // if precision is 0 there will be no decimal part
                + precision
                + 1; // This is to account for the default '0' value that comes before the decimal separator

            if (values.maskedValue.length == baselength || ((prevValues &&prevValues.maskedValue && prevValues.maskedValue.length) || 0) < baselength) {
                // if we are already at base length, position the cursor at the end.
                selectionEnd = inputElement.value.length - suffix.length;
                selectionStart = selectionEnd;
            }

            setSelectionRangeSafely(node, selectionStart, selectionEnd);
            inputSelectionStart.current = selectionStart;
            inputSelectionEnd.current = selectionEnd;
        }
    }, [values, prevValues, props, prevProps]);

    useEffect(() => {
        setValues(prepareProps(props));
        
       
    }, [ props.value])

    return {...values, onChange, onFocus, onMouseUp, onSelect};
}