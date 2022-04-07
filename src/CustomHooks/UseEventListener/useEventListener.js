import {useEffect, useRef } from "react";

// useEventListener - хук для подписки на глобальное событие.
export const useEventListener = (eventName, handler, element = window) => {

    // handler - чтобы не подписываться и отписываться каждый раз когда он меняется, мы будем хранить его в useRef.2
    const saveHandler = useRef();

    // При изменении Хендлера, мы будем складывать его в ref контейнер.
    useEffect(() => {
        saveHandler.current = handler;
    }, [handler]) // т.е. этот хук не будет расчитывать, что этот handler не будет меняться на каждый рендер.

    // useEffect - в котором мы подпишемся на изменения.
    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if(!isSupported){
            throw new Error('addEventListener is not supported by ' + element);
        }

        const eventListener = (event) => {
            if(saveHandler.current){
                saveHandler.current(event);
            }
        }

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        }

    }, [eventName, element])

}

