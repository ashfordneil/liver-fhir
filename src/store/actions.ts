import { BodyPart } from './state';

const SELECT_BODY_PART = 'SELECT_BODY_PART';
export class SelectBodyPart {
  type: typeof SELECT_BODY_PART = SELECT_BODY_PART;

  constructor(public part: BodyPart) {}
}

const SPEND_POINTS = 'SPEND_POINTS';
export class SpendPoints {
  type: typeof SPEND_POINTS = SPEND_POINTS;

  constructor(public moneySpend: number, public timePassed: number) {}
}

type Action =
  | SelectBodyPart
  | SpendPoints
  ;

export default Action;
