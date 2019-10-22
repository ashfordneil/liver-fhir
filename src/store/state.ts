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
  results: Observation[];
}

interface State {
  initialised: boolean;
  body: BodyPart;
  points: Points;
  // A lookup of body part -> method -> examination
  examinations: {
    [key in BodyPart]: {
      [key: string]: Examination
    }
  };
  // A lookup of body part -> [method, time done][]
  completedExaminations: {
    [key in BodyPart]: [string, number][]
  };
}

export const defaultState: State = {
  initialised: false,
  body: "Entire Body",
  points: {
    moneySpent: 0,
    timePassed: 0,
  },
  examinations: {
    Head: {},
    Eyes: {},
    Nose: {},
    Chest: {},
    Abdomen: {},
    Arms: {},
    Hands: {},
    Pelvis: {},
    Legs: {},
    Feet: {},
    "Entire Body": {},
  },
  completedExaminations: {
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
