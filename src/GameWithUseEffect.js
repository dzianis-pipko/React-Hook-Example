import React, { 
    useEffect, 
    // useLayoutEffect, 
    useMemo, 
    useState 
} from "react";

const usePositionController = (initialValue) => {
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);

    useEffect(() => {
        const handlKeyDown = (event) => {
            // eslint-disable-next-line default-case
            switch (event.key){
                case 'ArrowLeft': 
                    setLeft((prev)=> prev - initialValue);
                    break;
                case 'ArrowRight': 
                    setLeft((prev)=> prev + initialValue);
                    break;
                case 'ArrowUp': 
                    setTop((prev)=> prev - initialValue);
                    break;
                case 'ArrowDown': 
                    setTop((prev)=> prev + initialValue);
                    break;
            }

        }

        document.addEventListener('keydown', handlKeyDown);

        return () => {
            document.removeEventListener('keydown', handlKeyDown);
        }
    }, [initialValue])

    return [left, top]
}

const initiflStyle = {
    backgroundColor: '#F00',
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    left: 0,
    top: 0,
}

const generateDummies = (count) => {
    const dummies = [];
    for(let i = 0; i < count; i++){
        dummies.push(<div key={i}>i = {i}</div>);
    }
    return dummies;
}

export const GameWithUseEffect = () => {

    const [left, top] = usePositionController(50);
    // const [state, setState] = useState(initiflStyle);

    // useEffect(()=> {  // работает асинхронно
    //     setState((prev)=> {
    //         return {
    //             ...prev,
    //             left,
    //             top,
    //         }
    //     })
    // },[left, top])

    // useLayoutEffect(()=> {  // работает синхронно
    //     setState((prev)=> {
    //         return {
    //             ...prev,
    //             left,
    //             top,
    //         }
    //     })
    // },[left, top])

    const style = useMemo(() => {
        return {
            ...initiflStyle,
            left,
            top,
        }

    }, [left, top])

    return(
        <>
            <h2>
                [{left},{top}]
            </h2>
            <div style={style} />
            {generateDummies(10)}

        </>
    )
}
