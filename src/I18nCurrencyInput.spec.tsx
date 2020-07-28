// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/index.spec.js
import 'jest';
import * as React from 'react'
import {MoneyFormatHelper as ExportedHelper} from './index'
import {MoneyFormatHelper} from './money_format_helper'
import I18nCurrencyInput, { Types } from './index';
import { useCallback, useRef, useState } from 'react';
import { valuesIn } from 'lodash';
import { cleanup } from '@testing-library/react';
import { CurrencyInputTests } from './test';

const nbsp = " ";

interface WrapperValue{
  maskedValue?:string,
  value?: number,
  valueInCents?:number
}

function UpdateWrapper(props: Omit<Types.I18nCurrencyInputProps, 'onChange'>) {
  const [values, setValues] = useState<WrapperValue>({})
  const onChange = useCallback((maskedValue:string, value:number, valueInCents: number) => {
    setValues({maskedValue, value, valueInCents})
  }, [setValues]);

  return <div>
    <p data-testid="value">{values.value}</p>
    <p data-testid="valueInCents">{values.valueInCents}</p>
    <p data-testid="maskedValue">{values.maskedValue}</p>
    <I18nCurrencyInput data-testid="input"{...props} onChange={onChange}/>
  </div>
}

describe('I18nCurrencyInput', function () {
  afterEach(cleanup);
  CurrencyInputTests(UpdateWrapper)
});
// class UpdateWrapper extends React.Component<UWInputProps, UWState> {
//   constructor(props: UWInputProps) {
//     super(props)
//     this.state = { value: props.initialValue }
//   }

//   render() {
//     return this.props.render(this.state);
//   }
// }

// describe('react-intl-currency-input', function () {
//   let renderedComponent: any, inputComponent: any
//   beforeEach(() => {
//     setup();
//   })
//   describe('default arguments', function () {
//     let renderedComponent: any, inputComponent: any
//     beforeEach(function () {
//       renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput />
//       );

//       inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent as any,
//         'input'
//       );
//     });

//     it('<CurrencyInput> should have masked value of "0.00"', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00')
//     });


//     it('<input> should be of type "text"', function () {
//       expect(inputComponent.getAttribute('type')).toBe('text')
//     });

//     // it('does not auto-focus by default', function () {
//     //   expect(this.renderedComponent.props.autoFocus).to.be.false
//     // });
//   });

//   describe('custom arguments', function () {

//     beforeEach(function () {
//       renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput
//           value="123456789"
//           inputType="tel"
//           id="currencyInput" />
//       );

//       inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent,
//         'input'
//       );
//     });

//     it('<CurrencyInput> should have masked value of "123.456,789"', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//     });

//     it('<input> should be of type "tel"', function () {
//       expect(inputComponent.getAttribute('type')).toBe('tel')
//     });
//   });


//   describe('properly convert number value props into display values', function () {

//     it('adds decimals to whole numbers to match precision', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={123456789} />
//       ) as any
//       expect(renderedComponent.getMaskedValue()).toBe('$123,456,789.00')
//     });

//     it('Does not change value when precision matches', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={1234567.89} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//     });


//     it('Rounds down properly when an number with extra decimals is passed in', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={1234567.89123} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//     });


//     it('Rounds up properly when an number with extra decimals is passed in', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={1234567.89999} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.90')
//     });

//     it('it handles initial value as the integer 0,', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={0} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00')
//     });

//     it('it handles initial value as the float 0.00,', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={0.00} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00')
//     });
//   });


//   describe('properly convert string value props into display values', function () {

//     it('adds decimals to whole numbers to match precision', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="6300.00" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$6,300.00')
//     });


//     it('Does not change value when precision matches', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="1234567.89" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//     });


//     it('Rounds down properly when an number with extra decimals is passed in', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={1234567.89123} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//     });


//     it('Rounds up properly when an number with extra decimals is passed in', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={1234567.89999} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.90')
//     });


//     it('Rounds up the whole number when an number with extra decimals is passed in', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput currency="JPY" value={1234567.999} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('¥1,234,568')
//     });


//     it('Handles strings with separators', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="1,000.01" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,000.01')
//     });


//     it('Handles strings with prefixes', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="$10.01" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$10.01')
//     });

//     it('Handles strings with suffixes', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="10.01 EUR" locale="de-de" currency="EUR" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe(`10,01${nbsp}€`)
//     });


