import State, { defaultState, BodyPart, Points, Observation } from './state';
import Action, { SELECT_BODY_PART, SPEND_POINTS, SELECT_METHOD, INIT_EXAMINATIONS } from './actions';

const rootReducer = (state: State = defaultState, action: Action): State => {
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
    case SELECT_METHOD:
      return {
        ...state,
        completedExaminations: {
          ...state.completedExaminations,
          [state.body]: state.completedExaminations[state.body].concat([[action.method, new Date().getTime()]])
        },
        points: {
          moneySpent: state.points.moneySpent + state.examinations[state.body][action.method].cost.money,
          timePassed: state.points.timePassed + state.examinations[state.body][action.method].cost.time
        }
      };
    case INIT_EXAMINATIONS:
      return {
        ...state,
        initialised: true,
        examinations: {
          ...state.examinations,
          ...action.examinations
        },
        observations: {
          ...state.observations,
          ...action.observations
        }
      };
    default:
      console.warn("Unhandled action:", action);
      return state;
  }
};

export default rootReducer;
