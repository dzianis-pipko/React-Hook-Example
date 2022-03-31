// Стейт в отдельных обьектах

import React, {useState} from "react";

const FormInput1 = (props) => {
    const {name, label, value, onChange, type = 'text'} = props
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

const DEFAULT_VALUE_1 = 21;

export const FormExample1 = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(DEFAULT_VALUE_1);

    const clear = () => {
        setFirstName('');
        setLastName('');
        setAge(DEFAULT_VALUE_1);
    }

    return (
        <>
            <form>
                <FormInput1
                    name='firstName'
                    label='first name'
                    value={firstName}
                    onChange={newValue => setFirstName(newValue)}
                />
                <FormInput1
                    name='lastName'
                    label='last name'
                    value={lastName}
                    onChange={newValue => setLastName(newValue)}
                />
                <FormInput1
                    name='age'
                    label='age'
                    value={age}
                    onChange={newValue => setAge(newValue ? parseInt(newValue) : 0)}
                    type='number'
                />
            </form>
            <div>
                <button onClick={clear}>clear</button>
            </div>
            <div>
                first Name: {firstName}; <br/>
                last Name: {lastName}; <br/> 
                age: {age};
            </div>
        </>
    )
}

// =========================================================================
// Классовый стейт

const FormInput2 = (props) => {
    const {name, label, value, onChange, type = 'text'} = props
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

const DEFAULT_VALUE_2 = 21;

const initialState = {
    firstName: '',
    lastName: '',
    age: DEFAULT_VALUE_2
}

export class FormExample2 extends React.Component {

    constructor(props){
        super(props);
        this.state = initialState;
    }


    clearState = () => {
        this.setState(initialState);
    }

    render() {
        return (
            <>
                <form>
                    <FormInput2
                        name='firstName'
                        label='first name'
                        value={this.state.firstName}
                        onChange={firstName => this.setState({firstName})}
                    />
                    <FormInput2
                        name='lastName'
                        label='last name'
                        value={this.state.lastName}
                        onChange={lastName => this.setState({lastName})}
                    />
                    <FormInput2
                        name='age'
                        label='age'
                        value={this.state.age}
                        onChange={ageString => {
                            const age = ageString ? parseInt(ageString) : 0
                            this.setState({age});
                        }}
                        type='number'
                    />
                </form>
                <div>
                    <button onClick={this.clearState}>clear</button>
                </div>
                <div>
                    first Name: {this.state.firstName}; <br/>
                    last Name: {this.state.lastName}; <br/> 
                    age: {this.state.age};
                </div>
            </>
        )
    }
}

// =========================================
// Стейт в одном обьекте

const FormInput3 = (props) => {
    const {name, label, value, onChange, type = 'text'} = props
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

const DEFAULT_VALUE_3 = 21;

const initialState3 = {
    firstName: '',
    lastName: '',
    age: DEFAULT_VALUE_3
}

export const FormExample3 = () => {

    const [state, setState] = useState(initialState3);

    const clear = () => {
        setState(initialState3);
    }

    return (
        <>
            <form>
                <FormInput3
                    name='firstName'
                    label='first name'
                    value={state.firstName}
                    onChange={newValue => setState(prewValue => {
                        return {
                            ...prewValue,
                            firstName: newValue,
                        }
                    })}
                />
                <FormInput3
                    name='lastName'
                    label='last name'
                    value={state.lastName}
                    onChange={newValue => setState(prewValue => {
                        return {
                            ...prewValue,
                            lastName: newValue,
                        }
                    })}
                />
                <FormInput3
                    name='age'
                    label='age'
                    value={state.age}
                    onChange={newValue => setState(prewValue => {
                        return {
                            ...prewValue,
                            age: newValue ? parseInt(newValue) : 0,
                        }
                    })}
                    type='number'
                />
            </form>
            <div>
                <button onClick={clear}>clear</button>
            </div>
            <div>
                {JSON.stringify(state)}
            </div>
        </>
    )
}

// ==================================
// Стейт в одном обьекте c кастомным хуком.

const useMeargeValue = (initialValue) => {

    const [state, setState] = useState(initialValue)
    const mergeValue = (propValue) => {
        setState(prewValue => {
            return{
                ...prewValue,
                ...propValue
            }
        } )
    }
    return [state, mergeValue];
}

const FormInput4 = (props) => {
    const {name, label, value, onChange, type = 'text'} = props
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

const DEFAULT_VALUE_4 = 21;

const initialState4 = {
    firstName: '',
    lastName: '',
    age: DEFAULT_VALUE_4
}

export const FormExample4 = () => {

    const [state, setState] = useMeargeValue(initialState4);

    const clear = () => {
        setState(initialState4);
    }

    return (
        <>
            <form>
                <FormInput4
                    name='firstName'
                    label='first name'
                    value={state.firstName}
                    onChange={firstName => setState({firstName})}
                />
                <FormInput4
                    name='lastName'
                    label='last name'
                    value={state.lastName}
                    onChange={lastName => setState({lastName})}
                />
                <FormInput4
                    name='age'
                    label='age'
                    value={state.age}
                    onChange={age => setState({age: age ? parseInt(age) : 0})}
                    type='number'
                />
            </form>
            <div>
                <button onClick={clear}>clear</button>
            </div>
            <div>
                {JSON.stringify(state)}
            </div>
        </>
    )
}
