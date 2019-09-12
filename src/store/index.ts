import { createStore } from 'redux';
import { useSelector as useSelectorRaw, TypedUseSelectorHook } from 'react-redux';
import withReduxEnhancer from 'addon-redux/enhancer';

import rootReducer from './reducer';

export const useSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelectorRaw;

export default createStore(rootReducer, withReduxEnhancer);
