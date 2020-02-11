import {createActions, handleActions} from 'redux-actions';

export const {setTransactions} = createActions('SET_TRANSACTIONS');

const initialState = {
  isLoading: false,
  transactions: [],
  error: null,
};

const transReducer = handleActions(
  {
    SET_TRANSACTIONS: (state, action) => ({
      ...state,
      transactions: action.payload,
    }),
  },
  initialState,
);

export default transReducer;
