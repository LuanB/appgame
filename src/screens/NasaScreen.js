import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export default function NasaScreen() {
  const [data, setData] = useState({hits: []});
  const [query, setQuery] = useState('redux');
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
      console.log('data is ', data);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <View>
      {isError && <div>Something went wrong ...</div>}

      {isLoading ? <div>Loading ...</div> : <ul>test</ul>}

      <button type="button" onClick={fetchData}>
        Get Nasa Picture of the Day
      </button>
      <Text />
    </View>
  );
}
