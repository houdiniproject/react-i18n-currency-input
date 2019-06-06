// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/examples/index.js

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import I18nCurrencyInput from '../src/index';
import { boundMethod } from 'autobind-decorator';


ReactDOM.render(<I18nCurrencyInput value={0.0}/>, document.getElementById('example0'));

ReactDOM.render(<I18nCurrencyInput currency={"EUR"} locale={"de-de"}/>, document.getElementById('example1'));

ReactDOM.render(<I18nCurrencyInput currency={"EUR"} locale={"de-de"} precision="0"/>, document.getElementById('example2'));

ReactDOM.render(<I18nCurrencyInput />, document.getElementById('example3'));

ReactDOM.render(<I18nCurrencyInput requireNegative={true}/>, document.getElementById('example4'));

ReactDOM.render(<I18nCurrencyInput value="1" allowNegative={true}/>, document.getElementById('example6'));

var onChangeEvent = function(event:any, mask:string, floatValue:number) {
  console.log(event)
  console.log(mask)
  console.log(floatValue)
}

ReactDOM.render(
  <I18nCurrencyInput onChange={onChangeEvent}/>,
  document.getElementById('example7')
);

ReactDOM.render(<I18nCurrencyInput  autoFocus={true}/>, document.getElementById('example8'));

class GetRefThing extends React.Component {
  sampleRef: React.RefObject<I18nCurrencyInput>;
  constructor(props: any){
    super(props)
    this.sampleRef = React.createRef()
  }
  
  @boundMethod
  exampleLog(){
    console.log(this.sampleRef.current.getMaskedValue());
  }

  render() {
    return <div>
      <I18nCurrencyInput ref={this.sampleRef} onChange={this.exampleLog}/>
    </div>
  }
  
}

ReactDOM.render(<GetRefThing/>, document.getElementById('example9'))