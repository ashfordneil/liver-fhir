import React from 'react';
import css from './Person.module.css';

// Render a clickable person
const Person: React.FC = (props) => {
  return (
    <svg viewBox="0 0 5 10" className={css.Main} >
      <circle cx="2.5" cy="1.2" r="1.2" />
      <rect x="1" y="3" height="5" width="3" />
    </svg>
  );
};

export default Person;
