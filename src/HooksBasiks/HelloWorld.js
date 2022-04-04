const Lable = ({children}) => {
    const color = 'red';
    return(
        <div style={{color: color}} >{children}</div>
    )
}

const RED = 'red';

export const HelloWorld = () => {

    const styles = {
        color: RED === 'red' ? 'green': 'red',
    }

    return(
        <div style={styles}>
            <span>Hello World!</span>
            <Lable>Hello </Lable>
        </div>
    )
}