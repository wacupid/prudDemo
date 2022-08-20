import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import Ionicons from 'react-native-vector-icons/AntDesign'

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Ionicons name='arrowleft' size={20} style={styles.headerIcon}/>
      <Text style={styles.headerText}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    color: '#2D2F33',
    fontWeight: 500,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerIcon: {
    position: 'absolute',
    left: 10
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20
  }
});

export default Header;