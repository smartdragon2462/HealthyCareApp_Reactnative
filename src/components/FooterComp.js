import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, FooterTab  } from 'native-base';
import { S } from '../mainStyle';

export default function FooterComp({navigate, activeInd}) {
    const [activeTab, setActiveTab] = useState([false, false, false, false]);
    const [isStop, setIsStop] = useState(false);

    useEffect(() => {
        if(!isStop){
            let list = [false, false, false, false]; 
            list[activeInd] = true;
            setActiveTab(list);
            setIsStop(true);
        }
    });

    const onClick_footer =(index)=> {
        let list = [false, false, false, false];
        list[index] = true;
        setActiveTab(list);

        if( index === 2 ){
            navigate('main');
        }else if(  index === 1 ){
            navigate('Connect');
        }
    }

    return (
        <FooterTab style={S.footer}>
            <Button active = {activeTab[0]} style={{backgroundColor: 'white'}} onPress={()=>onClick_footer(0)}>
                <Icon name="home" style={{color: activeTab[0]? '#0066FF': '#B3B9C2'}} type="MaterialIcons" />
            </Button >
            <Button active = {activeTab[1]} style={{backgroundColor: 'white'}} onPress={()=>onClick_footer(1)}>
                <Icon name="people" type="MaterialIcons"  style={{color: activeTab[1]? '#0066FF': '#B3B9C2'}}/>
            </Button >
            <Button active = {activeTab[2]} style={{backgroundColor: 'white'}} onPress={()=>onClick_footer(2)}>
                <Icon name="calendar" type="Entypo"  style={{color: activeTab[2]? '#0066FF': '#B3B9C2'}}/>
            </Button>
            <Button active = {activeTab[3]} style={{backgroundColor: 'white'}} onPress={()=>onClick_footer(3)}>
                <Icon name="player-settings" type="Fontisto"  style={{color: activeTab[3]? '#0066FF': '#B3B9C2'}}/>
            </Button>
        </FooterTab>
    );
}

const styles = StyleSheet.create({
  
});
