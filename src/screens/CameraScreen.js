// ***************************************************************************
//  @Created Date: 03/31/2021.
//  @Update:  03/31/2021.
//  @author:  ClerkedApp team.
//  @description:   A screen for Camera.
// ***************************************************************************

import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { TakeCamera_icon, SwitchCamera_svg, Close_svg, FlashOn_svg, FlashOff_svg, FlashAuto_svg } from '../assets/icons';
import { User_img6 } from '../assets/images';
import { S } from '../mainStyle';
import  * as MS from '../mainStyle';

const { width, height } = Dimensions.get('window');
const flashModeIcon = [FlashOn_svg, FlashOff_svg, FlashAuto_svg];
const flashMode = [RNCamera.Constants.FlashMode.on, RNCamera.Constants.FlashMode.off, RNCamera.Constants.FlashMode.auto];
const cameraType = [RNCamera.Constants.Type.back, RNCamera.Constants.Type.front];

///////////////////////////////////////////////////////////////////////
export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flashModeIndex: 0,
      cameraTypeIndex: 0
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount(){
    this.setState({ flashMode: RNCamera.Constants.FlashMode.on });
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  takePicture = async () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;

    if (this.camera) {
      const options = { quality: 0.8, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      const onGetPicture = navigation.getParam('onGetPicture');  
      onGetPicture(data.uri);
      navigate('ProcedureDetail');
    }
  };

  ///////////////////////////////////////////////////////////////////////
  onTouchFlaskButton =()=> {
    const {flashModeIndex} = this.state;
    let tmpIndex = flashModeIndex; 
    if(tmpIndex===2) tmpIndex = -1;
    this.setState({flashModeIndex: tmpIndex + 1});
  }

  ///////////////////////////////////////////////////////////////////////
  onTouchCameraButton =()=> {
    const {cameraTypeIndex} = this.state;
    let tmpIndex = cameraTypeIndex; 
    if(tmpIndex===2) tmpIndex = -1;
    this.setState({cameraTypeIndex: tmpIndex + 1});
  }
  
  ///////////////////////////////////////////////////////////////////////
  onTouchCloseButton =()=> {
    const { navigate } = this.props.navigation;
    navigate('ProcedureDetail');
  }
  ///////////////////////////////////////////////////////////////////////
  render() {      
    const {flashModeIndex, cameraTypeIndex} = this.state;
    let FlaskIcon = flashModeIcon[flashModeIndex];

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <RNCamera
          ref={ref => { this.camera = ref;}}
          style={styles.preview}
          type={cameraType[cameraTypeIndex]}
          flashMode={flashMode[flashModeIndex]}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={[{position:"absolute", top:32, width:"100%", paddingHorizontal:24}, S.rowFlex]}>
          <TouchableOpacity onPress={()=> this.onTouchCloseButton()}>
            <Close_svg width={16} height={16} fill={"white"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.onTouchFlaskButton()}>
            <FlaskIcon width={24} height={24} fill={"white"}/>
          </TouchableOpacity>
        </View>
        <View style={[S.rowFlex, {position:"absolute", bottom:40}]}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={{borderRadius: 8, backgroundColor:MS.Green100}}>
              <Image source={User_img6} style={{ height:48, width: 48}} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)}>
              <Image source={TakeCamera_icon} style={{ height:52, width: 52, borderRadius: 50}} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity  onPress={()=> this.onTouchCameraButton()}>
              <SwitchCamera_svg width={24} height={24} fill={"white"}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

