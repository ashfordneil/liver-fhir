export type BodyPart =
  | "Head"
  | "Chest"
  | "Abdomen"
  ;

export interface Points {
  // dollars
  moneySpent: number;
  // seconds
  timePassed: number;
}

export interface Observations {
  text: string;
}

interface State {
  body: BodyPart;
  points: Points;
  observations: Observations[];
}

export const defaultState: State = {
  body: "Head",
  points: {
    moneySpent: 0,
    timePassed: 0,
  },
  observations: [],
};

export default State;
