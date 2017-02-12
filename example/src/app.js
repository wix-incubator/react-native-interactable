import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import ChatHeads from './ChatHeads';
import SwipeableCard from './SwipeableCard';
import IconDrawer from './IconDrawer';
import CollapsingHeader from './CollapsingHeader';
import MoreDrawers from './MoreDrawers';
import MoreChatHeads from './MoreChatHeads';

export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentExample: undefined
    }
  }

  render() {
    if (this.state.currentExample) {
      const ExampleComponent = this.state.currentExample;
      return <ExampleComponent />;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, ChatHeads)}>
          <Text style={styles.button}>Chat Heads</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, SwipeableCard)}>
          <Text style={styles.button}>Swipeable Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, IconDrawer)}>
          <Text style={styles.button}>Icon Drawer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, CollapsingHeader)}>
          <Text style={styles.button}>Collapsing Header</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, MoreDrawers)}>
          <Text style={styles.button}>More Drawers</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onExamplePress.bind(this, MoreChatHeads)}>
          <Text style={styles.button}>More Chat Heads</Text>
        </TouchableOpacity>
      </View>
    );
  }

  onExamplePress(currentExample) {
    this.setState({currentExample});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    color: 'blue',
    fontSize: 24,
    marginBottom: 24
  }
});

AppRegistry.registerComponent('example', () => example);
