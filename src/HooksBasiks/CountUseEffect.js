import React, {useState, useEffect} from "react";

export const useCounter = (initialValue = 0, valueCount) => {
    const [state, setState] = useState(initialValue);

    const increment = () => {
        setState((prewValue) => prewValue + valueCount);
    }

    const decrement = () => {
        setState((prewValue) => prewValue - valueCount);
    }
    return [state, increment, decrement];
}

const updateClickCount = (clicksCount) => {
    return new Promise((resolve)=> {
        setTimeout(()=> {
            resolve({
                success: true,
                clicksCount,
            })
        },1000)
    })
}

export const CountUseEffect =() => {
    const [count, inc, dec] = useCounter(0, 1);

    useEffect(()=> {
        document.title = `Count - ${count}`;
    }, [count]);

    useEffect(() => {
        const update = async () => {
            const responce = await updateClickCount(count);
            console.log('responce', responce);
        }
        update();
    }, [count])

    // useEffect(() => {
    //     (async () => {
    //         const responce = await updateClickCount(count);
    //         console.log('responce', responce);
    //     })();
    // }, [count])

    useEffect(()=> {
        console.log(`running effect ${count}`); // 2) потом running

        return () => { 
            console.log(`cleaning up ${count}`); // 1) сперва cleaning
        }
    }, [count])

    useEffect(()=> {
        console.log('component did mount');

        return () => {
            console.log('component will unmount');
        }
    }, [])

    useEffect(() => {
        console.log('выполняется асинхронно, после кождого рендера'); // без зависимостей.
    })

    // если нам всеже необходимо использовать эффект синхронно, то нужно использовать useLayoutEffect

    return (
        <div>
            <p>Count- {count}</p>
            <button onClick={inc}>add count</button>
            <button onClick={dec}>dec count</button>
        </div>
    )
}