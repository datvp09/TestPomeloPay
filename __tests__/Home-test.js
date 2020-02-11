import 'react-native';
import React from 'react';
import Home from '../src/screens/Home';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();
const store = mockStore({
  transaction: {
    transactions: [],
  },
});

describe('Home', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer
        .create(
          <Provider store={store}>
            <Home />
          </Provider>,
        )
        .toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
