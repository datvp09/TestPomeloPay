import {combineReducers} from 'redux';
import transaction from './actions';

const reducers = combineReducers({
  transaction,
  // more reducers
});

export default reducers;
