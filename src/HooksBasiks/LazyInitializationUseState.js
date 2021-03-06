import React, {useState} from "react";

const someHeavyFunc = (maxNumber, maxPow) => {
    const data = [];
    for(let i = 0; i < maxNumber; i++){
        const record = {};
        for(let pow = 1; pow <= maxPow; pow++){
            record[pow] = Math.pow(i, pow);
        }
        data.push(record)
    }
    return data;
}

const Row = ({record}) => {
    return (
        <tr>
            {Object.values(record)
            .sort((a,b) => a - b)
            .map((value, i) => (
                <td key={i}>{value}</td>
            ))}
        </tr>
    )
}

const HeaderRow = ({maxPow}) => {
    const cells = [];
    for(let pow = 1; pow <= maxPow; pow++){
        cells.push(
            <th style={{minWidth: 100}} key={pow}>
                ^{pow}
            </th>
        )
    }
    return <tr>{cells}</tr>;
}

const MAX_NUMBER = 30;
const MAX_POW = 7;

export const LazyInitializationUseState = () => {
    const [data, setData] = useState(() => {
        console.log('useState initialisation');
        return someHeavyFunc(MAX_NUMBER, MAX_POW )
    })

    // Искусственный ререндер
    const [, setTrigger] = useState();
    const rerender = () => setTrigger({})

    // удаление первого элементо
    const removeFirst = () => {
        setData(prevValue => {
            const [, ...rest] = prevValue;
            return rest;
        })
    }

    console.log('Example has been rerendered');
    return (
        <>
            <p>
                <button onClick={removeFirst}>REMOVE FIRST</button>
                <button onClick={rerender}>RERENDER</button>
            </p>
            <table>
                <thead>
                    <HeaderRow maxPow={MAX_POW} />
                </thead>
                <tbody>
                    {data.map(record => (
                        <Row key={record['1']} record={record} />
                    ))}
                </tbody>
            </table>
        </>
    )
}