import React, {useCallback, useState, memo} from "react";

// React.memo - это онолог PureComponent. 
// В него можно передать компонент, который мы хотим мемоизировать.
// Так же опционально можно передать туда функцию кастомной логики сравнения двух состояний.

const Item = memo(({item, onClick}) => {
    const {name} = item;
    console.log(`render > ${name}`);
    return (
        <div onClick={() => onClick(item)}>
            {name}
        </div>
    )
})

function List({items}){
    const onItemClick = useCallback((item) => {
        console.log(`Clicked item with id ${item.id}`);
    }, []); // список зависимостей пустой, так что ссылка в переменной onItemClick всегда будет той же.

    const [, setTrigger] = useState();

    const rerender = () => {
        setTrigger({});
    }


    console.log('render list');
    return (
        <>
            <p>
                <button onClick={rerender}>RERENDER</button>
            </p>
            {items.map((item) => (
                <Item item={item} key={item.id} onClick={onItemClick} />
            ))}
        </>
    )
}

export const UseCallback = () => {

    const [title,] = useState('title');

    const onClick = useCallback(() => {
        console.log(`onclick ${title}`);
    }, [title]);

    // Работа за кулисами в useCallback
    // const collback = () => {
    //     console.log(`onclick ${title}`);
    // }

    // const onClick = useCallback(collback, [title])

    const items = [
        {id: 1, name: 'first' },
        {id: 2, name: 'second' },
        {id: 3, name: 'three' }
    ];


    return (
        <>
        <div>
            <button onClick={onClick}>Button</button>
        </div>
        <div>
            <List items={items} />
        </div>
        </>
    )
}