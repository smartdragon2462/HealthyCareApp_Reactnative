import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { StyleSheet, Text, View, Animated, Easing } from 'react-native';
import Toast from 'react-native-toast-message';
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from 'react-navigation-stack';
import { Provider as StoreProvider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';
import * as NavigationService from './Services/navigationService'
import { SafeAreaProvider } from "react-native-safe-area-context";
import configureStore from "../src/Services/store/configureStore";
import { S } from './mainStyle';
import * as MS from './mainStyle';


// --- container pages ------------------------------------
import Home from './screens/schedule/Home';
import Login from './screens/Auth/Login';
import AddEvents from './screens/schedule/AddEvents';
import Connect from './screens/connect/Connect';
// --- dashboard pages ------------------------------------
import Dashboard from './screens/dashboard/Dashboard';
// --- profile pages ------------------------------------
import Settings from './screens/profile/Settings';
import Preferences from './screens/profile/Preferences';
import MySchedule from './screens/profile/MySchedule';
import DoctorAccount from './screens/profile/account/DoctorAccount';
import DoctorAccountSetting from './screens/profile/account/DoctorAccountSetting';
// --- signup pages ------------------------------------
import VerificationScreen from './screens/Auth/Signup/VerificationScreen';
import SetPassword from './screens/Auth/Signup/SetPassword';
import PhoneCodePage from './screens/Auth/PhoneCodePage';
import SendVerificationCode from './screens/Auth/Signup/SendVerificationCode';
import ForgotPasswordScreen from './screens/Auth/Signup/ForgotPasswordScreen';
import ResetPassword from './screens/Auth/Signup/ResetPassword';
// --- schedule pages ------------------------------------
import CalendarPage from './screens/schedule/CalendarPage';
import TimeSlotPage from './screens/schedule/TimeSlotPage';
import ChoosePatient from './screens/schedule/ChoosePatient';
import ChooseColleagues from './screens/schedule/ChooseColleagues';
// --- connect pages ------------------------------------
import CreateGroup from './screens/connect/CreateGroup';
import ViewCareteam from './screens/connect/ViewCareteam';
import Contact from './screens/connect/Contact';
// --- notion pages ------------------------------------
import PatientProfile from './screens/profile/PatientProfile';
import NotionPage from './screens/connect/notion/NotionPage';
import SessionNotes from './screens/connect/notion/SessionNotes';
import ProblemList from './screens/connect/notion/ProblemList';
import Procedures from './screens/connect/notion/Procedures';
import ProcedureDetail from './screens/connect/notion/ProcedureDetail';
import Medications from './screens/connect/notion/Medications';
import MedicationDetail from './screens/connect/notion/MedicationDetail';
import ProcedureBy from './screens/connect/notion/ProcedureBy';
import CameraScreen from './screens/CameraScreen';
import RecordsManagementPage from './screens/connect/notion/RecordsManagementPage';
import SessionNotesDetail from './screens/connect/notion/SessionNotesDetail';
import DoctorProfile from './screens/profile/DoctorProfile';
// --- text chat pages ------------------------------------
import Chat from './screens/connect/chatting/Chat';
// --- video chat pages ------------------------------------
import VideoChatView from './screens/connect/chatting/VideoChatView';
import { Home_svg, Calendar_svg, Message_svg, User_svg } from './assets/icons';


const store = configureStore();
//================== Main Navigator ========================================================
const mainNavigator = createBottomTabNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? MS.Blue500 : MS.Gray500;
          return (
            <View style={styles.bottomMenu}>
              <Home_svg width={24} height={24} fill={iconFocused} />
              <Text style={{ ...S.ft10S, color: iconFocused, ...S.mt8 }}>{"Dashborad"}</Text>
            </View>
          );
        }
      }
    },
    Chatting: {
      screen: Connect,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? MS.Blue500 : MS.Gray500;
          return (
            <View style={styles.bottomMenu}>
              <Message_svg width={24} height={24} fill={iconFocused} />
              <Text style={{ ...S.ft10S, color: iconFocused, ...S.mt8 }}>{"Connect"}</Text>
            </View>
          );
        }
      }
    },
    Schedule: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? MS.Blue500 : MS.Gray500;
          return (
            <View style={styles.bottomMenu}>
              <Calendar_svg width={24} height={24} fill={iconFocused} />
              <Text style={{ ...S.ft10S, color: iconFocused, ...S.mt8 }}>{"Schedule"}</Text>
            </View>
          );
        }
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        tabBarIcon: ({ focused }) => {
          const iconFocused = focused ? MS.Blue500 : MS.Gray500;
          return (
            <View style={styles.bottomMenu}>
              <User_svg width={24} height={24} fill={iconFocused} />
              <Text style={{ ...S.ft10S, color: iconFocused, ...S.mt8 }}>{"Profile"}</Text>
            </View>
          );
        }
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: MS.Blue500,
      inactiveTintColor: MS.Gray500,
      labelStyle: {
        display: 'none'
      },
      style: {
        height: 69,
        backgroundColor: MS.Gray100,
        borderTopWidth: 0,
        paddingTop: 0,
        marginBottom: 0,
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowColor: "#000",
        elevation: 5,
        shadowOffset: { height: 1, width: 1 }
      }
    }
  }
);


