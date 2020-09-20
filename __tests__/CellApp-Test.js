// __tests__/Intro-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import CellScreen from '../src/screens/CellScreen';

test('renders correctly', () => {
  const tree = renderer.create(<CellScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
