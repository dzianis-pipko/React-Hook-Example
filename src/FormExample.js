// Стейт в отдельных обьектах

// import React, {useState} from "react";

// const FormInput = (props) => {
//     const {name, label, value, onChange, type = 'text'} = props
//     return(
//         <div>
//             <label htmlFor={name}>{label}</label>
//             <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
//         </div>
//     )
// }

// const DEFAULT_VALUE = 21;

// export const FormExample = () => {

//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [age, setAge] = useState(DEFAULT_VALUE);

//     const clear = () => {
//         setFirstName('');
//         setLastName('');
//         setAge(DEFAULT_VALUE);
//     }

//     return (
//         <>
//             <form>
//                 <FormInput
//                     name='firstName'
//                     label='first name'
//                     value={firstName}
//                     onChange={newValue => setFirstName(newValue)}
//                 />
//                 <FormInput
//                     name='lastName'
//                     label='last name'
//                     value={lastName}
//                     onChange={newValue => setLastName(newValue)}
//                 />
//                 <FormInput
//                     name='age'
//                     label='age'
//                     value={age}
//                     onChange={newValue => setAge(newValue ? parseInt(newValue) : 0)}
//                     type='number'
//                 />
//             </form>
//             <div>
//                 <button onClick={clear}>clear</button>
//             </div>
//             <div>
//                 first Name: {firstName}; <br/>
//                 last Name: {lastName}; <br/> 
//                 age: {age};
//             </div>
//         </>
//     )
// }

// =========================================================================

// Классовый стейт

// import React from "react";

// const FormInput = (props) => {
//     const {name, label, value, onChange, type = 'text'} = props
//     return(
//         <div>
//             <label htmlFor={name}>{label}</label>
//             <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
//         </div>
//     )
// }

// const DEFAULT_VALUE = 21;

// const initialState = {
//     firstName: '',
//     lastName: '',
//     age: DEFAULT_VALUE
// }

// export class FormExample extends React.Component {

//     constructor(props){
//         super(props);
//         this.state = initialState;
//     }


//     clearState = () => {
//         this.setState(initialState);
//     }

//     render() {
//         return (
//             <>
//                 <form>
//                     <FormInput
//                         name='firstName'
//                         label='first name'
//                         value={this.state.firstName}
//                         onChange={firstName => this.setState({firstName})}
//                     />
//                     <FormInput
//                         name='lastName'
//                         label='last name'
//                         value={this.state.lastName}
//                         onChange={lastName => this.setState({lastName})}
//                     />
//                     <FormInput
//                         name='age'
//                         label='age'
//                         value={this.state.age}
//                         onChange={ageString => {
//                             const age = ageString ? parseInt(ageString) : 0
//                             this.setState({age});
//                         }}
//                         type='number'
//                     />
//                 </form>
//                 <div>
//                     <button onClick={this.clearState}>clear</button>
//                 </div>
//                 <div>
//                     first Name: {this.state.firstName}; <br/>
//                     last Name: {this.state.lastName}; <br/> 
//                     age: {this.state.age};
//                 </div>
//             </>
//         )
//     }
// }

// =========================================

// Стейт в одном обьекте

// import React, {useState} from "react";

// const FormInput = (props) => {
//     const {name, label, value, onChange, type = 'text'} = props
//     return(
//         <div>
//             <label htmlFor={name}>{label}</label>
//             <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
//         </div>
//     )
// }

// const DEFAULT_VALUE = 21;

// const initialState = {
//     firstName: '',
//     lastName: '',
//     age: DEFAULT_VALUE
// }

// export const FormExample = () => {

//     const [state, setState] = useState(initialState);

//     const clear = () => {
//         setState(initialState);
//     }

//     return (
//         <>
//             <form>
//                 <FormInput
//                     name='firstName'
//                     label='first name'
//                     value={state.firstName}
//                     onChange={newValue => setState(prewValue => {
//                         return {
//                             ...prewValue,
//                             firstName: newValue,
//                         }
//                     })}
//                 />
//                 <FormInput
//                     name='lastName'
//                     label='last name'
//                     value={state.lastName}
//                     onChange={newValue => setState(prewValue => {
//                         return {
//                             ...prewValue,
//                             lastName: newValue,
//                         }
//                     })}
//                 />
//                 <FormInput
//                     name='age'
//                     label='age'
//                     value={state.age}
//                     onChange={newValue => setState(prewValue => {
//                         return {
//                             ...prewValue,
//                             age: newValue ? parseInt(newValue) : 0,
//                         }
//                     })}
//                     type='number'
//                 />
//             </form>
//             <div>
//                 <button onClick={clear}>clear</button>
//             </div>
//             <div>
//                 {/* first Name: {state.firstName}; <br/>
//                 last Name: {state.lastName}; <br/> 
//                 age: {state.age}; */}
//                 {JSON.stringify(state)}
//             </div>
//         </>
//     )
// }

// ==================================

// Стейт в одном обьекте c кастомным хуком.

import React, {useState} from "react";

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

const FormInput = (props) => {
    const {name, label, value, onChange, type = 'text'} = props
    return(
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

const DEFAULT_VALUE = 21;

const initialState = {
    firstName: '',
    lastName: '',
    age: DEFAULT_VALUE
}

export const FormExample = () => {

    const [state, setState] = useMeargeValue(initialState);

    const clear = () => {
        setState(initialState);
    }

    return (
        <>
            <form>
                <FormInput
                    name='firstName'
                    label='first name'
                    value={state.firstName}
                    onChange={firstName => setState({firstName})}
                />
                <FormInput
                    name='lastName'
                    label='last name'
                    value={state.lastName}
                    onChange={lastName => setState({lastName})}
                />
                <FormInput
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
                {/* first Name: {state.firstName}; <br/>
                last Name: {state.lastName}; <br/> 
                age: {state.age}; */}
                {JSON.stringify(state)}
            </div>
        </>
    )
}
