import React, { useImperativeHandle, useRef, forwardRef } from 'react';

const inputStyle = {
    width: 30,
    height: 30,
    fontSize: 20,
    textAlign: 'center',
    margun: 5,
};

const updateArray = (array, index, newValue) => {
    const copy = [...array];
    copy[index] = newValue;
    return copy;
}

// digits - массив строк, для каждой цифры будет отдельная трока.
// onChange  - cлушатель события.

// После обертывания PinInput в forwardRef, то в PinInput приходит 2 параметр ref. 
// ref обрабатывается отдельно от пропсов.
const PinInput = ({digits, onChange}, ref) => {
    // в useRef мы можем вложить целый массив инпутов. 
    // useRef возвращает нам контейнер и в него мы можем положить все что угодно.
    // в данном случае нам здесь удобно сразу же положить массив нужной длинны.
    const inputRefs = useRef(new Array(digits.length));

    const handleChange = (index, newValue) => {
        const oldDigit = digits[index];
        const newDigit = newValue.trim().replace(oldDigit, '');

        if(newDigit < '0' || newDigit > '9'){
            return;
        }

        onChange(updateArray(digits, index, newDigit));

        const inputs = inputRefs.current;
        if(index < inputs.length - 1){
            inputs[index + 1].focus();
        }else{
            inputs[index].blur();
        }
    }

    const handleKeyDown = (index, keyPress) => {
        if(keyPress !== 'Backspace'){
            return;
        };
        // если в digits[index] не пустая строка, тогда обновляем на ''.
        if(digits[index]){
            onChange(updateArray(digits, index, ''));
        } else if(index > 0){
            inputRefs.current[index - 1].focus();
        }
    }

    // useImperativeHandle возвращает обьект,
    // к которому будет обращаться родительский обьект при использовании ref.

    // первый параметр - ref;

    // второй параметр - function которая возвращает обьект с api, т.е. тут мы предоставим список методов,
    // которые будут доступны через обьект ref неружу.

    // третьим параметром - можно передать список зависимостей, принцип такой же как и с useEffect. 
    // Функция будет обновлена при изменении списка зависимоси.
    // В нашем случае мы его не используем. Ссылка на inputRef будет остоваться неизменной но протяжении всей жизни компонента.

    // useImperativeHandle работает только в связке с forwardRef.
    // После этого реакт передаст в этот компоенет ссылку на ref.
    // Теперь можно вызвать мерод focus из вне, в родительском компоненте.

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRefs.current[0].focus();
        },
    }))

    return (
        <div>
            {digits.map((digit, index) => (
                <input
                    key={index} 
                    style={inputStyle}
                    value={digit}
                    onChange={(event) => handleChange(index, event.target.value)}
                    onKeyDown={(event) => handleKeyDown(index, event.nativeEvent.key)}

                    // в атрибут ref можно передать не только ref контейнер который возвращает inputRefs,
                    // можно передать и коллбэк, поскольку тут в один ref мы будем складывать array, 
                    // то в данном случае это нам подпйдет.
                    ref={(ref) => {
                        inputRefs.current[index] = ref;
                    } }
                />
            ))}
        </div>
    )
}

export default forwardRef(PinInput);
