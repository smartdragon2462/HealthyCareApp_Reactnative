import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import { S } from '../mainStyle';

export default function BlueHeader(props) {
  const { headerTitle, buttonCaption, onclickConfirm, onclickCancel } = props
  
  return (
    <View style={styles.header}>      
      <LinearGradient style={{ width: '100%', paddingTop:36 }} colors={['#0066ff', '#0250c7']}>
        <View style={styles.button_panel}>
          <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={() => onclickCancel()}>
            <View style={{ ...S.rowFlex_start }}>
              <Icon name='chevron-back-outline' style={{ fontSize: 26, color: 'white' }} />
              <Text style={ S.ft16_W }>{headerTitle}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight  activeOpacity={0.8} underlayColor="transparent" onPress={() => onclickConfirm()}>
            { props.children }
          </TouchableHighlight>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {    
    backgroundColor: '#0250C7',
    height: 80,
    width: '100%',
  },
  button_panel: {
    paddingHorizontal: 24, 
    paddingBottom: 0, 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  }
});
