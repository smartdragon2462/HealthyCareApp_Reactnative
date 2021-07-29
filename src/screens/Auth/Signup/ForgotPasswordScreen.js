import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title, Radio } from 'native-base';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

const options = [
  { title: "I am a patient", subTitle: 'You can also become a caregiver and create family circles.' },
  { title: "I am a doctor", subTitle: 'You can also create a personal account and switch app to patient version' }
];

const userRoleType = ['patient', 'doctor'];


const RenderItem = ({ title, subTitle, isChecked, index, onChecked }) => (
  <View style={[S.rowFlex_start, { alignItems: 'flex-start' }]}>
    <Radio
      color={'white'}
      selectedColor={'white'}
      selected={isChecked}
      onPress={() => onChecked(index)}
    />
    <View style={[S.ml16, { flex: 1 }]}>
      <Text style={isChecked ? S.ft16S_W : S.ft16S_B300}>{title}</Text>
      <Text style={isChecked ? S.ft12_W : S.ft12_B300}>{subTitle}</Text>
    </View>
  </View>
);


export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userRole: '',
      selectedIndex: -1,
      isContinue: false,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
  }

  ///////////////////////////////////////////////////////////////////////
  onSubmitUserRole = () => {
    const { userRole } = this.state;
    const { navigate } = this.props.navigation;
    navigate('SendVerificationCode', { userRole: userRole, isForgetPassword:false });
  };

  ///////////////////////////////////////////////////////////////////////
  onChecked = (index) => {
    this.setState({ userRole: userRoleType[index], selectedIndex: index, isContinue: true });
  }

  render() {
    const { selectedIndex, isContinue } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <LinearGradient style={styles.container} colors={[MS.Blue500, '#0250c7']}>        
        <Header noShadow style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-back-outline" style={{ fontSize: 30 }} />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button transparent disabled={!isContinue} onPress={() => this.onSubmitUserRole()}>
              <Text style={[S.ft12B_W, !isContinue && { opacity: 0.5 }]}>{"Continue"}</Text>
            </Button>
          </Right>
        </Header>
        <StatusBar backgroundColor='transparent' barStyle="light-content" translucent={true} />
        <View style={styles.contents}>
          <Text style={S.ft18B_W}>{"Choose your role"}</Text>
          <Text style={[S.ft14_W, S.mt8]}>{"Help us improve your experience by letting us understand how you are using the app"}</Text>

          <View style={S.mt16}>
            {
              options.map((item, index) => (
                <View style={S.mt24} key={index}>
                  <RenderItem
                    title={item.title}
                    subTitle={item.subTitle}
                    isChecked={index === selectedIndex ? true : false}
                    index={index}
                    onChecked={this.onChecked}
                  />
                </View>
              ))
            }
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    marginTop: 24,
  },
  contents: {
    padding: 24,
    paddingTop: 8
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'left',
    lineHeight: 22,
    marginTop: 0,
  },
  subtitle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
    lineHeight: 22,
    marginTop: 8,
  },
  continue_btn: {
    backgroundColor: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 24,
    width: '100%',
  },
  continue_btn_caption: {
    fontFamily: 'Proxima Nova',
    color: '#0066FF',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '700',
  },
  inputitem: {
    marginTop: 10,
    width: '100%',
  },
});
