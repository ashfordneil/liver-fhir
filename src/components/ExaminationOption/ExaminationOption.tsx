import React from 'react';
import { useDispatch } from 'react-redux';
import css from './ExaminationOption.module.css';
import { SpendPoints, SelectExamination } from '../../store/actions';
import { ExaminationId } from '../../store/state';

export interface ExaminationOptionProps {
  text: string;
  disabled?: true;
  examinationId: ExaminationId;
}

// A possible examination that a user can select
const ExaminationOption: React.FC<ExaminationOptionProps> = (props) => {
  const dispatch = useDispatch();
  return (
    <button
      disabled={props.disabled}
      className={css.ExaminationOption}
      onClick={() => {
        const event = SelectExamination(props.examinationId);
        dispatch(event);
      }}
    >{props.text}</button>
  )
};

export default ExaminationOption;
