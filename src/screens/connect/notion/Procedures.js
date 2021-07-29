// ***************************************************************************
//  @Created Date: 03/29/2021.
//  @Update:  03/29/2021.
//  @author:  ClerkedApp team.
//  @description:   A screen for procedures.
// ***************************************************************************

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableHighlight, Dimensions, Animated, StatusBar } from 'react-native';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { ActionSheet, ProcedureListItem, SearchComp, HeaderComp } from '../../../components';
import { Filter_icon, Procedures_svg } from '../../../assets/icons';
import { procedureData } from '../../../Data/Procedures.json';
import medicineData from '../../../Data/medicineData1.json';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

// let procedureData = null;

const { width, height } = Dimensions.get('window');
const options = [
  { component: <Text style={S.ft20S_G800}>{"All"}</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>{"Self Reported"}</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>{"Dr. Robert Owen"}</Text>, height: 50, },
  { component: <Text style={S.ft20S_G800}>{"Dr. Lisa Brooks"}</Text>, height: 50, }
];

const NAVBAR_HEIGHT = 46;

///////////////////////////////////////////////////////////////////////
export default class Procedures extends React.Component {
  scroll = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      openDetailModal: false,
      isHeaderBorder: false,
      isSearch: false,
      searchTxt: "",
      sortType: -1,
      openConfirmModal: false,
      filteredMedicineList: medicineData,
      filteredProcedureList: procedureData,
    };
    this.actionSheet = null;
    this.headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, NAVBAR_HEIGHT), -1);
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    // hideNavigationBar();
  }

  ///////////////////////////////////////////////////////////////////////
  onScroll = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onScrollEnd = (ev) => {
    const { isHeaderBorder } = this.state;
    if (!isHeaderBorder && ev.contentOffset.y > 8) this.setState({ isHeaderBorder: true });
    else if (isHeaderBorder && ev.contentOffset.y < 8) this.setState({ isHeaderBorder: false });
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterMedicineList = (_dataList, _searchStr) => {
    let data = _dataList.filter((elem) => elem.name.length >= _searchStr.length && elem.name.substring(0, _searchStr.length).toLowerCase() === _searchStr.toLowerCase());
    return data;
  }

  ///////////////////////////////////////////////////////////////////////
  handleFilterProblemList = (_dataList, _searchStr) => {
    let data = _dataList.filter((elem) => elem.title.length >= _searchStr.length && elem.title.substring(0, _searchStr.length).toLowerCase() === _searchStr.toLowerCase());
    return data;
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeSearchComp = (val) => {
    if (val === "") {
      this.setState({ searchTxt: val, isSearch: false });
      this.setState({ filteredMedicineList: medicineData });
    } else {
      let filteredMedicineList = this.handleFilterMedicineList(medicineData, val);
      let filteredProcedureList = procedureData ? this.handleFilterProblemList(procedureData, val) : null;
      this.setState({ searchTxt: val, isSearch: true });
      this.setState({ filteredMedicineList: filteredMedicineList, filteredProcedureList: filteredProcedureList });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  showActionSheet = () => this.actionSheet.show();
  getActionSheetRef = ref => (this.actionSheet = ref);
  handlePress = (index) => {
    this.setState({ sortType: index });
  };

  ///////////////////////////////////////////////////////////////////////
  onClickSearchItem = () => {

  }

  ///////////////////////////////////////////////////////////////////////
  onSelectMedicineListItem = (title) => {
    const { navigate } = this.props.navigation;
    navigate('ProcedureDetail', { onGetNewProcedure: this.onGetNewProcedure, title: title });
  }

  ///////////////////////////////////////////////////////////////////////
  onGetNewProcedure = (data) => {
    const { navigation } = this.props;
    const onGetNewProcedure = navigation.getParam('onGetNewProcedure');
    onGetNewProcedure(data);
    navigation.goBack();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  onBackDetailModal = () => {
    this.setState({ openDetailModal: false })
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { navigation } = this.props;
    const { filteredProcedureList, filteredMedicineList, searchTxt, sortType, isHeaderBorder, isSearch, openConfirmModal, openDetailModal } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={{
          width: "100%",
          position: "absolute",
          transform: [{ translateY: this.headerY }],
          elevation: 0, flex: 1, zIndex: 1,
          backgroundColor: MS.Gray100,
          borderBottomWidth: isHeaderBorder ? 1 : 0,
          borderBottomColor: MS.Gray300
        }}>
          <View style={{ paddingTop: 22 }}>
            <HeaderComp
              active={true}
              leftText={"Procedures"}
              rightText={""}
              onSave={() => console.log("")}
              onBackpage={() => navigation.goBack()}
            />
          </View>
          <View style={[S.rowFlex_start, { paddingHorizontal: 24, paddingVertical: 8 }]}>
            <View style={styles.searchComp}>
              <SearchComp searchTxt={searchTxt} placeholder={"Search to add new procedure"} onChangeText={this.onChangeSearchComp} />
            </View>
            <TouchableHighlight style={styles.filterButton} activeOpacity={0.9} underlayColor="transparent" onPress={() => this.showActionSheet()}>
              <Image source={Filter_icon} style={styles.filterIcon} resizeMode="contain" />
            </TouchableHighlight>
          </View>
        </Animated.View>

        <Animated.ScrollView
          scrollEventThrottle={1}
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 0, elevation: -1 }}
          contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT * 2 + 22 }}
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.scroll } } }],
              { useNativeDriver: true },
            )
          }
          onMomentumScrollEnd={({ nativeEvent }) => this.onScrollEnd(nativeEvent)}
          overScrollMode="never"
        >
          <View style={styles.contents}>
            <StatusBar backgroundColor={MS.Gray100} barStyle="dark-content" translucent={true} />
            <View style={{ paddingVertical: 24 }}>
              {
                isSearch ?
                  (
                    <View>
                      {
                        filteredProcedureList && filteredProcedureList.length > 0 &&
                        <View>
                          <Text style={S.ft14_G600}>{"Add from the existing procedure list"}</Text>
                          {
                            filteredProcedureList.map((item, index) => {
                              if (index < 100) return (
                                <ProcedureListItem itemData={item} key={index} active={true} />
                              )
                            })
                          }
                          <Text style={[S.ft14_G600, S.mt24, { marginBottom: 11 }]}>{"Or choose a new procedure"}</Text>
                        </View>
                      }
                      <View style={S.pl16}>
                        {
                          filteredMedicineList &&
                          filteredMedicineList.map((item, index) => {
                            if (index < 100) return (
                              <TouchableHighlight
                                key={item.name}
                                style={[S.mb16, { flex: 1 }]}
                                activeOpacity={0.7}
                                underlayColor="transparent"
                                onPress={() => this.onSelectMedicineListItem(item.name)}
                              >
                                <Text style={[S.ft16_G800, { fontWeight: 'bold', lineHeight: 26 }]}>
                                  {item.name.substring(0, searchTxt.length)}
                                  <Text style={S.ft16_G800}>{item.name.substring(searchTxt.length)}</Text>
                                </Text>
                              </TouchableHighlight>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                  :
                  (
                    <View style={{ justifyContent: "center", height: procedureData ? null : height - 128 }}>
                      {
                        procedureData ?
                          (
                            <View>
                              <Text style={S.ft14_G600}>{"Or directly add from the existing procedures list"}</Text>
                              {
                                procedureData.map((item, index) => (
                                  <ProcedureListItem itemData={item} key={index} />
                                ))
                              }
                            </View>
                          ) :
                          (
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: -128 }}>
                              <View style={[{ padding: 16, backgroundColor: MS.Blue100, borderRadius: 50 }]}>
                                <Procedures_svg width={16} height={16} fill={MS.Blue500} />
                              </View>
                              <Text style={[S.ft20S_G800, S.mt24]}>{"Procedures list is empty"}</Text>
                              <Text style={[S.ft14_G600, S.mt8]}>{"Enter a procedure for Sandra Bullock"}</Text>
                            </View>
                          )
                      }
                    </View>
                  )
              }
            </View>
          </View>
        </Animated.ScrollView>
        <ActionSheet ref={this.getActionSheetRef} options={options} onPress={this.handlePress} title={"Sort by"} checkInd={sortType} />
      </SafeAreaView >
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    backgroundColor: MS.Gray100,
    height: "100%"
  },
  contents: {
    paddingHorizontal: 24,
    paddingTop: 8
  },
  filterIcon: {
    width: 18,
    height: 18,
  },
  filterButton: {
    borderRadius: 8,
    backgroundColor: '#F2F3F4',
    padding: 10,
    alignItems: 'center',
    marginLeft: 10
  },
  searchComp: {
    width: '100%',
    flex: 1,
  },
});




