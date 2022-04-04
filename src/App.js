import React from 'react';

import {MasterDetail} from './MasterDetail';

import {
    HelloWorld,
    UseStateHook,
    FormExample,
    CustomHookExample,
    LazyInitializationUseState,
    CountUseEffect,
    GameWithUseEffect, 
    UseRef,
} from './HooksBasiks';

const content = {
    ch_1: {name: 'Charter 1', component: HelloWorld},
    ch_2: {name: 'Charter 2', component: UseStateHook},
    ch_3: {name: 'Charter 3', component: FormExample},
    ch_4: {name: 'Charter 4', component: CustomHookExample},
    ch_5: {name: 'Charter 5', component: LazyInitializationUseState},
    ch_6: {name: 'Charter 6', component: CountUseEffect},
    ch_7: {name: 'Charter 7', component: GameWithUseEffect},
    ch_8: {name: 'Charter 8', component: UseRef},
}

export const App = () => {
    return (
        <MasterDetail content={content} />
    )
}