//================== Authentication Navigator ========================================================
const authStack = createStackNavigator(
  {
    Login: {
      // `Login` is a React component that will be the main content of the screen
      screen: Login,
      // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      path: 'Login',
      // The action and route params are extracted from the path.

      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({ navigation }) => ({
        title: `Sign in`,
      }),
    },
    ForgotPasswordScreen: {
      screen: ForgotPasswordScreen,
      // When `ForgotPasswordScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.

      // Optional: When deep linking or using react-navigation in a web app, this path is used:
      path: 'ForgotPasswordScreen',
      // The action and route params are extracted from the path.

      // Optional: Override the `navigationOptions` for the screen
      navigationOptions: ({ navigation }) => ({
        title: `Forgot password?`,
      }),
    },
    ResetPassword: {
      screen: ResetPassword,
      path: 'ResetPassword',
      navigationOptions: ({ navigation }) => ({
        title: `Reset password`,
      }),
    },
    SendVerificationCode: {
      screen: SendVerificationCode,
      path: 'SendVerificationCode',
      navigationOptions: ({ navigation }) => ({
        title: `Send VerificationCode`,
      }),
    },
    VerificationScreen: {
      screen: VerificationScreen,
      path: 'VerificationScreen',
      navigationOptions: ({ navigation }) => ({
        title: `Verification`,
      }),
    },
    SetPassword: { screen: SetPassword },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      gestureEnabled: false,
      ...TransitionPresets.SlideFromRightIOS,
      // safeAreaInsets: { top: 100 },
      // Animation:'fade'
    }   
  })

