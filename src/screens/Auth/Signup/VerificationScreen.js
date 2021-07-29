import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableHighlight, Dimensions, StatusBar } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CodeInput from 'react-native-confirmation-code-input';
import Toast from 'react-native-simple-toast';
import { confirmCode, createCode } from '../../../Services/util/Api';

import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

const { width, height } = Dimensions.get('window');

export default class VerificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      phoneNumber: "",
      code: "",
      isContinue: false,
    };
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount(){
    const { navigation } = this.props;
    const phoneNumber = navigation.getParam('phoneNumber');

    this.setState({ phoneNumber: phoneNumber })
    createCode(phoneNumber).then((res)=>console.log(res));
  }

  ///////////////////////////////////////////////////////////////////////
  handleConfirm = async () => {
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const { phoneNumber, code } = this.state;
    let result = await confirmCode({ phone: phoneNumber, code: code });

    if (result.status) {
      const userRole = navigation.getParam('userRole');
      const isForgetPassword = navigation.getParam('isForgetPassword');
      if (isForgetPassword) navigate('ResetPassword', { phoneNumber: phoneNumber });
      else navigate('SetPassword', { phoneNumber: phoneNumber, userRole: userRole });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onSendVerificationCode = async () => {
    const { phoneNumber } = this.state;
    let result = await createCode(phoneNumber);
    if (result.status) {
      Toast.show(result.message, Toast.LONG);
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onFulfill = (code) => {
    this.setState({ code: code, isContinue: true });
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { phoneNumber, isContinue } = this.state;

    return (
      <LinearGradient style={styles.container} colors={[MS.Blue500, '#0250c7']}>
        <Header noShadow style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='chevron-back-outline' style={{ fontSize: 30 }} />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button disabled={!isContinue} transparent onPress={() => this.handleConfirm()} >
              <Text style={[S.ft12B_W, { opacity: isContinue ? 1 : 0.5 }]}>{"Continue"}</Text>
            </Button>
          </Right>
        </Header>
        <StatusBar backgroundColor='transparent' barStyle="light-content" translucent={true} />
        <View style={styles.contents}>          
          <Text style={S.ft18B_W}>{"Verify your number"}</Text>
          <Text style={[S.ft14_W, S.mt8]}>{"Enter the 6-digit code sent to:"}</Text>
          <Text style={[S.ft14S_W, S.mt8]}>{phoneNumber}</Text>

          <View style={{}}>
            <CodeInput
              ref="codeInputRef1"
              keyboardType="numeric"
              className={'border-b'}
              borderType={'underline'}
              codeLength={6}
              space={16}
              size={40}
              inputPosition='left'
              onFulfill={(code) => this.onFulfill(code)}
              codeInputStyle={{ fontFamily: 'Proxima-Nova-Regular', fontSize: 26 }}
              containerStyle={{ width: '100%', justifyContent: 'center', marginLeft: 10 }}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <View style={styles.resend_panel}>
              <Text style={S.ft14_W}>{"Didn't received the code?"}</Text>
              <TouchableOpacity onPress={() => this.onSendVerificationCode()}>
                <Text style={[S.ft14B_W, { lineHeight: null }]}>{"   Send again"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 20,
    backgroundColor: 'transparent'
  },
  contents: {
    height: height - 60,
    padding: 24,
    paddingTop: 8
  },
  resend_panel: {
    display: 'flex',
    flexDirection: 'row',
    textAlign: "center",
    marginTop: 24,
  }
});
