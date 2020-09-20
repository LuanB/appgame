import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';

export default function NasaScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  }, []);

  return (
    <View>
      <Text />
    </View>
  );
}
