import React from 'react';
import { useDispatch } from 'react-redux';
import css from './ExaminationOption.module.css';
import { SpendPoints } from '../../store/actions';

export interface ExaminationOptionProps {
  text: string;
  disabled?: true;
  moneySpent: number;
  timePassed: number;
}

// A possible examination that a user can select
const ExaminationOption: React.FC<ExaminationOptionProps> = (props) => {
  const dispatch = useDispatch();
  return (
    <button
      disabled={props.disabled}
      className={css.ExaminationOption}
      onClick={() => {
        const event = SpendPoints(props.moneySpent, props.timePassed);
        dispatch(event);
      }}
    >{props.text}</button>
  )
};

export default ExaminationOption;
