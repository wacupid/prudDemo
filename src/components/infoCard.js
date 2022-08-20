import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';

const InfoCard = (props) => {
  const avg = getAvg(props.moods)
  return (
    <View style={styles.card}>
      <ImageBackground source={require('../assets/rectangle.png')} style={styles.background}>
        <View style={styles.info}>
          <Image style={styles.infoAvatar} source={require('../assets/avatar.jpg')}></Image>
          <Text style={styles.infoName}>{props.name}</Text>
        </View>
        <Text style={styles.avg}>{avg}</Text>
        <Text style={styles.avgText}>周平均心情指数</Text>
      </ImageBackground>
    </View>
  )
}

const getAvg = (array) => {
  if(!array) return 0;
  let total = 0, length = 0;
  for(let i = 0; i < array.length; i++) {
    if(array[i].value != 0) {
      total += array[i].value;
      length++;
    }
  }
  return Math.round(total / length);
}

const styles = StyleSheet.create({
  card: {
    width: '100%'
  },
  background: {
    width: '100%', 
    height: 250, 
    resizeMode: 'stretch', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  info: {
    flexDirection:'row', 
    justifyContent: 'center'
  },
  infoAvatar: {
    width: 50, 
    height: 50, 
    borderRadius: 50
  },
  infoName: {
    lineHeight: 50, 
    fontSize: 20, 
    fontWeight: '500', 
    marginLeft: 10, 
    color: '#2D2F33'
  },
  avg: {
    fontSize: 72, 
    fontWeight: '800', 
    color: '#2D2F33'
  },
  avgText: {
    fontSize: 18, 
    color: '#929292'
  }
});

export default InfoCard;