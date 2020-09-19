/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {FlatGrid} from 'react-native-super-grid';

const numRows = 10;
const numCols = 10;

const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
  ,
];

const App = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);

  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });

    // simulate

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <Button
        onPress={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            runSimulation();
          }
        }}
        title={running ? 'Stop' : 'Start'}
        color="#841584"
        accessibilityLabel="Start game"
      />

      <FlatGrid
        itemDimension={25}
        data={grid}
        renderItem={({item, index}) => {
          console.log('item is ', item);
          return item.map((col, colIndx) => (
            <TouchableOpacity
              onPress={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[index][colIndx] = grid[index][colIndx] ? 0 : 1;
                });
                console.log(' grid is ', grid);
                setGrid(newGrid);
              }}>
              <View
                key={`${col}-${colIndx}`}
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: grid[index][colIndx] ? 'pink' : undefined,
                  borderWidth: 1,
                }}>
                <Text>
                  {index} - {colIndx}
                </Text>
              </View>
            </TouchableOpacity>
          ));
        }}
      />
      <View>
        <Text>Simulator is {running ? 'running' : 'has stopped'}</Text>
      </View>

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
      {/* </View> */}
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
