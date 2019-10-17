import React from 'react';
import { useDispatch } from 'react-redux';
import css from './ExaminationOption.module.css';
import { SpendPoints, SelectMethod } from '../../store/actions';
import { ExaminationId } from '../../store/state';
import formatDuration from '../../util/formatDuration';

export interface ExaminationOptionProps {
  text: string;
  disabled?: true;
  method: string,
  cost: {
    money: number;
    time: number;
  };
}

// A possible examination that a user can select
const ExaminationOption: React.FC<ExaminationOptionProps> = (props) => {
  const dispatch = useDispatch();
  return (
    <button
      disabled={props.disabled}
      className={css.ExaminationOption}
      onClick={() => {
        const event = SelectMethod(props.method);
        dispatch(event);
      }}
    >
      <h3 className={css.Text}>{props.text}</h3>
      <div className={css.Cost}>Time: {formatDuration(props.cost.time)}</div>
    </button>
  )
};

export default ExaminationOption;