//     it('Handles strings with custom separators', function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="123.456.789,12" locale="de-de" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe(`123.456.789,12${nbsp}$`)
//     });


//     it("Handles 1,234,567.89 format", function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="1,234,567.89" />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//     });

//     it("Handles 1.234.567,89 format", function () {
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value="1.234.567,89" locale='de-de' />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe(`1.234.567,89${nbsp}$`)
//     });
//   });

//   describe('change events', function () {
//     let handleChange: any
//     beforeEach(function () {
//       handleChange = jest.fn()

//       renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput onChange={handleChange} value="0" />
//       );

//       inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent,
//         'input'
//       );
//     });

//     it('should call onChange', function () {
//       let inputComponent = renderedComponent.inputRef.current
//       inputComponent.value = 123456789;
//       ReactTestUtils.Simulate.change(inputComponent);
//       expect(handleChange).toBeCalledWith(renderedComponent, "$1,234,567.89", 1234567.89, 123456789);
//     });


//     it('should change the masked value', function () {
//       inputComponent.value = 123456789;
//       ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe("$1,234,567.89");
//     });


//     it('should change the component value', function () {
//       inputComponent.value = 123456789;
//       ReactTestUtils.Simulate.change(inputComponent);
//       expect(inputComponent.value).toBe("$1,234,567.89");
//     });

//     it('should change the input value properly when a single number is added', () => {
//       inputComponent.value = "5"
//       ReactTestUtils.Simulate.change(inputComponent);
//       expect(inputComponent.value).toBe("$0.05");
//     })

//     it('should change the input value properly when two numbers added', () => {
//       inputComponent.value = "55"
//       ReactTestUtils.Simulate.change(inputComponent);
//       expect(inputComponent.value).toBe("$0.55");
//     })

//     it('runs change on an initial value masking', function () {
//       let change = jest.fn()
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={1234567.89} onChange={change} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//       expect(change).toBeCalledWith(renderedComponent, '$1,234,567.89', 1234567.89, 123456789)
//     });

//     it('runs a change even when masking is unneeded', function () {
//       let change = jest.fn()
//       var renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput value={"$1,234,567.89"} onChange={change} />
//       ) as any;
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234,567.89')
//       expect(change).toBeCalledWith(renderedComponent, '$1,234,567.89', 1234567.89, 123456789)
//     });

//     it('runs a change if the value property is changed and a correction is needed', function () {
//       let change = jest.fn()
//       let i18nRef = React.createRef<I18nCurrencyInput>()

//       var renderedComponent = ReactTestUtils.renderIntoDocument(<UpdateWrapper initialValue={"$1,234,567.89"} render={(outerState) => {
//         return <I18nCurrencyInput ref={i18nRef} value={outerState.value} onChange={change} />
//       }} />
//       ) as any as UpdateWrapper;
//       change.mockClear()
//       renderedComponent.setState({value:2})
      
//       expect(i18nRef.current.getMaskedValue()).toBe('$2.00')
//       expect(change).toBeCalledWith(i18nRef.current, '$2.00', 2, 200)
//     });


//     it('doesnt run a change if the value prop is set to the previous value', function () {
//       let change = jest.fn()
//       let i18nRef = React.createRef<I18nCurrencyInput>()


//       var renderedComponent = ReactTestUtils.renderIntoDocument(<UpdateWrapper initialValue={"$1,234,567.89"} render={(outerState) => {
//         return <I18nCurrencyInput ref={i18nRef} value={outerState.value} onChange={change} />
//       }} />
//       ) as any as UpdateWrapper;
//       change.mockClear()
//       renderedComponent.setState({value:'$1,234,567.89'})
      
//       expect(i18nRef.current.getMaskedValue()).toBe('$1,234,567.89')
//       expect(change).not.toBeCalled()
//     });
//   });

//   describe('blur events', () => {
//     let handleBlur: any
//     beforeEach(function () {
//       handleBlur = jest.fn()

//       renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput onBlur={handleBlur} value="0" />
//       );

//       inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent,
//         'input'
//       );
//     });

//     it('calls blur when the input is blurred', () => {
//       ReactTestUtils.Simulate.focus(inputComponent)
//       expect(handleBlur).not.toBeCalled()
//       ReactTestUtils.Simulate.blur(inputComponent)
//       expect(handleBlur).toBeCalledWith(renderedComponent)
//     })
//   })


