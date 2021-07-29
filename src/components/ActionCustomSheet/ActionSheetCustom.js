import React, {Component} from 'react';
import {Icon} from 'native-base';
import { oneOfType, func, object, string, number, element, arrayOf} from 'prop-types';
  import { Text,Platform, View, Image, Dimensions, Modal, Animated, ScrollView, StyleSheet} from 'react-native';
import Message from './Message';
import Button from './Button';
import CancelButton from './CancelButton';
import {OptionOn_icon} from '../../assets/icons';
import {baseStyles, androidStyles, hairlineWidth} from './styles';

const defaultStyles = Platform.select({
  ios: baseStyles,
  android: Object.assign({}, baseStyles, androidStyles),
});

const MAX_HEIGHT = Dimensions.get('window').height * 0.7;

const pick = (source, props) =>
  props.reduce((res, key) => {
    res[key] = source[key];
    return res;
  }, {});

class ActionSheet extends Component {
  scrollEnabled = false;
  translateY = this.calculateHeight(this.props);

  state = {
    visible: false,
    sheetPositionY: new Animated.Value(this.translateY),
  };

  componentDidMount() {
    this.translateY = this.calculateHeight(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    this.translateY = this.calculateHeight(this.props);
  }

  show() {
    this.setState({visible: true});
    this.showSheet();
  }

  hide = (index) => {
    this.hideSheet(() => {
      this.setState({visible: false});
      this.props.onPress(index);
    });
  };

  cancel = () => {
    const {cancelButtonIndex} = this.props;

    if (cancelButtonIndex > -1) {
      this.hide(cancelButtonIndex);
    }
  };

  showSheet() {
    Animated.timing(this.state.sheetPositionY, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  hideSheet(callback) {
    Animated.timing(this.state.sheetPositionY, {
      toValue: this.translateY,
      duration: 150,
      useNativeDriver: true,
    }).start(callback);
  }

  calculateHeight(props) {
    const {
      options,
      buttonHeight,
      titleHeight,
      messageHeight,
      cancelMargin,
    } = props;

    let height = options.reduce(
      (sum, {height: optionHeight = buttonHeight}) => (sum += optionHeight),
      cancelMargin,
    );

    if (props.title) {
      height += titleHeight;
    }
    if (props.message) {
      height += messageHeight;
    }

    if (height > MAX_HEIGHT) {
      this.scrollEnabled = true;
      return MAX_HEIGHT;
    } else {
      this.scrollEnabled = false;
      return height + 35;
    }
  }

  noBorderStyles = {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  };

  renderOptions(styles) {
    const {
      options,
      tintColor,
      warnColor,
      cancelButtonIndex,
      destructiveButtonIndex,
      buttonHeight,
      buttonUnderlayColor,
      checkInd,
    } = this.props;

    return options.map((option, index) => {
      const fontColor =
        destructiveButtonIndex === index ? warnColor : tintColor;

      return index === cancelButtonIndex ? null : (
        <View key={index}>
          <Button
            key={`button_${index}`}
            {...{
              option,
              styles,
              index,
              fontColor,
              buttonHeight,
              buttonUnderlayColor,
              onPress: this.hide,
              borderWidth: index === options.length - 1 ? 0 : 1,
            }}
          />
          {index === checkInd && (
            <View style={{position: 'absolute', right: 20, top: 15}}>
              <Image source={OptionOn_icon} style={styles1.option} resizeMode="contain" />
            </View>
          )}
        </View>
      );
    });
  }

  render() {
    const {
      styles: userStyles,
      message,
      messageHeight,
      title,
      titleHeight,
    } = this.props;

    const {visible, sheetPositionY} = this.state;
    const styles = Object.assign({}, userStyles, defaultStyles);

    return (
      <Modal
        visible={visible}
        transparent={true}
        animationType="none"
        onRequestClose={this.cancel}
        statusBarTranslucent>
        <View style={[styles.wrapper, {marginBottom: -5}]}>
          <Text style={styles.overlay} onPress={this.cancel} />
          <Animated.View
            style={[
              styles.backdrop,
              {
                height: this.translateY,
                transform: [{translateY: sheetPositionY}],
              },
            ]}>
            <View
              style={{
                width: '100%',
                height: 20,
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: 8,
              }}>
              <View
                style={{
                  marginTop: 8,
                  backgroundColor: '#80B3FF',
                  width: 40,
                  height: 3,
                  borderRadius: 10,
                }}></View>
            </View>
            {title && (
              <Message
                text={title}
                titleStyle={styles.titleText}
                style={[styles.title, {height: titleHeight}]}
              />
            )}

            {message && (
              <Message
                text={message}
                titleStyle={styles.messageText}
                style={[
                  styles.message,
                  {height: messageHeight},
                  title && this.noBorderStyles,
                ]}
              />
            )}

            <View style={{width: '100%'}}>
              <ScrollView
                scrollEnabled={this.scrollEnabled}
                style={[
                  styles.optionsContainer,
                  (title || message) && this.noBorderStyles,
                ]}
                contentContainerStyle={styles.options}>
                {this.renderOptions(styles)}
              </ScrollView>
            </View>

            <CancelButton
              styles={styles}
              onPress={this.cancel}
              {...pick(this.props, [
                'options',
                'cancelButtonIndex',
                'tintColor',
                'cancelMargin',
                'buttonHeight',
                'buttonUnderlayColor',
              ])}
            />
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles1 = StyleSheet.create({
   option: {
    width: 24,
    height: 24,
  },
});


ActionSheet.propTypes = {
  message: string,
  title: oneOfType([string, element]),
  options: arrayOf((propVal, key, componentName, location, propFullName) => {
    if (
      typeof propVal[key] !== 'string' &&
      !React.isValidElement(propVal[key].component)
    ) {
      return new Error(
        'Invalid prop `' +
          propFullName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.',
      );
    }
  }),

  cancelButtonIndex: number,
  destructiveButtonIndex: number,

  tintColor: string,
  warnColor: string,
  buttonUnderlayColor: string,

  titleHeight: number,
  messageHeight: number,
  buttonHeight: number,
  cancelMargin: number,

  styles: object,
  onPress: func,
};

ActionSheet.defaultProps = {
  tintColor: '#007aff',
  warnColor: '#ff3b30',
  buttonUnderlayColor: '#ebebeb',

  titleHeight: 40,
  messageHeight: 50,
  buttonHeight: 58 + hairlineWidth,
  cancelMargin: Platform.select({
    ios: 10,
    android: 6,
  }),

  styles: defaultStyles,
  onPress: () => {},
};

export default ActionSheet;
