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
  TouchableOpacity,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
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
];

const initialState = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

const App = () => {
  const [grid, setGrid] = useState(initialState);

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
    setTimeout(runSimulation, 500);
  }, []);

  const onReset = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    setGrid(rows);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <FlatGrid
            itemDimension={25}
            data={grid}
            renderItem={({item, index}) => {
              return item.map((col, colIndx) => (
                <TouchableOpacity
                  key={`${col}-${colIndx}`}
                  onPress={() => {
                    const newGrid = produce(grid, (gridCopy) => {
                      gridCopy[index][colIndx] = grid[index][colIndx] ? 0 : 1;
                    });
                    setGrid(newGrid);
                  }}>
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: grid[index][colIndx]
                        ? 'pink'
                        : undefined,
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
          <View style={{width: 200, paddingVertical: 10}}>
            <Button
              testID="btnRun"
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
          </View>
          <View style={{width: 200}}>
            <Button
              testID="btnReset"
              onPress={onReset}
              title="Reset"
              color="#841584"
              accessibilityLabel="Start game"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
