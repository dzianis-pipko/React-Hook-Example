import React, {useCallback, useEffect, useRef, useState} from "react";
import { useCounter } from "./CountUseEffect";

const useUpdateEffect = (rerender) => {
    const firstRender = useRef(true);

    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false;
        }else{
            rerender()
        }
    }, [rerender]);

    // const [state, setState] = useState(true);

    // useEffect(() => {
    //     if(state){
    //         setState(false);
    //     }else{
    //         rerender()
    //     }
    // },[rerender, state])
    
}

export const UseRef = () => {

    const refContainer = useRef();
    const toggledRef = useRef(false);
    const [toggledState, setToggledState] = useState(false);

    const onClick = () => {
        refContainer.current?.focus();
    }

    const onChange = (event) => {
        const text = event.target.value;
        if(text === 'blur'){
            refContainer.current?.blur();
        }
    }

    const changeRef = () => {
        toggledRef.current = !toggledRef.current;
        console.log(`Toggle REF: ${toggledRef.current}`);
    }

    const changeState = () => {
        setToggledState(prev => !prev);
        console.log(`Toggle STATE: ${toggledState}`);
    }

    console.log(`Toggle REF: ${toggledRef.current}; Toggle STATE: ${toggledState}`);

    const [count, inc] = useCounter(0, 1);

    useEffect(() => {
        console.log('mount');
    }, []);

    console.log(`render ---- ${count}`);

    const rerender = useCallback(()=> {
        console.log(`RERENDER - ${count}`);
    }, [count])

    useUpdateEffect(rerender);

    return (
        <div>
            <div>
                <input onChange={onChange} ref={refContainer} />
            </div>
            <div>
                <button onClick={onClick}>FOCUS</button>
            </div>
            <div>
                <button onClick={changeRef}>TOGGLE REF</button>
                <button onClick={changeState}>TOGGLR STATE</button>
            </div>
            <div>
                <button onClick={inc}>RERENDER</button>
            </div>
        </div>
    )
}