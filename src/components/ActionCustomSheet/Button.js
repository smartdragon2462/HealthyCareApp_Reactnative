import React, { PureComponent } from 'react';
import { TouchableHighlight, Text } from 'react-native';

class Button extends PureComponent {
  onPress = () => this.props.onPress(this.props.index);

  render() {
    const {
      option,
      styles,
      index,
      style,
      fontColor,
      buttonHeight,
      buttonUnderlayColor,
      borderWidth=1,
    } = this.props;

    const height = option.component ? option.height : buttonHeight;

    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        onPress={this.onPress}
        underlayColor={buttonUnderlayColor}
        style={[styles.buttonContainer, style, { height, borderBottomWidth:borderWidth, borderBottomColor:'#E6E8EB', marginHorizontal:20 }]}
      >
        {option.component ? (
          option.component
        ) : (
          <Text style={[styles.buttonTitle, { color: fontColor }]}>
            {option}
          </Text>
        )}
      </TouchableHighlight>
    );
  }
}

export default Button;
