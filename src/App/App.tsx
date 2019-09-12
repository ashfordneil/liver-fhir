import React from 'react';
import logo from './logo.svg';
import css from './App.module.css';
import { useSelector } from '../store';

const App: React.FC = () => {
  const body = useSelector(state => state.body);
  return (
    <div className={css.App} >
      <header className={css.AppHeader} >
        <img src={logo} className={css.AppLogo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={css.AppLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {body}
        </a>
      </header>
    </div>
  );
}

export default App;
