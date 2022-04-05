import React, { useState, useRef, forwardRef } from "react";
import PinInput from "./ChapterPinInput/PinInput";

// создаем HOC который будет выводить пропсы компонента в консоль на кождый рендер.
// HOC - функция, которая принимает на вход компонент, и возвр. ноый компонент, на основе входящего.

// logRender на вход получает WrappedComponent - компонент, который мы хотим обернуть.
const logRender = (WrappedComponent) => {
    // и вернет она новый компонент. т. е. это вункция, которую мы вернем - это функциональный компонент.
    return forwardRef((props, ref) => {
        // и будет он выводить в консоль на кождый рендер имя компонента, котроре мы вытащим из WrappedComponent.name .
        const name = WrappedComponent.name ?? WrappedComponent.render?.name;

        console.log(`render ${name}`);
        
        // и вернем WrappedComponent, и передадим в него все входяшие props.
        return <WrappedComponent ref={ref} {...props} />
    })
}

const SimpleText = ({text}) => {
    return (
        <span>{text}</span>
    )
}

const LoggedSimpleText = logRender(SimpleText);
const LoggedPinInput = logRender(PinInput);

export const Hoc = () => {
    const [digits, setDigits] = useState(['', '', '']);
    const reff = useRef();

    const focus = () => {
        reff.current?.focus();
    }
    return (
        <>
            <p>
                <LoggedSimpleText text='Some Text' />
            </p>
           
            <LoggedPinInput ref={reff} digits={digits} onChange={setDigits} />
            
            <p>
                <button onClick={focus}>FOCUS</button>
            </p>
        </>
    )
}