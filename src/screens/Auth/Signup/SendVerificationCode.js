import React from 'react';
import { StyleSheet, Text, View, Dimensions, StatusBar } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import { PhoneNumberInput } from '../../../components';
// import { createCode } from '../../../Services/util/Api';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

export default class SendVerificationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      phonenumberError: '',
      phoneCode: '',
      phoneNumber: '',
      isContinue: '',
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.fetchIpLocation();
  }

  ///////////////////////////////////////////////////////////////////////
  onInputChange = (txtVal, itemName) => {
    const { phoneCode, phoneNumber } = this.state;
    if (itemName === 'phonecode') {
      this.setState({ phoneCode: txtVal });
      if (txtVal && phoneNumber) this.setState({ isContinue: true });
      else this.setState({ isContinue: false });
    } else if (itemName === 'phonenumber') {
      this.setState({ phoneNumber: txtVal });
      if (phoneCode && txtVal) this.setState({ isContinue: true });
      else this.setState({ isContinue: false });
    }
  };

  ///////////////////////////////////////////////////////////////////////
  fetchIpLocation = () => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((res) => this.setState({ phoneCode: res.country_calling_code }))
      .catch((error) => console.log('Error: ', error));
  };

  ///////////////////////////////////////////////////////////////////////
  onChoosePhonecode = () => {
    const { navigate } = this.props.navigation;
    navigate('PhoneCodePage', {
      onhandlePhoneCode: this.onInputChange,
      backPage: 'SendVerificationCode',
    });
  };

  ///////////////////////////////////////////////////////////////////////
  onSubmitPhoneNumber = async () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const { phoneCode, phoneNumber } = this.state;
    const userRole = navigation.getParam('userRole');
    const isForgetPassword = navigation.getParam('isForgetPassword');

    let phoneNum = phoneCode + phoneNumber;
    // let result = await createCode(phoneNum);
    navigate('VerificationScreen', { phoneNumber: phoneNum, userRole:userRole, isForgetPassword:isForgetPassword });

    // if (result.status) {
    // } else {
    //   Toast.show(result.message, Toast.LONG);
    // }
  };

  render() {
    const { phoneCode, phoneNumber, phonenumberError, isContinue } = this.state;
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;

    return (
      <LinearGradient style={styles.container} colors={[MS.Blue500, '#0250c7']}>
        <Header noShadow style={styles.header}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" style={{ fontSize: 30 }} />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button transparent disabled={!isContinue} onPress={() => this.onSubmitPhoneNumber()}>
              <Text style={[S.ft12B_W, !isContinue && { opacity: 0.5 }]}>{"Continue"}</Text>
            </Button>
          </Right>
        </Header>
        <StatusBar backgroundColor='transparent' barStyle="light-content" translucent={true} />
        <View style={styles.contents}>
          <Text style={S.ft18B_W}>{"Enter your handphone number"}</Text>
          <Text style={[S.ft14_W, S.mt8]}>{"You will receive a confirmation code."}</Text>
          <View style={S.mt32}>
            <PhoneNumberInput
              leftIcon="person-circle-outline"
              helperText={phonenumberError}
              phoneCode={phoneCode}
              phoneNumber={phoneNumber}
              onClick={this.onChoosePhonecode}
              onInputChange={this.onInputChange}
            />
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
  }
});
