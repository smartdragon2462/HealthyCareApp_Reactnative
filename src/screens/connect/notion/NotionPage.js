import React from 'react';
import { StyleSheet, View, TextInput, Text, Image, Keyboard, TouchableOpacity, TouchableHighlight, ScrollView, FlatList, Platform, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Container, Content, Icon } from 'native-base';
import Notion from '../../../components/Notion';
import SelectColorModal from '../../../components/SelectColorModal';
import BlockModal from '../../../components/BlockModal';

export default class NotionPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {      
    };
  }
  ///////////////////////////////////////////////////////////////////////
  render() {
    const {  } = this.state;

    return (
      <Container style={styles.container}>
        <Notion {...this.props} />
      </Container>
    );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFB',
    paddingTop: 24
  },
  barContainer: {
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderColor: '#efefef',
    borderTopWidth: StyleSheet.hairlineWidth,
},
})
