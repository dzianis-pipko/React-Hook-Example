import React from 'react';
import ReactDOM from 'react-dom';
import {HelloWorld} from './HelloWorld';
import {UseStateHook} from './UseStateHook';
import {FormExample} from './FormExample';
import {CustomHookExample} from './CustomHookExample';
import {LazyInitializationUseState} from './LazyInitializationUseState';
import {CountUseEffect} from './CountUseEffect';
import {GameWithUseEffect} from './GameWithUseEffect';

const RED = 'red';

ReactDOM.render(
  <>
    <GameWithUseEffect />
    <HelloWorld color={RED} />
    <UseStateHook/>
    <FormExample />
    <CustomHookExample />
    <LazyInitializationUseState />
    <CountUseEffect />
  </>,
  document.getElementById('root')
);

// ReactDOM.render(React.createElement(HelloWorld, {color: RED}),
//   document.getElementById('root')
// );
