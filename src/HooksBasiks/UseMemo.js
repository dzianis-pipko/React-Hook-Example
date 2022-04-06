import React, { useMemo, useState, useRef, memo } from 'react';

const palette = [
  '#FFAABB',
  '#AAFFBB',
  '#AACCBB',
  '#BBAABB',
  '#EEBBEE',
  '#EEBBAA',
  '#AAAAFF',
  '#FFAA99',
  '#99FF99',
  '#44FF44',
  '#11FFFF',
  '#DDFFFF',
];

function randomCssColor() {
  const index = Math.ceil(Math.random() * (palette.length - 1));
  return palette[index];
}

function Line({ width, left, top }) {
  const style = {
    position: 'absolute',
    left,
    top,
    width,
    height: '0px',
    border: '1px dashed #00000044',
  };
  return <div style={style} />;
}

// Но рендеры на все компоненты всеравно происходят, хоть мы и обернули style в useMemo.
// Потому что на кождый рендер, мы увеличиваем счетчик, и он хранится в useRef.
// Не смотря на то, что цвет дочерних элементов не меняется благодаря useMemo, но счетчик всеравно увеличивается.
// Чтобы изменить это поведение, нужно сообщить реакту, что компонент Node он оптимизирован,
// что не стоит его рендерить заново, если его пропсы или стейт не поменялись.
// Для этого нужно обернуть компонент Node в вызов React.memo.
// Так же вторым пораметром в React.memo можно передать функцию сравнения текущего и предыдущего состояний,
// если потребуется какя то спуцифическая логика сравнения.
const Node = memo(({ level = 1, cellWidth, cellHeight, maxLevel, left = 50, top = 50 }) => {
    const rendersCounter = useRef(0);
    const [borderColor, setBorderColor] = useState('black');
    const height = cellHeight * Math.pow(2, maxLevel - level);

    // Теперь ссылка на обьект style будет сохранена, и изменится только тогда,
    // когда из списка зависимостей что то поменялось.
    const style = useMemo(() => ({
        left,
        top,
        width: cellWidth,
        height,
        backgroundColor: randomCssColor(),
        position: 'absolute',
        border: `2px solid ${borderColor}`,
        borderRadius: 10,
        transition: 'all 500ms linear',
        zIndex: 100,
        color: 'black',
      }),
        [borderColor, cellWidth, height, left, top]
      );

    const onClick = (event) => {
      event.stopPropagation();
      setBorderColor(randomCssColor());
    };

    rendersCounter.current++;

    return (
      <div style={style} onClick={onClick}>
        {rendersCounter.current}
        {level < maxLevel ? (
          <>
            <Line left={cellWidth} top={height / 4} width={cellWidth} />
            <Node
              level={level + 1}
              maxLevel={maxLevel}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
              left={cellWidth * 2}
              top={0}
            />
            <Line left={cellWidth} top={(height * 3) / 4} width={cellWidth} />
            <Node
              level={level + 1}
              maxLevel={maxLevel}
              cellWidth={cellWidth}
              cellHeight={cellHeight}
              left={cellWidth * 2}
              top={height / 2}
            />
          </>
        ) : null}
      </div>
    );
  }
);

export default function UseMemo() {
//   return React.createElement(Node, {
//     maxLevel: 4,
//     cellWidth: 50,
//     cellHeight: 50,
//   });
  return <Node maxLevel={4} cellWidth={50} cellHeight={50} />;
}

/* 
* JSX - это можно так сказать как синтаксический сахар.
Транспаллер bable преобразует этот JSX в цепочку вызовов: React.createElement(Node, {...})

Под компонентом - мы подразумеваем тип, т е функцию или класс, содержащие инструкции для рендера.

React Elements - это примитивные строительные блоки из которых собираются snapshot текущего дерева элементов.
Эти элементы иммутабельны, и после создания нельзя изменить их атрибуты или потомков.
Это еще не элементы DOM. Они пока ничего общего с DOM не имеют, это легковестная абстракция из кторой React собирает в DOM.
Т.е. 
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );

    // <App />,  - этот JSX возвращает дерево React Elements. 
                Это все превращается в цепочку вызовов React.createElement.
                Создание таких элементов это очень быстрый процесс.
                И результат функции рендера - это новое дерево элементов, 
                которые потом сравниваются с предыдущими элементами.
                Этот роцесс называется согласованием 'reconciliation'.

                т е Реакт держит в уме свое представление о дереве элементов. 
                И сначало применяет все изменения к нему - это называется virtual DOM,
                а потом они применяются к реальному DOM. Этим занимается библиотека - ReactDOM.

    ReactDOM - занимается тем, что он переносит наше virtual DOM elements, 
    в этот div: document.getElementById('root').
    Эта команда означает создать дерево компонентов с корневым компонентом App в элементе DOM с id root.

    Билиотеку ReactDOM можно заменить на другую, которая интерпретирует дерево компонентов react совсем по другому.
    Именно так работает React Native. По Virtual DOM Реакта, создается дерево нативных виджетов на ios и android,
    причем обе версии используюу родные для каждой OS виджеты.

    React предоставляет декларативный api, так что нам не нужно беспокоиться о том, 
    какие изменения происходят при каждом обновлении. Это значительно упрощает написание приложений,
    но может быть не отчевидно как это реализованно в React.

    Рендеринг - это процесс, создания нового дерева элементов, который будет сравниваться с предыдущим.
*/