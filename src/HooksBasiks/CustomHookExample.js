import React, {useState} from "react";

const useYearCounter = (initialValue = 0, valueCount = 1) => {
    const [state, setState] = useState(initialValue);

    const inc = () => {
        setState(prewValue => prewValue + valueCount);
    }

    const dec = () => {
        setState(prewValue => prewValue - valueCount);
    }

    return [state, inc, dec]
}

const YearCounter = ({initialValue}) => {

    const [count, inc, dec] = useYearCounter(initialValue, 1)

    return (
        <div>
            <p>Year Counter</p><br/>
            <button onClick={inc}>{'>>'}</button><br />
            <span>{count}</span><br />
            <button onClick={dec}>{'<<'}</button>
        </div>
    )
}

const YearCounterTen = ({initialValue}) => {

    const [count, inc] = useYearCounter(initialValue, 10)

    return (
        <div>
            <p>Year Counter Ten</p><br/>
            <button onClick={inc}>{'>>'}</button><br />
            <span>{count}</span><br />
        </div>
    )
}

export const CustomHookExample = () => {
    return (
        <>
            <YearCounter initialValue={1970} />
            <YearCounterTen initialValue={1970} />
        </>
    )
}