/**
 * @format
 */

import 'react-native';
import React from 'react';
import CellScreen from '../src/screens/CellScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';

it('renders correctly', () => {
  renderer.create(<CellScreen />);
});

describe('<App />', () => {
  it('should match snapshot', () => {
    const result = render(<CellScreen />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render correctly the components - Run, Rest and Simulator grid', () => {
    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <CellScreen />,
    );

    const btnRun = getByTestId('btnRun');
    expect(btnRun).toBeDefined();
    const btnRest = getByTestId('btnReset');
    expect(btnRest).toBeDefined();
    const simulatorGrid = getByTestId('SimulatorGrid');
    expect(simulatorGrid).toBeDefined();
  });
});
