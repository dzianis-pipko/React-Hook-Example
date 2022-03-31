const Lable = ({children}) => {
    const color = 'red';
    return(
        <div style={{color: color}} >{children}</div>
    )
}

export const HelloWorld = ({color}) => {

    const styles = {
        color: color === 'red' ? 'green': 'red',
    }

    return(
        <div style={styles}>
            <span>Hello World!</span>
            <Lable>Hello </Lable>
        </div>
    )
}