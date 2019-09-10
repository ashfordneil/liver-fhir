import State, { defaultState, BodyPart, Points, Observations } from './state';
import Action, { SelectBodyPart, SpendPoints } from './actions';

const rootReducer = (state: State = defaultState, action: Action) => {
  if (action instanceof SelectBodyPart) {
    return {
      ...state,
      body: action.part,
    };
  } else if (action instanceof SpendPoints) {
    return {
      ...state,
      points: {
        moneySpent: action.moneySpent + state.points.moneySpent,
        timePassed: action.timePassed + state.points.timePassed,
      }
    };
  } else {
    return state;
  }
}

export default rootReducer;
