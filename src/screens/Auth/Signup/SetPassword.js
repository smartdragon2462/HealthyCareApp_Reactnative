import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Header, Left, Body, Button, Icon, Title } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect, useDispatch } from 'react-redux';
import InputPasswordBox1 from '../../../components/InputPasswordBox1';
import { checkPassword } from '../../../utils/helper';
import * as authAction from '../../../Services/actions/authAction';
import { createDoctor, createUser } from '../../../Services/util/Api';
import { S } from '../../../mainStyle';
import * as MS from '../../../mainStyle';

const { width, height } = Dimensions.get('window');

export class SetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContinue: false,
      password: "",
      repassword: "",
      passwordError: "",
      repasswordError: ""
    };
  }

  ///////////////////////////////////////////////////////////////////////
  onChangePassword = (txtVal, itemName) => {
    this.setState({ password: txtVal });

    const { repassword } = this.state;
    if (repassword.length > 0 && txtVal.length > 0) this.setState({ isContinue: true });
    else this.setState({ isContinue: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onChangeRepassword = (txtVal, itemName) => {
    this.setState({ repassword: txtVal });

    const { password } = this.state;
    if (password.length > 0 && txtVal.length > 0) this.setState({ isContinue: true });
    else this.setState({ isContinue: false });
  }

  ///////////////////////////////////////////////////////////////////////
  onSetPassword = async () => {
    const { password, repassword } = this.state;
    const { navigation } = this.props;
    const { navigate } = this.props.navigation;
    const phoneNumber = navigation.getParam('phoneNumber');
    const userRole = navigation.getParam('userRole');

    let isPassword = false, isRepassword = false;

    if (checkPassword(password)) {
      isPassword = true;
      this.setState({ passwordError: "" });
    } else {
      this.setState({ passwordError: "Password type is wrong. please try again." });
    }

    if (checkPassword(repassword)) {
      isRepassword = true;
      this.setState({ repasswordError: "" });
    } else {
      this.setState({ repasswordError: "Password type is wrong. please try again." });
    }

    if (isPassword && isRepassword && password !== repassword) {
      this.setState({ repasswordError: "The confirm password is not matched." });
      return
    }
    else if (isPassword && isRepassword && password === repassword) {
      this.props.dispatch(authAction.registerAttempt({ phone: phoneNumber, password: password, role: userRole }));
      // let result = null
      // if (userRole === 'doctor') result = await createDoctor({ phone: phoneNumber, password: password });
      // else if (userRole === 'patient') result = await createUser({ phone: phoneNumber, password: password });

      // if (result && result.status) {
      //   navigate('Dashboard');
      // }
    }
  }

  ///////////////////////////////////////////////////////////////////////
  render() {
    const { navigate } = this.props.navigation;
    const { password, repassword, passwordError, repasswordError, isContinue } = this.state;

    return (
      <LinearGradient style={styles.container} colors={[MS.Blue500, '#0250c7']}>
        <Header noShadow style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='chevron-back-outline' style={{ fontSize: 30 }} />
            </Button>
          </Left>
          <Body><Title></Title></Body>
        </Header>
        <StatusBar backgroundColor='transparent' barStyle="light-content" translucent={true} />
        <View style={styles.contents}>      
          <Text style={S.ft18B_W}>{"Enter your password"}</Text>
          <Text style={[S.ft14_W, S.mt8]}>{"Please type a password with a least 8 digits and one special character."}</Text>
          <View style={styles.inputitem}>
            <InputPasswordBox1
              leftIcon={'lock'}
              labelText={"Password"}
              helperText={passwordError}
              txtValue={password}
              onInputChange={this.onChangePassword}
            />
          </View>
          <View style={styles.inputitem}>
            <InputPasswordBox1 
              leftIcon={'lock'}
              labelText={"Confirm your password"}
              helperText={repasswordError}
              txtValue={repassword}
              onInputChange={this.onChangeRepassword}
            />
          </View>
          <TouchableOpacity
            disabled={!isContinue}
            style={[styles.createButton, !isContinue && { backgroundColor: MS.Blue700 }]}
            activeOpacity={0.5}
            onPress={() => this.onSetPassword()}
          >
            <Text style={S.ft16S_B500}>{"Create account"}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword)




const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginTop: 20,
    backgroundColor: 'transparent'
  },
  contents: {
    height: height - 50,
    padding: 24,
    paddingTop: 8
  },
  createButton: {
    height: 50,
    marginTop: 'auto',
    marginBottom: 24,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputitem: {
    marginTop: 10,
  },
});
