import React from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';

export default function NasaContainer(props) {
  const {date, explanation, url, title} = props.data;

  return (
    <>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text>{explanation}</Text>
          <Text>{date}</Text>
          {url && <Image source={{uri: url}} style={styles.nasaImage} />}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewContainer: {alignItems: 'center', justifyContent: 'center'},
  nasaImage: {width: 200, height: 300},
});
