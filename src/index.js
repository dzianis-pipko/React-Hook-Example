import React from 'react';
import ReactDOM from 'react-dom';
import {HelloWorld} from './HelloWorld';
import {UseStateHook} from './UseStateHook';
import {FormExample} from './FormExample';
import {CustomHookExample} from './CustomHookExample';

const RED = 'red';

ReactDOM.render(
  <>
    <HelloWorld color={RED} />
    <UseStateHook/>
    <FormExample />
    <CustomHookExample />
  </>,
  document.getElementById('root')
);

// ReactDOM.render(React.createElement(HelloWorld, {color: RED}),
//   document.getElementById('root')
// );
