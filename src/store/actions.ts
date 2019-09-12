import { BodyPart } from './state';

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

type Action =
  | ReturnType<typeof SelectBodyPart>
  | ReturnType<typeof SpendPoints>
  ;

export default Action;
