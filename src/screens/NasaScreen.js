import React, {useState, useEffect} from 'react';
import {View, Text, Button} from 'react-native';
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
      {isError && <Text>Something went wrong ...</Text>}

      {isLoading ? <Text>Loading ...</Text> : <Text>test</Text>}

      <Button type="button" title="NASA PIC" onClick={fetchData} />
    </View>
  );
}
