import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import axios from 'axios';
import NasaContainer from '../components/NasaContainer';

export default function NasaScreen() {
  const [data, setData] = useState({});
  const [url, setUrl] = useState(
    'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await axios(url);

      setData(result.data);
      console.log('data is ', result);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.viewContainer}>
      {isError && (
        <Text style={styles.ErrorLoadingText}>Something went wrong ...</Text>
      )}

      {isLoading ? (
        <Text style={styles.ErrorLoadingText}>Loading ...</Text>
      ) : (
        <NasaContainer data={data} />
      )}

      <View style={styles.nasaBtn}>
        <Button type="button" title="NASA PIC" onPress={fetchData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ErrorLoadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewContainer: {flex: 1, justifyContent: 'flex-end', margin: 5},
  nasaBtn: {marginBottom: 20},
});
