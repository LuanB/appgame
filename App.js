/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {FlatGrid} from 'react-native-super-grid';

const numRows = 50;
const numCols = 50;

const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FlatGrid
          itemDimension={25}
          data={grid}
          renderItem={({cell}) => (
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'pink',
                borderWidth: 1,
              }}>
              <Text>{cell}</Text>
            </View>
          )}
        />
        {/* </View> {grid.map((rows, i) => */}
        {/* //   rows.map((col, colIndx) => (
        //     <View
        //       key={`${i}-${colIndx}`}
        //       style={{
        //         width: 20,
        //         height: 20,
        //         backgroundColor: grid[i][colIndx] ? 'pink' : undefined,
        //         borderWidth: 1,
        //       }}
        //     />
        //   )),
        // )} */}
      </View>

      <Text>Test</Text>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
