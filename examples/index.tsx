// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/examples/index.js

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import IntlCurrencyInput from '../src/index';
import { boundMethod } from 'autobind-decorator';


ReactDOM.render(<IntlCurrencyInput value={0.0}/>, document.getElementById('example0'));

ReactDOM.render(<IntlCurrencyInput currency={"EUR"} locale={"de-de"}/>, document.getElementById('example1'));

ReactDOM.render(<IntlCurrencyInput currency={"EUR"} locale={"de-de"} precision="0"/>, document.getElementById('example2'));

ReactDOM.render(<IntlCurrencyInput />, document.getElementById('example3'));

ReactDOM.render(<IntlCurrencyInput requireNegative={true}/>, document.getElementById('example4'));

ReactDOM.render(<IntlCurrencyInput value="1" allowNegative={true}/>, document.getElementById('example6'));

var onChangeEvent = function(event:any, mask:string, floatValue:number) {
  console.log(event)
  console.log(mask)
  console.log(floatValue)
}

ReactDOM.render(
  <IntlCurrencyInput onChange={onChangeEvent}/>,
  document.getElementById('example7')
);

ReactDOM.render(<IntlCurrencyInput  autoFocus={true}/>, document.getElementById('example8'));

class GetRefThing extends React.Component {
  sampleRef: React.RefObject<IntlCurrencyInput>;
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
      <IntlCurrencyInput ref={this.sampleRef} onChange={this.exampleLog}/>
    </div>
  }
  
}

ReactDOM.render(<GetRefThing/>, document.getElementById('example9'))


class GetRefThing2 extends React.Component {
  sampleRef: React.RefObject<IntlCurrencyInput>;
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
      <IntlCurrencyInput ref={this.sampleRef} onChange={this.exampleLog} value={200}/>
    </div>
  }
  
}