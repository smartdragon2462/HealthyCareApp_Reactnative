// ***************************************************************************
//  @Created Date: 12/20/2020 
//  @Update:  03/04/2021
//  @author:  ClerkedApp team
//  @description: Login screen
// ***************************************************************************

import React from 'react';
import { StyleSheet, SafeAreaView, StatusBar, Text, View, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { Container, Content } from 'native-base';
import PhoneNumberInput from '../../components/PhoneNumberInput';
import InputPasswordBox from '../../components/InputPasswordBox';
import LinearGradient from 'react-native-linear-gradient'
import { connect, useDispatch } from 'react-redux';
import { checkPassword } from '../../utils/helper';
import * as authAction from '../../Services/actions/authAction';
import { hideNavigationBar, showNavigationBar } from 'react-native-navigation-bar-color';
import { Logo_icon } from '../../assets/icons'
import { S } from '../../mainStyle';
import * as MS from '../../mainStyle';


const { width, height } = Dimensions.get('window');
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContinue: false,
      isPasswordError: false,
      email: "",
      password: "",
      phoneCode: "",
      phoneNumber: "",
      phonenumberError: "",
      passwordError: "",
    };
  }

  ///////////////////////////////////////////////////////////////////////
  fetchIpLocation = () => {
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then((res) =>
        this.setState({ phoneCode: res.country_calling_code })
      )
      .catch(error => console.log("Error: ", error));
  }

  ///////////////////////////////////////////////////////////////////////
  componentDidMount() {
    this.fetchIpLocation();
    // hideNavigationBar();
  }

  ////////////////////////////////////////////////////////////////////////////
  onInputChange = (txtVal, itemName) => {
    const { phoneCode, phoneNumber, password, isPasswordError } = this.state;
    if (itemName === "phonecode") {
      this.setState({ phoneCode: txtVal });
      if (txtVal && phoneNumber && password) this.setState({ isContinue: true });
      else this.setState({ isContinue: false });
    } else if (itemName === "phonenumber") {
      this.setState({ phoneNumber: txtVal });
      if (phoneCode && txtVal) this.setState({ phonenumberError: "" });

      if (phoneCode && txtVal.length > 0 && password) this.setState({ isContinue: true });
      else this.setState({ isContinue: false });

    } else if (itemName === "password") {
      this.setState({ password: txtVal });

      if (isPasswordError) {
        if (checkPassword(txtVal)) this.setState({ passwordError: "" });
        else this.setState({ passwordError: "Please input a digit, a special character at least 8 letters" });
      }

      if (phoneCode && phoneNumber && txtVal) this.setState({ isContinue: true });
      else this.setState({ isContinue: false });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  handleLogin = () => {
    const { phoneCode, phoneNumber, password } = this.state;

    if (!checkPassword(password)) {
      this.setState({
        isPasswordError: true,
        passwordError: "Please input a digit, a special character at least 8 letters"
      });
      // return;
    } else {
      this.setState({ isPasswordError: false, passwordError: "" });
      let phoneNumber1 = phoneCode.replace(" ", "") + phoneNumber.replace(" ", "");
      this.props.dispatch(authAction.loginAttempt(phoneNumber1, password));
    }
  }

  ///////////////////////////////////////////////////////////////////////
  onChoosePhonecode = () => {
    const { navigate } = this.props.navigation;
    navigate("PhoneCodePage", { onhandlePhoneCode: this.onInputChange, backPage: "Login" });
  }

  ///////////////////////////////////////////////////////////////////////
  onClickForgotButton = () => {
    const { phoneCode, phoneNumber } = this.state;
    const { navigate } = this.props.navigation;

    let tmp_phoneNumber = phoneCode.replace(" ", "") + phoneNumber.replace(" ", "");

    if (phoneNumber !== "") {
      if (phoneNumber.length > 5) {
        this.setState({ phonenumberError: "" });
        navigate('VerificationScreen', { phoneNumber: tmp_phoneNumber, userRole: null, isForgetPassword: true });
      } else {
        this.setState({ phonenumberError: "Please input a valid phone number" });
      }
    } else {
      this.setState({ phonenumberError: "Please first add your handphone number" });
    }
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;
    const { phoneCode, phoneNumber, phonenumberError, password, passwordError, isContinue } = this.state;

    return (
      <Container style={[styles.container, { height: '100%' }]} >
        <LinearGradient colors={[MS.Blue500, '#0250c7']}>
          <StatusBar backgroundColor='transparent' barStyle="light-content" translucent />
          <SafeAreaView style={S.pd24}>
            <View style={[styles.content]}>
              <Image source={Logo_icon} style={styles.logo} resizeMode="contain" />
              <Text style={{ ...S.ft18_W, marginTop: 22 }}>{"Healthcare. Anywhere."}</Text>

              <View style={{ marginTop: 50, width: '100%' }}>
                <PhoneNumberInput
                  leftIcon='person-circle-outline'
                  helperText={phonenumberError}
                  phoneCode={phoneCode}
                  phoneNumber={phoneNumber}
                  onClick={() => this.onChoosePhonecode()}
                  onInputChange={this.onInputChange}
                />
              </View>

              <KeyboardAvoidingView style={[S.mt8, { width: '100%' }]} behavior={'padding'}>
                <InputPasswordBox
                  leftIcon={'lock'}
                  labelText={"Password"}
                  helperText={passwordError}
                  password={password}
                  onInputChange={this.onInputChange}
                  onClick={this.onClickForgotButton}
                />
              </KeyboardAvoidingView >
              <View style={{ ...S.rowFlex_start, alignItems: "flex-end", marginTop: 12 }}>
                <Text style={S.ft14_W}>{"Don't have an account?"}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigate('ForgotPasswordScreen')}>
                  <Text style={S.ft14B_W}>{"  Sign up"}</Text>
                </TouchableOpacity>
              </View>
              {
                this.props.root.get('isLoading') &&
                <View style={{ width: '80%', marginTop: 32 }}>
                  <Text style={[S.ft16_W, { alignSelf: "center" }]}>{"One moment ..."}</Text>
                  <ProgressBar styleAttr="Horizontal" color={MS.Green500} />
                </View>
              }
            </View>


            <View>
              <TouchableOpacity
                style={{ justifyContent: 'flex-end' }}
                activeOpacity={0.5}
                onPress={() => this.handleLogin()}
                disabled={!isContinue}
              >
                <View style={[styles.login_btn, !isContinue && { backgroundColor: MS.Blue700 }]}>
                  <Text style={S.ft16_B500}>{"Sign in"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView >
        </LinearGradient>
      </Container>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
const mapStateToProps = (state) => ({
  auth: state.get("auth"),
  root: state.get('root')
});
const mapDispatchToProps = dispatch => ({
  dispatch: payload => dispatch(payload)
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    height: height - 98,
    // flex: 1,
    alignItems: 'center',
    width: "100%"
  },
  logo: {
    marginTop: 50,
    width: 150,
    height: 50
  },

  login_btn: {
    backgroundColor: '#FFFFFF',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    width: '100%',
  },
});