// import SplashScreen from 'react-native-splash-screen'
// import React, { useEffect, createRef,useState } from 'react';
// import { SafeAreaView, View, Image, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// export default function Procedures(props){
// // const Procedures =(props) => {
//   useEffect(() => {
//     SplashScreen.hide();
//   });

//   const [faces, setFace] = useState([]);
//   const [faceavl, setFaceavl] = useState(false);
//   const [takeTimeFaceAvl, setTakeTimeFaceAvl] = useState(false);
//   const [searchWaiting, setsearchWaiting] = useState(null)
//   const [modalVisible, setModalVisible] = useState(false);
//   const [image, setImage] = useState(null);

//   const mycamera = createRef()


//   const PendingView = () => (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: 'lightgreen',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Text>Waiting</Text>
//     </View>
//   );


//   const renderFaces = () => (
//     <View style={{
//       position: 'absolute',
//       bottom: 0,
//       right: 0,
//       left: 0,
//       top: 0,
//     }} pointerEvents="none">
//       {faces.map(renderFace)}
//     </View>
//   );

//   const renderFace = ({ bounds, faceID, rollAngle, yawAngle }) => (
//     <View
//       key={faceID}
//       transform={[
//         { perspective: 600 },
//         { rotateZ: `${rollAngle.toFixed(0)}deg` },
//         { rotateY: `${yawAngle.toFixed(0)}deg` },
//       ]}
//       style={[
//         {
//           padding: 10,
//           borderWidth: 1,
//           borderRadius: 2,
//           position: 'absolute',
//           borderColor: '#000',
//           justifyContent: 'center',
//         },
//         {
//           ...bounds.size,
//           left: bounds.origin.x,
//           top: bounds.origin.y,
//         },
//       ]}
//     >

