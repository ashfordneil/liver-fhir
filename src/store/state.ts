export type BodyPart =
  | "Head"
  | "Eyes"
  | "Nose"
  | "Chest"
  | "Abdomen"
  | "Arms"
  | "Hands"
  | "Pelvis"
  | "Legs"
  | "Feet"
  | "Entire Body"
  ;

export interface Points {
  // dollars
  moneySpent: number;
  // seconds
  timePassed: number;
}

export interface Observation {
  text: string;
}

export type ExaminationId = string;
export interface Examination {
  name: string;
  cost: {
    money: number;
    time: number;
  };
  result: Observation;
  bodyPart: string;
  method: string;
}

interface State {
  body: BodyPart;
  points: Points;
  // A lookup of examination id to the examination
  examinations: {[key in ExaminationId]: Examination[]};
  // A list of completed examination ids, to be used to lookup the examinations
  completedExaminations: ExaminationId[];
  // A lookup of bodypart to possible examination ids
  examinationOptions: {[key in BodyPart]: ExaminationId[]};
}

export const defaultState: State = {
  body: "Entire Body",
  points: {
    moneySpent: 0,
    timePassed: 0,
  },
  examinations: {},
  completedExaminations: [],
  examinationOptions: {
    Head: [],
    Eyes: [],
    Nose: [],
    Chest: [],
    Abdomen: [],
    Arms: [],
    Hands: [],
    Pelvis: [],
    Legs: [],
    Feet: [],
    "Entire Body": [],
  },
};

export default State;
