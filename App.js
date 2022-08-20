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
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Header from './src/components/header';
import InfoCard from './src/components/infoCard';
import ChartCard from './src/components/chartCard';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import data from './src/utils/data';

const App = () => {

  const [moods] = useState(data);

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <View style={styles.content}>
        <Header title="历史心情指数"></Header>
        <InfoCard moods={moods} name="李强"></InfoCard>
        <ChartCard moods={moods}></ChartCard>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.white
  },
  content: {
    height: '100%',
    alignItems: 'center'
  }
});

export default App;
