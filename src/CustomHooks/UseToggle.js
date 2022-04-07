import {
  //  useCallback, 
   useReducer, 
  //  useState 
  } from 'react';

function useToggle(initialValue) {
  // const [value, setValue] = useState(initialValue || false);

  // const toggle = useCallback(() => {
  //   setValue((prevValue) => !prevValue);
  // }, []);

  // return [value, toggle];

  // ========================================================================

  const reducer = (state) => !state;

  // useReducer принимает 2 параметра: функцию reducer и начальное значение.
  // Так же нам не нужно использовать useCallback, потому что dispatch ф-я которя возврощает редьюсер,
  // она и так сохраняет ссылку на протяжении жизни компонента.
  return useReducer(reducer, initialValue || false)

  // ========================================================================
  // ========================================================================
  // Можно и в одну строчку:

  // return useReducer((state) => !state, initialValue || false)

  // ========================================================================
}

function ToggleButton({ toggled, handleToggle }) {
  const caption = toggled ? 'ON' : 'OFF';
  return (
    <button style={{ width: 100 }} onClick={handleToggle}>
      {caption}
    </button>
  );
}

function SettingsToggle({ label, initialValue }) {
  const [isEnabled, toggleEnabled] = useToggle(initialValue);
  return (
    <div style={{ margin: 10 }}>
      <ToggleButton toggled={isEnabled} handleToggle={toggleEnabled} />
      <span style={{ marginLeft: 10 }}>{label}</span>
    </div>
  );
}

export function UseToggle() {
  return (
    <>
      <h2>Chapter 13: useToggle </h2>
      <SettingsToggle label="Audio Enabled" initialValue={true} />
      <SettingsToggle label="Video Enabled" initialValue={false} />
    </>
  );
}