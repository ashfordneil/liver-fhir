import {BodyPart, Examination, ExaminationId} from './state';

export const SELECT_BODY_PART = 'SELECT_BODY_PART';
export const SelectBodyPart = (part: BodyPart) => ({
  type: SELECT_BODY_PART as typeof SELECT_BODY_PART,
  part,
});

export const SPEND_POINTS = 'SPEND_POINTS';
export const SpendPoints = (moneySpent: number, timePassed: number) => ({
  type: SPEND_POINTS as typeof SPEND_POINTS,
  moneySpent,
  timePassed,
});

export const SELECT_METHOD = 'SELECT_METHOD';
export const SelectMethod = (method: string) => ({
  type: SELECT_METHOD as typeof SELECT_METHOD,
  method
});

export const INIT_EXAMINATIONS = 'INIT_EXAMINATIONS';
export const InitExaminations = (
    examinations: {[key in BodyPart]: {[key: string]: Examination}},
    ) => ({
  type: INIT_EXAMINATIONS as typeof INIT_EXAMINATIONS,
  examinations,
});

type Action =
  | ReturnType<typeof SelectBodyPart>
  | ReturnType<typeof SpendPoints>
  | ReturnType<typeof SelectMethod>
  | ReturnType<typeof InitExaminations>
  ;

export default Action;
