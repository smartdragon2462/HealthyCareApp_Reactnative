// ***************************************************************************
//  @Created Date:    1/4/2021 
//  @Update:  2/9/2021
//  @author:  ClerkedApp team
//  @description:   A component to create new appointment 
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { Content } from 'native-base';
import SearchComp from './SearchComp';
import { VScrollItem, HScrollItem } from './ListItems';
import { S } from '../mainStyle';
   
export default class MyPatientComp extends React.Component{
    constructor(props) {
        super(props);    
        this.state = {
            selectedCaregiver: [],
            selectedCareteam: []
        };
    }

    ///////////////////////////////////////////////////////////////////////
    componentDidMount(){
        const { chosenPatient, eventData } = this.props;
        if( eventData && chosenPatient ){
            if( eventData.careteam !== null ) this.setState({ selectedCareteam: eventData.careteam});
            if( eventData.caregiver !== null ) this.setState({ selectedCaregiver: eventData.caregiver});
        }else 
            this.setState({ selectedCaregiver: [], selectedCareteam: [] });
    }

    /////////////////////////////////////////////////////////////////////////
    UNSAFE_componentWillReceiveProps(nextProps){
        const { chosenPatient, eventData } = nextProps;
        if( eventData && chosenPatient ){
            if( eventData.careteam !== null ) this.setState({ selectedCareteam: eventData.careteam});
            if( eventData.caregiver !== null ) this.setState({ selectedCaregiver: eventData.caregiver});
        }else{
            this.setState({ selectedCaregiver:[], selectedCareteam:[] });
        }
    }

    ///////////////////////////////////////////////////////////////////////
    onCheckID = (dataList, id) => {
        if (dataList === null) return false;
        let filteredList = dataList.filter((elem) => elem.id === id);        
        return filteredList.length > 0 ? true : false;
    }

    //////////////////////////////////////////////////////////////
    onSelectCaregiver = (item) => {
        const { onGetEventData, chosenPatient } = this.props;
        const { selectedCaregiver, selectedCareteam } =this.state;

        let tmp = selectedCaregiver;
        if (!this.onCheckID(tmp, item.id)) tmp.push(item);
        else tmp.splice(tmp.findIndex(x => x.id === item.id), 1);

        this.setState({ selectedCaregiver:tmp });        
        let eventData = {patient:chosenPatient, caregiver: tmp, careteam: selectedCareteam }
        onGetEventData(eventData);
    }

    //////////////////////////////////////////////////////////////
    onSelectCareteam = (item) => {
        const { onGetEventData, chosenPatient } = this.props;
        const { selectedCaregiver, selectedCareteam } =this.state;

        let tmp = selectedCareteam;
        if (!this.onCheckID(tmp, item.id)) tmp.push(item);
        else tmp.splice(tmp.findIndex(x => x.id === item.id), 1);
        
        this.setState({ selectedCareteam:tmp });

        let eventData = {patient:chosenPatient, caregiver: selectedCaregiver, careteam: tmp }
        onGetEventData(eventData);
    }

    ///////////////////////////////////////////////////////////////////////
    onCancelCareteamItem =(item)=> {
        const { chosenPatient, onGetEventData } = this.props;
        const { selectedCaregiver,selectedCareteam } =this.state;

        let tmp = selectedCareteam;
        tmp.splice(tmp.findIndex(x => x.id === item.id), 1);
        this.setState({ selectedCareteam:tmp });

        let eventData = {patient:chosenPatient, caregiver: selectedCaregiver, careteam: tmp }
        onGetEventData(eventData);
    }

    ///////////////////////////////////////////////////////////////////////
    onCancelCaregiverItem =(item)=> {
        const { chosenPatient, onGetEventData } = this.props;
        const { selectedCaregiver,selectedCareteam } =this.state;

        let tmp = selectedCaregiver;
        tmp.splice(tmp.findIndex(x => x.id === item.id), 1);
        this.setState({ selectedCaregiver:tmp });

        let eventData = {patient:chosenPatient, caregiver: tmp, careteam: selectedCareteam }
        onGetEventData(eventData);
    }

    ///////////////////////////////////////////////////////////////////////
    onCancelPatientItem  =()=> {
        const { onGetEventData, onCancelPatient } = this.props;
        this.setState({ selectedCaregiver:null,  selectedCareteam: null});
        
        let eventData = {patient:null, caregiver: null, careteam: null }
        onGetEventData(eventData);
        onCancelPatient();
    }

    ///////////////////////////////////////////////////////////////////////
    render() {
        const { patientList, chosenPatient, searchTxt, onSelectList, onChangeText } = this.props;
        const { selectedCaregiver, selectedCareteam } =this.state;
        
        let caregiverList = null, careTeamList = null;
        if( chosenPatient ) {
            caregiverList = chosenPatient.caregiver;
            careTeamList = chosenPatient.careTeam;
        }

        return (
            <View>
                <View style={{ marginTop: 8, marginBottom: 8 }}>
                    <SearchComp
                        onChangeText = {onChangeText}
                        searchTxt = {searchTxt}
                        placeholder = {"Search by name or ID"}
                        type = {2}
                    />
                </View>

                {/* ----------------------------------------------------- */}
                <ScrollView horizontal>
                {
                    chosenPatient &&
                    <HScrollItem item={chosenPatient} onCancel={ ()=>this.onCancelPatientItem() } />
                }
                {
                    selectedCaregiver &&
                    selectedCaregiver.map((item, i) => (
                        <View key={i}>
                            <HScrollItem item={item} onCancel={this.onCancelCaregiverItem} />
                        </View>
                    ))
                }
                {
                    selectedCareteam &&
                    selectedCareteam.map((item, i) => (
                        <View key={i}>
                            <HScrollItem item={item} onCancel={this.onCancelCareteamItem} />
                        </View>
                    ))
                }
                </ScrollView>

                {
                    chosenPatient &&
                    <View style={{ borderTopWidth:1, borderTopColor:"#E6E8EB" }} />
                }

                {/* ----------------------------------------------------- */}
                <Content>
                {
                    chosenPatient ?
                    (
                        <View style={{ marginTop: 16, marginBottom: 30 }}>
                        {
                        caregiverList &&
                            caregiverList.map((item, i) => (
                                <TouchableHighlight
                                    key={i}
                                    activeOpacity={0.8}
                                    underlayColor="transparent"
                                    onPress={() => this.onSelectCaregiver(item)}
                                >
                                    <VScrollItem item={item} isChecked={this.onCheckID(selectedCaregiver, item.id)} />
                                </TouchableHighlight>
                            ))
                        }
                        {
                        careTeamList &&
                            <View style={{ marginTop: 16 }}>
                                <Text style={{ ...S.ft16_G900, color:'#667285' }}>Care team</Text>
                                {
                                careTeamList.map((item, i) => (
                                    <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => this.onSelectCareteam(item)} >
                                        <VScrollItem item={item} isChecked={this.onCheckID(selectedCareteam, item.id)} />
                                    </TouchableHighlight>
                                    ))
                                }
                            </View>
                        }
                        </View>
                    )
                    :
                    (
                        <View style={{ marginTop: 16, marginBottom: 30 }}>
                        {
                        patientList &&
                            patientList.map((item, i) => (
                                <TouchableHighlight key={i} activeOpacity={0.8} underlayColor="transparent" onPress={() => onSelectList(i)}>
                                    <VScrollItem item={item} />
                                </TouchableHighlight>
                            ))
                        }
                        </View>
                    )
                }
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
});


