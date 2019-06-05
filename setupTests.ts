// License: LGPL-3.0-or-later
// from: https://github.com/jsillitoe/react-currency-input/blob/master/test/setup.js
import * as jsdom from 'jsdom'

export default function setup(markup?:string){
    let globalAny = global as any
    globalAny.dom = new jsdom.JSDOM(markup ||'<!doctype html><html><body></body></html>');
    globalAny.window = globalAny.dom.window;
    globalAny.document = globalAny.window.document;
    globalAny.navigator = globalAny.window.navigator;
}