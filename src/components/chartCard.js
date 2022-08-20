import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Animated, TouchableWithoutFeedback, DeviceEventEmitter} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Ionicons from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedMoodItem = (props) => {
  const heightAnim = useRef(new Animated.Value(0)).current;
  const showAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(
        heightAnim,
        {
          toValue: 300 * props.value / 100,
          duration: 1000,
          useNativeDriver: false
        }
      ),
      Animated.timing(
        showAnim,
        {
          toValue: 1,
          duration: 0,
          useNativeDriver: false
        }
      )
    ]).start();
  }, [heightAnim, showAnim])
  const defColor = !props.value ? '#CFCFCF' : props.value >= 90 ? '#FF823C' : '#52C873';
  const defIconColor = !props.value ? '#F2F2F2' : props.value >= 90 ? '#FFDEC9' : '#D4F3D3';
  const icon = !props.value ? 'questioncircle' : props.value >= 90 ? 'smile-circle' : 'meho';
  const highlightColor = !props.value ? ['#CFCFCF', '#CFCFCF'] : props.value >= 90 ? ['#FFA14A', '#FFCC4A', '#FFE9D4'] : ['#42F373', '#A1FD44', '#DCFFD6'];
  const highlightIconColor = !props.value ? '#F2F2F2' : props.value >= 90 ? '#FFF2EA' : '#EEFFEE';
  const borderAttrs = {elevation: 1}
  const highlightBorder = !props.value ? {} : props.value >= 90 ? {borderColor: '#FFE9D4', ...borderAttrs} : {borderColor: '#DCFFD6', ...borderAttrs};
  const [color, setColor] = useState([defColor, defColor])
  const [iconColor, setIconColor] = useState(defIconColor)
  const [border, setBorder] = useState({})
  const onPress = () => {
    setColor(highlightColor);
    setIconColor(highlightIconColor);
    setBorder(highlightBorder)
    DeviceEventEmitter.emit('setSelected', {id: props.id});
  };

  DeviceEventEmitter.addListener('setSelected',function(param){
    if(props.id != param.id) {
      setColor([defColor, defColor]);
      setIconColor(defIconColor)
      setBorder({})
    }
  });

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={{height: heightAnim, minHeight: !props.value ? 80 : 0}}>
        <LinearGradient colors={color} style={[styles.itemBlock, border]}>
          <Animated.Text style={[styles.itemBlockText, {opacity: showAnim}]}>{!props.value ? '' : props.value}</Animated.Text>
          <Ionicons style={[styles.itemBlockIcon, {color: iconColor}]} name={icon} size={20}/>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const MoodItem = (props) => {

  const defAttrs = {
    color: '#2D2F33'
  }

  const selectedAttrs = {
    color: !props.value ? '#2D2F33' : props.value >= 90 ? '#F36A1B' : '#52C873',
    elevation: 1
  }

  const [selectedStyle, setSelectedStyle] = useState(defAttrs)

  DeviceEventEmitter.addListener('setSelected',function(param){
    if(props.id != param.id) {
      setSelectedStyle(defAttrs);
    } else {
      setSelectedStyle(selectedAttrs);
    }
  });

  return (
    <View style={styles.item}>
      <View style={styles.itemContent}>
        <AnimatedMoodItem {...props}></AnimatedMoodItem>
      </View>
      <Text style={[styles.itemTitle, selectedStyle, props.title == '五' ? styles.itemTitleCurrent : {}]}>{props.title}</Text>
    </View>
  )
}

const ChartCard = (props) => {
  const renderItem = ({ item }) => (
    <MoodItem key={item.id} {...item}></MoodItem>
  );
  const elements = [];
  props.moods.forEach(item => {
    elements.push(renderItem({item}))
  });
  return (
    <View style={styles.data}>
      <View style={styles.dataContent}>
        <View style={styles.midline}></View>
        {elements}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  data: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10
  },
  dataContent: {
    borderTopWidth: 2,
    borderTopColor: '#F2F2F2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '70%'
  },
  midline: {
    width: '100%',
    height: 2,
    backgroundColor: '#F2F2F2',
    position: 'absolute',
    top: 150
  },
  item: {
    width: 44,
  },
  itemContent: {
    justifyContent: 'flex-end',
    height: 300
  },
  itemBlock: {
    borderRadius: 30,
    justifyContent: 'space-between',
    flex: 1,
    borderColor: '#fff',
    borderWidth: 3,
    borderRadius: 30
  },
  itemBlockText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center'
  },
  itemBlockIcon: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 4
  },
  itemTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    width: 36,
    height: 36,
    lineHeight: 36,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: '#fff'
  },
  itemTitleCurrent: {
    backgroundColor: '#2D2F33',
    color: '#fff',
  }
});

export default ChartCard;