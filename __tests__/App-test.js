/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import {render} from 'react-native-testing-library';

it('renders correctly', () => {
  renderer.create(<App />);
});

describe('<App />', () => {
  it('should match snapshot', () => {
    const result = render(<App />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('should render correctly the components - Run, Rest and Simulator grid', () => {
    const {getByTestId, getByText, queryByTestId, toJSON} = render(<App />);

    const btnRun = getByTestId('btnRun');
    expect(btnRun).toBeDefined();
    const btnRest = getByTestId('btnReset');
    expect(btnRest).toBeDefined();
    const simulatorGrid = getByTestId('SimulatorGrid');
    expect(simulatorGrid).toBeDefined();
  });
});
