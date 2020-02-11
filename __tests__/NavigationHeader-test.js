import 'react-native';
import React from 'react';
import {NavigationHeader} from '../src/components';
import renderer from 'react-test-renderer';

describe('TripInfoItem', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = renderer
        .create(
          <NavigationHeader
            style={{height: 60}}
            title={'All Transactions'}
            rightView={() => {}}
          />,
        )
        .toJSON();
      expect(component).toMatchSnapshot();
    });
  });
});
