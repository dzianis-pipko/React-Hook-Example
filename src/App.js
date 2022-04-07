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
    ChapterPinInput,
    Hoc,
    UseCallback,
    UseMemo,
} from './HooksBasiks';
import {UseToggle, EventListener} from './CustomHooks';

const content = {
    ch_1: {name: 'HelloWorld', component: HelloWorld},
    ch_2: {name: 'UseStateHook', component: UseStateHook},
    ch_3: {name: 'FormExample', component: FormExample},
    ch_4: {name: 'CustomHookExample', component: CustomHookExample},
    ch_5: {name: 'LazyInitializationUseState', component: LazyInitializationUseState},
    ch_6: {name: 'CountUseEffect', component: CountUseEffect},
    ch_7: {name: 'GameWithUseEffect', component: GameWithUseEffect},
    ch_8: {name: 'UseRef', component: UseRef},
    ch_9: {name: 'ChapterPinInput', component: ChapterPinInput},
    ch_10: {name: 'Hoc', component: Hoc},
    ch_11: {name: 'UseCallback', component: UseCallback},
    ch_12: {name: 'UseMemo', component: UseMemo},
    ch_13: {name: 'UseToggle', component: UseToggle},
    ch_14: {name: 'UseEventListener', component: EventListener},
}

export const App = () => {
    return (
        <MasterDetail content={content} />
    )
}