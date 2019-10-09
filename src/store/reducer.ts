import State, { defaultState, BodyPart, Points, Observation } from './state';
import Action, { SELECT_BODY_PART, SPEND_POINTS, SELECT_EXAMINATION, INIT_EXAMINATIONS } from './actions';

const rootReducer = (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case SELECT_BODY_PART:
      return {
        ...state,
        body: action.part,
      };
    case SPEND_POINTS:
      return {
        ...state,
        points: {
          moneySpent: action.moneySpent + state.points.moneySpent,
          timePassed: action.timePassed + state.points.timePassed,
        }
      };
    case SELECT_EXAMINATION:
      return {
        ...state,
        completedExaminations: state.completedExaminations.concat([action.examination]),
        points: {
          moneySpent: state.points.moneySpent + state.examinations[action.examination][0].cost.money,
          timePassed: state.points.timePassed + state.examinations[action.examination][0].cost.time
        }
      };
    case INIT_EXAMINATIONS:
      return {
        ...state,
        examinations: {
          ...state.examinations,
          ...action.examinations
        },
        examinationOptions: {
          ...state.examinationOptions,
          ...action.examinationOptions
        }
      };
    default:
      console.warn("Unhandled action:", action);
      return state;
  }
};

export default rootReducer;