//================== Authentication Navigator ========================================================
const appNavigation = createStackNavigator({
  Auth: {
    screen: authStack,
    path: 'Auth',
    navigationOptions: ({ navigation }) => ({
      title: `Auth`,
    }),
  },
  Main: {
    screen: mainNavigator,
    path: 'Main',
    navigationOptions: ({ navigation }) => ({
      title: `Main`,
    }),
  },
  ViewCareteam: {
    screen: ViewCareteam,
    path: 'ViewCareteam',
    navigationOptions: ({ navigation }) => ({
      title: `View Careteam`,
    }),
  },
  AddEvents: {
    screen: AddEvents,
    path: 'AddEvents',
    navigationOptions: ({ navigation }) => ({
      title: `Add Events`,
    }),
  },
  CalendarPage: {
    screen: CalendarPage,
    path: 'CalendarPage',
    navigationOptions: ({ navigation }) => ({
      title: `CalendarPage`,
    }),
  },
  TimeSlotPage: {
    screen: TimeSlotPage,
    path: 'TimeSlotPage',
    navigationOptions: ({ navigation }) => ({
      title: `TimeSlotPage`,
    }),
  },
  ChoosePatient: {
    screen: ChoosePatient,
    path: 'ChoosePatient',
    navigationOptions: ({ navigation }) => ({
      title: `Choose Patient`,
    }),
  },
  ChooseColleagues: {
    screen: ChooseColleagues,
    path: 'ChooseColleagues',
    navigationOptions: ({ navigation }) => ({
      title: `Choose Colleagues`,
    }),
  },
  Chat: {
    screen: Chat,
    path: 'Chat',
    navigationOptions: ({ navigation }) => ({
      title: `Chat`,
    }),
  },
  Contact: {
    screen: Contact,
    path: 'Contact',
    navigationOptions: ({ navigation }) => ({
      title: `Contact`,
    }),
  },
  CreateGroup: {
    screen: CreateGroup,
    path: 'CreateGroup',
    navigationOptions: ({ navigation }) => ({
      title: `Create Group`,
    }),
  },
  VideoChatView: {
    screen: VideoChatView,
    path: 'VideoChatView',
    navigationOptions: ({ navigation }) => ({
      title: `VideoChat View`,
    }),
  },
  PhoneCodePage: {
    screen: PhoneCodePage,
    path: 'PhoneCodePage',
    navigationOptions: ({ navigation }) => ({
      title: `PhoneCode Page`,
    }),
  },
  PatientProfile: {
    screen: PatientProfile,
    path: 'PatientProfile',
    navigationOptions: ({ navigation }) => ({
      title: `PatientProfile`,
    }),
  },
  SessionNotes: {
    screen: SessionNotes,
    path: 'SessionNotes',
    navigationOptions: ({ navigation }) => ({
      title: `SessionNotes`,
    }),
  },
  SessionNotesDetail: {
    screen: SessionNotesDetail,
    path: 'SessionNotesDetail',
    navigationOptions: ({ navigation }) => ({
      title: `Detail Session Notes `,
    }),
  },
  DoctorProfile: {
    screen: DoctorProfile,
    path: 'DoctorProfile',
    navigationOptions: ({ navigation }) => ({
      title: `Doctor Profile `,
    }),
  },
  Preferences: {
    screen: Preferences,
    path: 'Preferences',
    navigationOptions: ({ navigation }) => ({
      title: `Preferences `,
    }),
  },
  MySchedule: {
    screen: MySchedule,
    path: 'MySchedule',
    navigationOptions: ({ navigation }) => ({
      title: `My Schedule `,
    }),
  },
  DoctorAccount: {
    screen: DoctorAccount,
    path: 'DoctorAccount',
    navigationOptions: ({ navigation }) => ({
      title: `Doctor Account `,
    }),
  },
  DoctorAccountSetting: {
    screen: DoctorAccountSetting,
    path: 'DoctorAccountSetting',
    navigationOptions: ({ navigation }) => ({
      title: `Doctor Account Setting`,
    }),
  },
  ProblemList: {
    screen: ProblemList,
    path: 'ProblemList',
    navigationOptions: ({ navigation }) => ({
      title: `ProblemList`,
    }),
  },
  Procedures: {
    screen: Procedures,
    path: 'Procedures',
    navigationOptions: ({ navigation }) => ({
      title: `Procedures`,
    }),
  },
  ProcedureBy: {
    screen: ProcedureBy,
    path: 'ProcedureBy',
    navigationOptions: ({ navigation }) => ({
      title: `ProcedureBy`,
    }),
  },
  ProcedureDetail: {
    screen: ProcedureDetail,
    path: 'ProcedureDetail',
    navigationOptions: ({ navigation }) => ({
      title: `Detail Procedure`,
    }),
  },
  Medications: {
    screen: Medications,
    path: 'Medications',
    navigationOptions: ({ navigation }) => ({
      title: `Medications`,
    }),
  },
  MedicationDetail: {
    screen: MedicationDetail,
    path: 'MedicationDetail',
    navigationOptions: ({ navigation }) => ({
      title: `Detail Medication`,
    }),
  },
  RecordsManagementPage: {
    screen: RecordsManagementPage,
    path: 'RecordsManagementPage',
    navigationOptions: ({ navigation }) => ({
      title: `Records ManagementPage`,
    }),
  },
  CameraScreen: {
    screen: CameraScreen,
    path: 'CameraScreen',
    navigationOptions: ({ navigation }) => ({
      title: `CameraScreen`,
    }),
  },
},
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: false,
      gestureDirection: "horizontal",
      // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      ...TransitionPresets.SlideFromRightIOS,
      // safeAreaInsets: { top: 100 },
      // Animation:'fade'
    },
  });

const AppContainer = createAppContainer(appNavigation);

const Root = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider >
        <SafeAreaProvider>
          <AppContainer ref={(nav) => { NavigationService.setNavigator(nav) }} />
        </SafeAreaProvider>
      </PaperProvider>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </StoreProvider>
  );
};
export default Root;


const styles = StyleSheet.create({
  bottomMenu: {
    justifyContent: "center",
    alignItems: "center",
    margin: 13
  }
});