//   describe('negative numbers', function () {
//     let handleChange
//     beforeEach(function () {
//       handleChange = jest.fn()
//       renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput onChange={handleChange} value="0"/>
//       );

//       inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent,
//         'input'
//       );

//       inputComponent.value = "0";
//       ReactTestUtils.Simulate.change(inputComponent);
//     });

//     it('should render 0 without negative sign', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "-0"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//     });

//     it('should render number with no or even number of "-" as positive', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "--123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123--456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123456--"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "--123--456--"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123456----"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//     });

//     it('should render number with odd number of "-" as negative', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "-123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('-$1,234.56');
//       inputComponent.value = "123-456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('-$1,234.56');
//       inputComponent.value = "123456-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('-$1,234.56');
//       inputComponent.value = "-123-456-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('-$1,234.56');
//     });

//     it('should correctly change between negative and positive numbers', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "1,234.56-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('-$1,234.56');
//       inputComponent.value = "-1,234.56-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "1-,234.56"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('-$1,234.56');
//       inputComponent.value = "-1,234.-56"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//     });



//   });

//   describe('requirePositive true', () => {
//     let handleChange
//     beforeEach(function () {
//       handleChange = jest.fn()
//       renderedComponent = ReactTestUtils.renderIntoDocument(
//         <I18nCurrencyInput onChange={handleChange} value="0" requirePositive={true} />
//       );

//       inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent,
//         'input'
//       );

//       inputComponent.value = "0";
//       ReactTestUtils.Simulate.change(inputComponent);
//     });

//     it('should render 0 without negative sign', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "-0"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//     });

//     it('should render number with no or even number of "-" as positive', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "--123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123--456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123456--"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "--123--456--"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123456----"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//     });

//     it('should render number with odd number of "-" as negative', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "-123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123-456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "123456-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "-123-456-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//     });

//     it('should correctly change between negative and positive numbers', function () {
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//       inputComponent.value = "123456"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "1,234.56-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "-1,234.56-"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "1-,234.56"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//       inputComponent.value = "-1,234.-56"; ReactTestUtils.Simulate.change(inputComponent);
//       expect(renderedComponent.getMaskedValue()).toBe('$1,234.56');
//     });
//   })
//   describe('input selection', function () {
//     let defaultProps = {
//       onChange: () => { },
//       value: '0'
//     };
//     let divElem: any;
//     let renderComponent = function (props = {}) {
//       divElem = document.createElement('div');
//       document.body.appendChild(divElem);

//       const componentProps = { ...defaultProps, ...props };

//       // we need tabIndex because jsdom won't focus a field without tabIndex
//       const renderedComponent = ReactDOM.render(
//         <I18nCurrencyInput {...componentProps} tabIndex="1" />,
//         divElem
//       ) as any;

//       const inputComponent = ReactTestUtils.findRenderedDOMComponentWithTag(
//         renderedComponent,
//         'input'
//       ) as HTMLInputElement;

//       inputComponent.value = "0";
//       ReactTestUtils.Simulate.change(inputComponent);
//       //we need to run the focus function because jsdom won't change the activeElement if we don't
//       inputComponent.focus()
//       return { renderedComponent, inputComponent };
//     };

//     afterEach(function () {
//       document.body.removeChild(divElem);
//     });

//     it('sanity - renders "$0.00"', function () {
//       const { renderedComponent } = renderComponent();
//       expect(renderedComponent.getMaskedValue()).toBe('$0.00');
//     });

//     it('should consider precision absence', function () {
//       const { inputComponent } = renderComponent({ currency: 'JPY' });

//       expect(inputComponent.selectionStart).toBe(0);
//       expect(inputComponent.selectionEnd).toBe(0);
//     });

//     it('should move the caret to the end when requireNegative AND value was blank', () => {
//       const { inputComponent } = renderComponent({ requireNegative: true })

//       inputComponent.value = "";
//       ReactTestUtils.Simulate.change(inputComponent);

//       inputComponent.value = "9"
//       ReactTestUtils.Simulate.change(inputComponent);

//       expect(inputComponent.value).toBe("-$0.09")

//       expect(inputComponent.selectionStart).toBe(6)
//       expect(inputComponent.selectionEnd).toBe(6)
//     })

//   });

//   it('exports MoneyFormatHelper properly', () => {
//     expect(MoneyFormatHelper).toBe(ExportedHelper)
//   })

// });
