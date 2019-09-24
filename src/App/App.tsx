import React from 'react';
import logo from './logo.svg';
import css from './App.module.css';
import { useSelector } from '../store';
import Person from '../components/Person/Person';
import ExaminationView from '../components/ExaminationView/ExaminationView';
import DoneButton from '../components/DoneButton/DoneButton';
import PointsView from '../components/PointsView/PointsView';

const App: React.FC = () => {
  const body = useSelector(state => state.body);
  return (
    <div className={css.App}>
      <div className={css.PersonContainer}>
        <div className={css.InnerPersonContainer}>
          <Person></Person>
        </div>
      </div>
      <div className={css.ExaminationContainer}>
        <ExaminationView optionProps={[
          {text: "A", moneySpent: 5, timePassed: 12 },
          {text: "B", moneySpent: 10, timePassed: 3 }
        ]} findings="Lorem ipsum"></ExaminationView>
      </div>
      <div className={css.DoneButtonContainer}>
        <DoneButton onClick={() => null}></DoneButton>
      </div>
      <div className={css.PointsContainer}>
        <PointsView></PointsView>
      </div>
    </div>
  );
}

export default App;
