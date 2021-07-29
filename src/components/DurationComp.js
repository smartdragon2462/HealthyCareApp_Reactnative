import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default function DurationComp({onSelectDuration, index}) {

    let durationList = ["05", "10", "15", "30","45", "60"];
    return (
        <View style={styles.wrapper}>
            <View style={ styles.durationPanel }>
            {
                durationList.map((duration, i)=>{
                const activeStyle =  index === i? styles.active: null;
                const activeCard =  index === i?  styles.activeCard: null;
                return(           
                    <TouchableHighlight  key = {i} activeOpacity={0.6} underlayColor = 'transparent' onPress={() => onSelectDuration(i)}>
                        <View style={ [styles.itemCard, activeCard] }>
                            <Text style = { [styles.timeTxt, activeStyle ] }>{ duration }</Text>
                            <Text style = { [styles.minuteTxt, {marginTop: 8}, activeStyle] }>MIN</Text>
                        </View> 
                    </TouchableHighlight>                    
                    );
                })
            }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { 
        backgroundColor: 'white'
    },
    active: {
        color: '#0066FF',
    },
    durationPanel:{
        display:'flex', 
        flexDirection:'row', 
        paddingVertical: 10,
        paddingHorizontal: 1,
        backgroundColor: '#FAFAFB',
        justifyContent:'space-between'
    },
    itemCard : {
        borderRadius: 8, 
        backgroundColor:'#FFFFFF',
        width: 48, 
        height: 75,
        alignItems:'center', 
        justifyContent:'center',

        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 0.5,
    },
    activeCard : {
        borderRadius: 8, 
        backgroundColor:'#E6F0FF',
        width: 48, 
        height: 75,
        alignItems:'center', 
        justifyContent:'center',
        borderColor: '#80B3FF',
        borderWidth: 1,

        shadowColor: '#aaa',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 2,  
        elevation: 2,
    },
    timeTxt: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 14,
        lineHeight: 14,
        letterSpacing: 0.35,
        color: '#B3B9C2',
        textTransform: 'uppercase'
    },
    minuteTxt: {
        fontFamily: 'Proxima-Nova-Bold',
        fontSize: 10,
        lineHeight: 12,
        letterSpacing: 0.35,
        color: '#B3B9C2',
        textTransform: 'uppercase'
    }
});
