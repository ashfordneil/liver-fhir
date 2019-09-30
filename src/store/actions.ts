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

export const SELECT_EXAMINATION = 'SELECT_EXAMINATION';
export const SelectExamination = (examination: ExaminationId) => ({
  type: SELECT_EXAMINATION as typeof SELECT_EXAMINATION,
  examination
});

export const INIT_EXAMINATIONS = 'INIT_EXAMINATIONS';
export const InitExaminations = (
    examinations: {[key in ExaminationId]: Examination}, examinationOptions: {[key in BodyPart]: ExaminationId[]}
    ) => ({
  type: INIT_EXAMINATIONS as typeof INIT_EXAMINATIONS,
  examinations,
  examinationOptions
});

type Action =
  | ReturnType<typeof SelectBodyPart>
  | ReturnType<typeof SpendPoints>
  | ReturnType<typeof SelectExamination>
  | ReturnType<typeof InitExaminations>
  ;

export default Action;
