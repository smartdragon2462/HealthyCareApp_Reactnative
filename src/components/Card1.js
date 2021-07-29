import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { S } from '../mainStyle';

export default function Card1(props) {
  const { count, caption, children } = props;  
  return (
    <View style={{ ...styles.card }}>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ ...styles.count,  }}>{count}</Text>
      </View>    
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        { children }
      </View>  
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Text style={{ ...S.ft12B_W, color: '#33435C' }}>{caption}</Text>
      </View>     
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // width: "100%",
    flex: 1,
    height: 88,
    margin: 4,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    // display: 'flex',
    // flexDirection: 'row',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
  },

  count: {
    fontFamily: 'Proxima-Nova-Bold',
    fontWeight: '600',
    fontSize: 10,
    color: "#0066FF",
    backgroundColor: "#E6F0FF",
    borderRadius: 16,
    paddingVertical: 2,
    paddingHorizontal: 5,
  } 
});

