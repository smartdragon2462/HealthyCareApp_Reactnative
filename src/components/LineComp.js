import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Icon} from 'native-base';

export default function LineComp() {
    return (
        <View style={styles.linePanel}>
            <Icon name="controller-record" type="Entypo" style={{fontSize: 12, color:'#FF9500'}} />
            <View style={ styles.line } />
        </View>
    );
}

const styles = StyleSheet.create({
    linePanel:{
        display: 'flex', 
        flexDirection:'row', 
        alignItems:'center', 
        height:2
    },
    line:{
        borderColor:'#FF9500', 
        borderWidth: 0.5, 
        flex: 1
    }
});