//     </View>
//   );

//   const faceDetected = ({faces}) => {
//     setFaces(faces) // instead of setFaces({faces})
//     console.log("ffffffffff=========>", {faces})
//   }

//   return (
//     <>
//       <SafeAreaView style={styles.container}>

//         <RNCamera
//           ref={mycamera}
//           style={styles.preview}
//           type={RNCamera.Constants.Type.front}
//           flashMode={RNCamera.Constants.FlashMode.on}
//           androidCameraPermissionOptions={{
//             title: 'Permission to use camera',
//             message: 'We need your permission to use your camera',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           androidRecordAudioPermissionOptions={{
//             title: 'Permission to use audio recording',
//             message: 'We need your permission to use your audio',
//             buttonPositive: 'Ok',
//             buttonNegative: 'Cancel',
//           }}
//           onFacesDetected = {faceDetected}
//           faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
//         >
//           {({ camera, status, recordAudioPermissionStatus }) => {
//             if (status !== 'READY') return <PendingView />;
//             return (
//               <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
//                 <TouchableOpacity onPress={async () => {
//                   const options = { quality: 0.5, base64: true };
//                   const data = await camera.takePictureAsync(options)
//                   if (faceavl) {
//                     setTakeTimeFaceAvl(true)
//                   } else {
//                     setTakeTimeFaceAvl(false)
//                   }
//                   console.log(data.uri)
//                   setImage(data)
//                   setModalVisible(!modalVisible)
//                 }} style={styles.capture}>
//                   <Text style={{ fontSize: 14 }}> SNAP </Text>
//                 </TouchableOpacity>
//               </View>
//             );
//           }}

//         </RNCamera>
//         {faces ? renderFaces() : null}
//       </SafeAreaView>


//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           // Alert.alert("Modal has been closed.");
//           setModalVisible(!modalVisible);
//         }}
//       >
//         <View style={styles.centeredView}>
//           <View style={styles.modalView}>
//             {takeTimeFaceAvl ? image ? <Image
//               style={{
//                 width: 200,
//                 height: 100,
//               }}
//               source={{
//                 uri: image.uri,
//               }}
//             /> : null : <Text>Face not found</Text>}
//             <TouchableOpacity
//               style={[styles.button, styles.buttonClose]}
//               onPress={() => setModalVisible(!modalVisible)}
//             >
//               <Text style={styles.textStyle}>Hide Modal</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//     </>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   item: {
//     backgroundColor: '#FFF',
//   },
//   viewOne: {
//     flexDirection: 'row'
//   },
//   viewTwo: {
//     alignItems: 'flex-end', marginEnd: 9
//   },
//   title: {
//     fontSize: 16, // Semibold #000000
//     color: '#000000',
//   },
//   noOff: {
//     color: '#D65D35',
//     fontSize: 20,  // Semibold
//   }, product: {
//     color: '#A6A6A6',
//     fontSize: 16,  // Regular
//   }, titleView: {
//     flex: 1,
//     alignSelf: 'center',
//     marginStart: 14,
//     marginEnd: 14,
//   },
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 10,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center"
//   },

//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20,
//   },
// });