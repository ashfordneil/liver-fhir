import React from 'react';
import FHIR from 'fhirclient';
import { useDispatch, useSelector } from 'react-redux';
import css from './ExaminationOption.module.css';
import { SpendPoints, SelectMethod } from '../../store/actions';
import formatDuration from '../../util/formatDuration';
import State from '../../store/state';

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
  const state: State = useSelector(state => state) as State;
  return (
    <button
      disabled={props.disabled}
      className={css.ExaminationOption}
      onClick={async () => {
        FHIR.oauth2.ready().then(client => {
          const observationIds = state.examinations[state.body][props.method].results.map(r => r.id);
          const observations = observationIds.map(oid => state.observations[oid]);
          return Promise.all(observations.map(o => ({
            ...o.resource,
            subject: {
              reference: `Patient/${client.patient.id}`
            },
            id: undefined,
            meta: undefined,
            request: {method: "POST"}
          })).map(o => client.create(o)));
        });
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
