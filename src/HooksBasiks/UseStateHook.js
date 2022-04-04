import React, {useState} from "react";

export const UseStateHook = () => {

    const [click, setClick] = useState(0);
    const [showCountClick, setShowCountClick] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    console.log(firstName);
    console.log(lastName);

    const onClick = () => {
        
        setTimeout(() => {
            console.log(`set cliks ${click + 1}`);
            setClick((prevClick) => prevClick + 1)
        }, 2000);
        
    };
    const onClickShowCountClick = () => setShowCountClick((showCountClick) => !showCountClick);
    const visibleContent = showCountClick ? `(${click})` : '';
    const visibleContentBoolean = `(${showCountClick})`;

    const onChangeFirstName = (e) => {
        let onChangeFirstNameConst = e.target.value;
        setFirstName(onChangeFirstNameConst)
    }

    const onChangeLastName = (e) => {
        let onChangeLastNameConst = e.target.value;
        setLastName(onChangeLastNameConst)
    }

    return (
        <div>
            <button onClick={onClick}>onClick {visibleContent} </button>
            <button onClick={onClickShowCountClick}>onClickShowCountClick {visibleContentBoolean} </button>
            <form>
                <input onChange={onChangeFirstName} type="text" id="name1" name="FirstName" required />
                <input onChange={onChangeLastName} type="text" id="name2" name="LastName" required />
            </form>
            
                <div>
                    <div>FirstName : {firstName}</div>
                    <div>LastName : {lastName}</div>
                </div>
        </div>
    )
}