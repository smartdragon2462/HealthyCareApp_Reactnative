import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import InputBox from './InputBox';
import { S } from '../mainStyle';

export default function NewParentComp({ onInputBoxChange, newPatientTxts, helper }) {
    return (
      <View>
        <Text style = {[S.ft14_G700, {marginBottom: 5, marginLeft:3}]}>Personal information</Text>
          <View style={{marginBottom: 16}}>
            <InputBox 
              name = "name"
              labelText = {"Patient Name"}
              placeholder = {"Patient Name"}
              helperText =  {helper.name}
              value = { newPatientTxts.name }
              KeyboardType = {null}
              onChange = {onInputBoxChange}
              type = {2}
            />
          </View>
           <View style={{marginBottom: 16}}>
              <InputBox 
                name = "id"
                labelText = {"Patient's ID number"}
                placeholder = {"Patient's ID number"}
                helperText = {helper.id}
                onChange = {onInputBoxChange}
                value = { newPatientTxts.id }
                KeyboardType = 'numeric'
                isError = {true}
                type = {2}
              />
            </View>

            <View style={{marginBottom: 24}}>
              <Text style = {[S.ft14_G700, {marginBottom: 5, marginLeft:3}]}>Contact</Text>
              <InputBox 
                name = "phoneNum"
                labelText = {"Handphone number"}
                placeholder = {"Handphone number"}
                helperText = {helper.phoneNum}
                value = { newPatientTxts.phoneNum }
                KeyboardType = 'phone-pad'
                onChange = {onInputBoxChange}
                type = {2}
              />
            </View>
            {/* <View style={{marginBottom: 20}}>
              <InputBox 
                name = "email"
                labelText = {"Email"}
                placeholder = {"Email"}
                helperText = {helper.email}
                value = { newPatientTxts.email }
                KeyboardType = {null}
                onChange = {onInputBoxChange}
              />
            </View> */}
            
        </View>
    );
}

const styles = StyleSheet.create({
});


